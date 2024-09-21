import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import { Inter } from "@/constants/Fonts";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { router, useNavigation } from "expo-router";

export default function LoginScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });

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
                onChangeText={() => {}}
                value=""
                keyboardType="email-address"
              />
              <CustomInputText
                label="Password"
                placeholder="Masukkan Password"
                onChangeText={() => {}}
                value=""
                secureTextEntry
              />
              <View className="mt-4">
                <View className="bg-custom-1 px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2">
                  <Text
                    className="text-sm text-white text-center"
                    style={Inter}
                  >
                    Login
                  </Text>
                </View>
                <View className="flex flex-row justify-between items-center my-6">
                  <View className="h-px w-[30%] bg-neutral-200" />
                  <Text style={Inter}>Belum Memiliki Akun</Text>
                  <View className="h-px w-[30%] bg-neutral-200" />
                </View>
              </View>
              <Pressable
                className="bg-white border-custom-1 border px-2 py-2 rounded-lg flex items-center justify-center h-10 space-x-2"
                onPress={() => router.push("/register")}
              >
                <Text
                  className="text-sm text-custom-1 text-center"
                  style={Inter}
                >
                  Buat Akun
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
