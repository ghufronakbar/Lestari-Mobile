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

export default function EditScreen() {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView className="px-4 pt-8 flex flex-col h-screen">
        <Text className="text-4xl text-neutral-950 font-bold" style={Inter}>
          Input Satwa
        </Text>
        <ScrollView className="mt-8 space-y-4">
          <View className="w-full h-40 rounded-lg border-2 border-neutral-300 overflow-hidden shadow-sm">
            <Image
              source={{ uri: "https://i.sstatic.net/y9DpT.jpg" }}
              className="w-full h-full object-cover"
            />
          </View>
          <View className="w-[40%] bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2 self-end">
            <Text className="text-sm text-white text-center" style={Inter}>
              Unggah Gambar
            </Text>
          </View>
          <View className="flex flex-col">
            <CustomInputText
              label="Nama Lokal"
              placeholder="Masukkan Nama Lokal"
              onChangeText={() => {}}
              value=""
            />
            <CustomInputText
              label="Nama Latin"
              placeholder="Masukkan Nama Latin"
              onChangeText={() => {}}
              value=""
            />
            <CustomInputText
              label="Jumlah Ditemukan"
              placeholder="Masukkan Jumlah Ditemukan"
              onChangeText={() => {}}
              value=""
              keyboardType="numeric"
            />
            <CustomInputText
              label="Habitat"
              placeholder="Masukkan Habitat Ditemukan"
              onChangeText={() => {}}
              value=""
            />
            <View className="flex flex-col space-y-2 mb-4">
              <Text className="text-black text-lg font-medium" style={Inter}>
                Lokasi
              </Text>
              <TextInput
                className="w-full bg-white border border-neutral-200 rounded-l-lg px-4 py-2 h-12"
                placeholder={"Masukkan Kota Ditemukan"}
                style={Inter}
                value={""}
                onChangeText={() => {}}
              />
              <View className="w-full flex flex-row justify-between mb-2 items-center">
                <TextInput
                  className="w-[49%] bg-white border border-neutral-200 rounded-lg px-4 py-2 h-12"
                  placeholder={"Latitude"}
                  style={Inter}
                  value={""}
                  onChangeText={() => {}}
                />
                <TextInput
                  className="w-[49%] bg-white border border-neutral-200 rounded-lg px-4 py-2 h-12"
                  placeholder={"Longitude"}
                  style={Inter}
                  value={""}
                  onChangeText={() => {}}
                />
              </View>
              <View className="flex flex-row justify-between items-center my-2">
                <View className="h-px w-[30%] bg-neutral-200" />
                <Text style={Inter}>Atau Gunakan</Text>
                <View className="h-px w-[30%] bg-neutral-200" />
              </View>
              <View className="w-full flex flex-row justify-between mb-4">
                <View className="bg-custom-success w-[48%] px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2">
                  <Feather name="map-pin" color="white" />
                  <Text
                    className="text-sm text-white text-center"
                    style={Inter}
                  >
                    Lokasi Saat Ini
                  </Text>
                </View>
                <View className="bg-custom-info w-[48%] px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2">
                  <Feather name="map" color="white" />
                  <Text
                    className="text-sm text-white text-center"
                    style={Inter}
                  >
                    Buka Map
                  </Text>
                </View>
              </View>
              <CustomInputText
                label="Deskripsi"
                placeholder="Deskrpisikan Satwa Ditemukan"
                onChangeText={() => {}}
                value=""
                numberOfLines={10}
                multiline
              />
              <View className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2">
                <Text className="text-sm text-white text-center" style={Inter}>
                  Simpan
                </Text>
              </View>
            </View>
          </View>
          <View className="h-96" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
