import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { router, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import {
  changePhone,
  FormChangePhone,
  initFormChangePhone,
} from "@/services/account";
import { useState } from "react";
import { ResponseFail } from "@/models/Response";

export default function ChangePhoneScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });
  const [form, setForm] = useState<FormChangePhone>(initFormChangePhone);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleChangePhone = async () => {
    if (form.phone === "" || form.password === "") {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Form Tidak Boleh Kosong",
      });
      return;
    }
    Toast.show({
      type: "info",
      text1: "Loading...",
      text2: "Harap Tunggu Sebentar...",
    });
    if (form.phone[0] !== "6" || form.phone[1] !== "2") {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Format Nomor Tidak Sesuai",
      });
      return;
    }
    setIsPending(true);
    try {
      await changePhone(form);
      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Berhasil Mengganti Nomor Telepon",
      });
    } catch (error) {
      const err = error as ResponseFail;
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2:
          err?.response?.data?.message ||
          "Terjadi Kesalahan Saat Mengganti Password",
      });
    } finally {
      setIsPending(false);
      setForm(initFormChangePhone);
    }
  };
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 36 : 0 }}>
      <KeyboardAvoidingView className="px-4 flex flex-col h-screen">
        <View className="flex flex-row items-center space-x-2">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
          <Text className="text-4xl text-neutral-950 font-bold" style={Inter}>
            Ganti Nomor Telepon
          </Text>
        </View>
        <ScrollView className="mt-8 space-y-4">
          <View className="flex flex-col">
            <CustomInputText
              label="Nomor Telepon Baru"
              placeholder="62346663636"
              onChangeText={(text) => setForm({ ...form, phone: text })}
              value={form.phone}
              keyboardType="phone-pad"
            />
            <CustomInputText
              label="Konfirmasi Password"
              placeholder="Masukkan Password"
              onChangeText={(text) => setForm({ ...form, password: text })}
              value={form.password}
              secureTextEntry
            />
            <Pressable
              className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2 mt-2"
              onPress={handleChangePhone}
            >
              {isPending ? (
                <ActivityIndicator size={"small"} color={"white"} />
              ) : (
                <Text className="text-sm text-white text-center" style={Inter}>
                  Ubah
                </Text>
              )}
            </Pressable>
          </View>
          <View className="h-96" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
