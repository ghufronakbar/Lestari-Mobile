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
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Inter } from "@/constants/Fonts";
import {
  AntDesign,
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { Card, CardContainer } from "@/components/ui/Card";

export default function HistoryScreen() {
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
        />
        <View className="w-[20%] flex flex-row items-center justify-center bg-custom-1 rounded-r-lg">
          <Ionicons name="search" size={24} color="white" />
        </View>
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
