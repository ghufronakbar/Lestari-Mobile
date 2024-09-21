import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { useNavigation } from "expo-router";

export default function ChangePhoneScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });
  return (
    <SafeAreaView>
      <KeyboardAvoidingView className="px-4 pt-8 flex flex-col h-screen">
        <Text className="text-4xl text-neutral-950 font-bold" style={Inter}>
          Ganti Nomor Telepon
        </Text>
        <ScrollView className="mt-8 space-y-4">
          <View className="flex flex-col">
            <CustomInputText
              label="Nomor Telepon Baru"
              placeholder="62346663636"
              onChangeText={() => {}}
              value=""
              keyboardType="phone-pad"
            />            
            <CustomInputText
              label="Konfirmasi Password"
              placeholder="Masukkan Password"
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
