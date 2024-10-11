import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { Feather, Ionicons } from "@expo/vector-icons";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { router, useNavigation } from "expo-router";
import {
  changePassword,
  FormChangePassword,
  initFormChangePassword,
} from "@/services/account";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { ResponseFail } from "@/models/Response";

export default function ChangePasswordScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });
  const [form, setForm] = useState<FormChangePassword>(initFormChangePassword);
  const [isPending, setIsPending] = useState(false);

  const handleChangePassword = async () => {
    if (form.confirmPassword !== form.newPassword) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Konfirmasi Password Tidak Sesuai",
      });
      return;
    }
    if (
      form.oldPassword === "" ||
      form.newPassword === "" ||
      form.confirmPassword === ""
    ) {
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
    if (form.newPassword.length < 8) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Password Minimal 8 Karakter",
      });
      return;
    }
    setIsPending(true);
    try {
      await changePassword(form);
      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Berhasil Mengganti Password",
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
      setForm(initFormChangePassword);
    }
  };
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 36 : 0 }}>
      <KeyboardAvoidingView className=" flex flex-col h-screen">
        <View className="flex px-4  flex-row items-center space-x-2">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
          <Text className="text-4xl text-neutral-950 font-bold" style={Inter}>
            Ganti Kata Sandi
          </Text>
        </View>
        <ScrollView className="mt-8 px-4  space-y-4">
          <View className="flex flex-col">
            <CustomInputText
              label="Password Lama"
              placeholder="Masukkan Password Lama"
              value={form.oldPassword}
              onChangeText={(value) => setForm({ ...form, oldPassword: value })}
              secureTextEntry
            />
            <CustomInputText
              label="Password Baru"
              placeholder="Masukkan Password Baru"
              value={form.newPassword}
              onChangeText={(value) => setForm({ ...form, newPassword: value })}
              secureTextEntry
            />
            <CustomInputText
              label="Konfirmasi Password"
              placeholder="Masukkan Ulang Password Baru"
              value={form.confirmPassword}
              onChangeText={(value) =>
                setForm({ ...form, confirmPassword: value })
              }
              secureTextEntry
            />
            <Pressable
              className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2 mt-2"
              onPress={
                isPending
                  ? () => {
                      Toast.show({
                        type: "info",
                        text1: "Loading...",
                        text2: "Harap Tunggu Sebentar...",
                      });
                    }
                  : handleChangePassword
              }
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
