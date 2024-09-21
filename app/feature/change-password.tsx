import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { Feather } from "@expo/vector-icons";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { useNavigation } from "expo-router";

export default function ChangePasswordScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });
  return (
    <SafeAreaView>
      <KeyboardAvoidingView className="px-4 pt-8 flex flex-col h-screen">
        <Text className="text-4xl text-neutral-950 font-bold" style={Inter}>
          Ganti Kata Sandi
        </Text>
        <ScrollView className="mt-8 space-y-4">
          <View className="flex flex-col">
            <CustomInputText
              label="Password Lama"
              placeholder="Masukkan Password Lama"
              onChangeText={() => {}}
              value=""
              secureTextEntry
            />
            <CustomInputText
              label="Password Baru"
              placeholder="Masukkan Password Baru"
              onChangeText={() => {}}
              value=""
              secureTextEntry
            />
            <CustomInputText
              label="Konfirmasi Password"
              placeholder="Masukkan Ulang Password Baru"
              onChangeText={() => {}}
              value=""
              secureTextEntry
            />
            <View className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2 mt-2">
              <Text className="text-sm text-white text-center" style={Inter}>
                Ubah
              </Text>
            </View>
          </View>
          <View className="h-96" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
