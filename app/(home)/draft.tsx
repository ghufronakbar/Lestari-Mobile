import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Switch,
  Pressable,
  Keyboard,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { OutfitBold, OutfitRegular, OutfitSemiBold } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { Card, CardContainer } from "@/components/ui/Card";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Animal } from "@/models/Animal";
import { getAllAnimals } from "@/services/animal";
import { C } from "@/constants/Colors";
import {
  initLimitation,
  initPagination,
  Limitation,
  Pagination,
} from "@/models/Limitation";
import SpinnerLoading from "@/components/ui/SpinnerLoading";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimalDraft, getDrafts } from "@/services/draft";
import { DraftCard } from "@/components/ui/DraftCard";

export default function DraftScreen() {
  useNavigation().setOptions({ headerShown: false });
  const [data, setData] = useState<AnimalDraft[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const filteredData = data.filter(
    (item) =>
      item.key.toLowerCase().includes(search.toLowerCase()) ||
      item.latinName.toLowerCase().includes(search.toLowerCase()) ||
      item.localName.toLowerCase().includes(search.toLowerCase()) ||
      item.habitat.toLowerCase().includes(search.toLowerCase()) ||
      item.city.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
    setLoading(true);
    Keyboard.dismiss();
    const response = await getDrafts();
    setData(response);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView>
      <View className=" flex flex-col h-screen mt-4">
        <Text className="text-4xl px-4 text-neutral-950" style={OutfitBold}>
          Draft
        </Text>
        <View className="mt-8 px-4 flex flex-row justify-between">
          <TextInput
            className="w-[80%] bg-white border border-neutral-200 rounded-l-lg px-4 py-2 h-12"
            placeholder="Cari..."
            style={OutfitRegular}
            placeholderTextColor={"#a3a3a3"}
            value={search}
            onChangeText={setSearch}
          />
          <Pressable
            className="w-[20%] flex flex-row items-center justify-center bg-custom-1 rounded-r-lg"
            onPress={() => Keyboard.dismiss()}
          >
            <Ionicons name="search" size={24} color="white" />
          </Pressable>
        </View>
        <FlatList
          data={[{}]}
          onEndReachedThreshold={0.5}
          refreshing={false}
          onRefresh={fetchData}
          renderItem={() => (
            <View className="mt-4 px-4">
              {filteredData.length === 0 ? (
                <View className="w-full flex flex-col items-center justify-center">
                  <Text
                    className="text-lg text-neutral-950 font-medium text-center mt-40"
                    style={OutfitRegular}
                  >
                    Tidak ada draft
                  </Text>
                </View>
              ) : null}
              <CardContainer>
                {filteredData.map((item) => (
                  <DraftCard key={item.key} item={{ ...item }} />
                ))}
              </CardContainer>
              <View className="h-96" />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
