import {
  Image,
  StyleSheet,
  Platform,
  Text,
  SafeAreaView,
  View,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { Inter } from "@/constants/Fonts";
import { Card, CardContainer } from "@/components/ui/Card";

export default function HomeScreen() {
  const now = new Date();
  let greet: string = "Selamat ";
  if (now.getHours() < 12) {
    greet += "Pagi";
  } else if (now.getHours() < 15) {
    greet += "Siang";
  } else if (now.getHours() < 18) {
    greet += "Sore";
  } else {
    greet += "Malam";
  }
  return (
    <SafeAreaView>
      <ScrollView className="px-4 pt-8 gap-8 bg-neutral-50 min-h-screen">
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-col gap-2">
            <Text
              className="text-base text-neutral-600 font-semibold"
              style={Inter}
            >
              {greet} 👋
            </Text>
            <Text
              className="text-2xl text-neutral-950 font-semibold"
              style={Inter}
            >
              Ghufron Akbar
            </Text>
          </View>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            }}
            width={49}
            height={49}
            className="rounded-full h-full aspect-square object-cover"
          />
        </View>
        <Text className="text-black text-4xl leading-[46px]" style={Inter}>
          Waktunya <Text className="text-custom-1">Mendata Satwa</Text>{" "}
          Sekarang!
        </Text>
        <View className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-row justify-around">
          <View className="flex flex-col gap-2 justify-center items-center  w-[40%]">
            <Text className="text-neutral-600 font-medium" style={Inter}>
              Total Kontribusi
            </Text>
            <Text className="text-4xl font-semibold" style={Inter}>
              20
            </Text>
          </View>
          <View className="w-px h-16 bg-neutral-200" />
          <View className="flex flex-col gap-2 justify-center items-center w-[40%]">
            <Text className="text-neutral-600 font-medium" style={Inter}>
              Minggu Ini
            </Text>
            <Text className="text-4xl font-semibold" style={Inter}>
              20
            </Text>
          </View>
        </View>
        <View className="flex flex-col">
          <View className="flex flex-row items-center justify-between mb-6">
            <Text className="text-black text-xl font-semibold" style={Inter}>
              Riwayat Kontribusi
            </Text>
            <Text className="text-custom-1 text-base" style={Inter}>
              Lihat Semua
            </Text>
          </View>          
          <CardContainer>
            <Card />
          </CardContainer>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
