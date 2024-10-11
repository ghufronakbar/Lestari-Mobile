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
import { useState } from "react";
import {
  createRequestAccount,
  FormReqAccount,
  initFormReqAccount,
} from "@/services/guest/requestAccount";
import TermsConditions from "@/components/ui/TermsConditions";
import Toast from "react-native-toast-message";
import { ResponseFail } from "@/models/Response";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });
  const [form, setForm] = useState<FormReqAccount>(initFormReqAccount);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    if (
      form.name === "" ||
      form.email === "" ||
      form.phone === "" ||
      form.subject === "" ||
      form.body === "" ||
      form.instances === "" ||
      form.profession === ""
    ) {
      {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Form tidak boleh ada yang kosong",
        });
        return;
      }
    }
    if (!isConfirmed) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Anda harus menyetujui syarat dan ketentuan",
      });
      return;
    }
    try {
      setLoading(true);
      await createRequestAccount(form);
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Pendaftaran berhasil, cek email secara berkala",
      });
      router.back();
    } catch (error) {
      console.log(error);
      const err = error as ResponseFail;
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: err?.response?.data?.message || "Gagal mendaftarkan akun",
      });
    } finally {
      setLoading(false);
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
            Pendaftaran Akun
          </Text>
        </View>
        <ScrollView className="mt-8 space-y-4">
          <View className="flex flex-col">
            <CustomInputText
              label="Nama"
              placeholder="Masukkan Nama Anda"
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
            />
            <CustomInputText
              label="Email"
              placeholder="Masukkan Email Anda"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <CustomInputText
              label="Nomor Telepon"
              placeholder="62812345678"
              value={form.phone}
              onChangeText={(value) => setForm({ ...form, phone: value })}
              keyboardType="number-pad"
            />
            <CustomInputText
              label="Profesi"
              placeholder="Masukkan Profesi Anda"
              value={form.profession}
              onChangeText={(value) => setForm({ ...form, profession: value })}
            />
            <CustomInputText
              label="Instansi"
              placeholder="Masukkan Asal Instansi"
              value={form.instances}
              onChangeText={(value) => setForm({ ...form, instances: value })}
            />
            <CustomInputText
              label="Kepentingan"
              placeholder="Tuliskan Kepentingan"
              value={form.subject}
              onChangeText={(value) => setForm({ ...form, subject: value })}
            />
            <CustomInputText
              label="Deskripsi"
              placeholder="Deskrpisikan Kepentingan Anda"
              value={form.body}
              onChangeText={(value) => setForm({ ...form, body: value })}
              numberOfLines={10}
              multiline
            />
            <Pressable
              className=" mb-4 flex flex-row items-center self-center"
              onPress={() => setIsConfirmOpen(true)}
            >
              <Text className="text-sm" style={Inter}>
                Saya menyutujui{" "}
                <Text className="text-custom-1">syarat dan ketentuan</Text> yang
                berlaku
              </Text>
            </Pressable>
            <Pressable
              className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2"
              onPress={loading ? () => {} : () => handleCreate()}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-sm text-white text-center" style={Inter}>
                  Kirim
                </Text>
              )}
            </Pressable>
          </View>
          <View className="h-96" />
        </ScrollView>
      </KeyboardAvoidingView>
      <TermsConditions
        visible={isConfirmOpen}
        type="account"
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmed(true);
          setIsConfirmOpen(false);
        }}
      />
    </SafeAreaView>
  );
}
