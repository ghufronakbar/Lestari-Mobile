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

export default function RegisterScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });
  return (
    <SafeAreaView>
      <KeyboardAvoidingView className="px-4 pt-8 flex flex-col h-screen">
        <Text className="text-4xl text-neutral-950 font-bold" style={Inter}>
          Buat Akun
        </Text>
        <ScrollView className="mt-8 space-y-4">
          <View className="flex flex-col">
            <CustomInputText
              label="Nama"
              placeholder="Masukkan Nama Anda"
              onChangeText={() => {}}
              value=""
            />
            <CustomInputText
              label="Email"
              placeholder="Masukkan Email Anda"
              onChangeText={() => {}}
              value=""
            />
            <CustomInputText
              label="Nomor Telepon"
              placeholder="62812345678"
              onChangeText={() => {}}
              value=""
              keyboardType="number-pad"
            />
            <CustomInputText
              label="Profesi"
              placeholder="Masukkan Profesi Anda"
              onChangeText={() => {}}
              value=""
            />
            <CustomInputText
              label="Instansi"
              placeholder="Masukkan Asal Instansi"
              onChangeText={() => {}}
              value=""
            />
            <CustomInputText
              label="Kepentingan"
              placeholder="Tuliskan Kepentingan"
              onChangeText={() => {}}
              value=""
              keyboardType="numeric"
            />
            <CustomInputText
              label="Deskripsi"
              placeholder="Deskrpisikan Kepentingan Anda"
              onChangeText={() => {}}
              value=""
              numberOfLines={10}
              multiline
            />
            <View className=" mb-4 flex flex-row items-center self-center">
              <Text className="text-sm" style={Inter}>
                Saya menyutujui{" "}
                <Text className="text-custom-1">syarat dan ketentuan</Text> yang
                berlaku
              </Text>
            </View>
            <View className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2">
              <Text className="text-sm text-white text-center" style={Inter}>
                Kirim
              </Text>
            </View>
          </View>
          <View className="h-96" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
