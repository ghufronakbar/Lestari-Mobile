import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import { FormLogin, initFormLogin, login } from "@/services/auth";
import Toast from "react-native-toast-message";
import SpinnerLoading from "@/components/ui/SpinnerLoading";
import { getProfile } from "@/services/account";
import { isLoading } from "expo-font";

export default function LoginScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });

  const [form, setForm] = useState<FormLogin>(initFormLogin);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    console.log("press", form);
    if (form.email == "" || form.password == "") {
      Toast.show({
        type: "error",
        text1: "Login Gagal",
        text2: "Email dan Password wajib diisi",
      });
      return;
    }
    setLoading(true);
    try {
      await login(form);
      await getProfile();
      router.push("/(home)");
      Toast.show({
        type: "success",
        text1: "Login Berhasil",
        text2: "Selamat Datang di Lestari",
      });
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Login Gagal",
        text2: error?.message || "Terjadi kesalahan saat login",
      });
    } finally {
      setLoading(false);
      setForm(initFormLogin);
    }
  };

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-4 flex "
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-full rounded-lg">
            <Text className="text-4xl text-black font-bold" style={Inter}>
              Selamat Datang di <Text className="text-custom-1">Lestari</Text>
            </Text>
            <View className="mt-8 space-y-4">
              <CustomInputText
                label="Email"
                placeholder="Masukkan Alamat Email"
                onChangeText={(value) => setForm({ ...form, email: value })}
                value={form.email}
                keyboardType="email-address"
              />
              <CustomInputText
                label="Password"
                placeholder="Masukkan Password"
                onChangeText={(value) => setForm({ ...form, password: value })}
                value={form.password}
                secureTextEntry
              />
              <View className="mt-4">
                <Pressable
                  className="bg-custom-1 px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
                  onPress={loading ? () => {} : handleLogin}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text
                      className="text-sm text-white text-center"
                      style={Inter}
                      onPress={handleLogin}
                    >
                      Login
                    </Text>
                  )}
                </Pressable>
                <View className="flex flex-row justify-between items-center my-6">
                  <View className="h-px w-[30%] bg-neutral-200" />
                  <Text style={Inter}>Belum Memiliki Akun</Text>
                  <View className="h-px w-[30%] bg-neutral-200" />
                </View>
              </View>
              <Pressable
                className="bg-white border-custom-1 border px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
                onPress={loading ? () => {} : () => router.push("/register")}
              >
                <Text
                  className="text-sm text-custom-1 text-center"
                  style={Inter}
                >
                  Buat Akun
                </Text>
              </Pressable>
              <Pressable>
                <Text
                  className="text-black self-center flex flex-row items-center"
                  style={Inter}
                  onPress={() => router.push({ pathname: "/forgot-password" })}
                >
                  Lupa Kata Sandi?
                  <Text className="text-custom-1"> Reset Password</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
