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
  Pressable,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContainer } from "@/components/ui/Card";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Animal } from "@/models/Animal";
import { getAllAnimals } from "@/services/animal";
import { C } from "@/constants/Colors";
import { initLimitation, Limitation } from "@/models/Limitation";
import SpinnerLoading from "@/components/ui/SpinnerLoading";

export default function HistoryScreen() {
  const [data, setData] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [limitation, setLimitation] = useState<Limitation>(initLimitation);
  const [limit, setLimit] = useState<number>(7);
  useNavigation().setOptions({
    headerShown: false,
  });
  const fetchData = async () => {
    setLoading(true);
    Keyboard.dismiss();
    const response = await getAllAnimals(
      search,
      limit,
      checked ? "editable" : undefined
    );
    setData(response.data);
    setLimitation(response.limitation);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [checked, limit]);

  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 36 : 0 }}>
      <View className=" flex flex-col h-screen">
        <Text className="text-4xl px-4 text-neutral-950 font-bold" style={Inter}>
          Riwayat
        </Text>
        <View className="mt-8 px-4 flex flex-row justify-between">
          <TextInput
            className="w-[80%] bg-white border border-neutral-200 rounded-l-lg px-4 py-2 h-12"
            placeholder="Cari..."
            style={Inter}
            placeholderTextColor={"#a3a3a3"}
            value={search}
            onChangeText={setSearch}
          />
          <Pressable
            className="w-[20%] flex flex-row items-center justify-center bg-custom-1 rounded-r-lg"
            onPress={fetchData}
          >
            <Ionicons name="search" size={24} color="white" />
          </Pressable>
        </View>
        <View className="mt-4 px-4 self-end flex flex-row items-center space-x-2">
          <Text className="text-black font-semibold">7 Hari Terakhir</Text>
          <Switch
            value={checked}
            onValueChange={setChecked}
            trackColor={{ false: "#767577", true: C[1] }}
          />
        </View>
        <ScrollView className="mt-4 px-4">
          {data.length === 0? (
            <View className="w-full h-full flex flex-col items-center justify-center">
              <Text
                className="text-lg text-neutral-950 font-medium text-center"
                style={Inter}
              >
                Tidak ada hasil
              </Text>
            </View>
          ) : null}
          <CardContainer>
            {data.map((item) => (
              <Card key={item.animalId} item={item} />
            ))}
          </CardContainer>
          {limitation.currentData < limitation.totalData && limitation.totalData > 0 && (
            <Pressable
              className="flec flex-row items-center justify-center self-center space-x-2 mt-4"
              onPress={() => setLimit(limit + 10)}
            >
              <Ionicons name="add" size={20} color="black" />
              <Text>Tampilkan Lebih Banyak</Text>
            </Pressable>
          )}
          <View className="h-96" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
