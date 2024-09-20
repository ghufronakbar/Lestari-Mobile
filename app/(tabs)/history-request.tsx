import { View, Text, SafeAreaView, ScrollView, TextInput } from "react-native";
import { Inter } from "@/constants/Fonts";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Card, CardContainer } from "@/components/ui/Card";
import { C } from "@/constants/Colors";
import { ListContainer, ListItem } from "@/components/ui/ListItem";

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
          <ListContainer>
            <ListItem/>
            <ListItem/>
            <ListItem/>
          </ListContainer>
          <View className="h-96" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
