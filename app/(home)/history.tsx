import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  Switch,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContainer } from "@/components/ui/Card";
import { useNavigation } from "expo-router";

export default function HistoryScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });
  return (
    <SafeAreaView>
      <View className="px-4 pt-8 flex flex-col h-screen">
        <Text className="text-4xl text-neutral-950 font-bold" style={Inter}>
          Riwayat
        </Text>
        <View className="mt-8 flex flex-row justify-between">
          <TextInput
            className="w-[80%] bg-white border border-neutral-200 rounded-l-lg px-4 py-2 h-12"
            placeholder="Cari..."
            style={Inter}
            placeholderTextColor={"#a3a3a3"}
          />
          <View className="w-[20%] flex flex-row items-center justify-center bg-custom-1 rounded-r-lg">
            <Ionicons name="search" size={24} color="white" />
          </View>
        </View>
        <View className="mt-4 self-end flex flex-row items-center space-x-2">
          <Text className="text-black font-semibold">7 Hari Terakhir</Text>
          <Switch />
        </View>
        <ScrollView className="mt-8">
          <CardContainer>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </CardContainer>
          <View className="h-96" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
