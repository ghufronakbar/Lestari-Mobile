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
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
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

export default function HistoryScreen() {
  useNavigation().setOptions({ headerShown: false });
  const [data, setData] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<Pagination>(initPagination);

  const fetchData = async (key?: Date) => {
    setLoading(true);
    Keyboard.dismiss();
    const response = await getAllAnimals(
      search,
      1,
      checked ? "editable" : undefined,
      key
    );
    setData(response.data);    
    setPagination(response.pagination);
    setLoading(false);
  };

  const fetchMore = async () => {
    if (pagination.currentPage >= pagination.totalPage) return;
    setLoading(true);
    const response = await getAllAnimals(
      search,
      pagination.currentPage + 1,
      checked ? "editable" : undefined
    );
    const newData = response.data.filter(
      (newItem) =>
        !data.some((existingItem) => existingItem.animalId === newItem.animalId)
    );
    setData([...data, ...newData]);
    setPagination(response.pagination);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [checked]);

  return (
    <SafeAreaView>
      <View className=" flex flex-col h-screen mt-4">
        <Text className="text-4xl px-4 text-neutral-950" style={OutfitBold}>
          Riwayat
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
            onPress={() => fetchData()}
          >
            <Ionicons name="search" size={24} color="white" />
          </Pressable>
        </View>
        <View className="mt-4 px-4 self-end flex flex-row items-center space-x-2">
          <Text className="text-black" style={OutfitSemiBold}>
            7 Hari Terakhir
          </Text>
          <Switch
            value={checked}
            onValueChange={setChecked}
            trackColor={{ false: "#767577", true: C[1] }}
          />
        </View>
        <FlatList
          data={[{}]}
          refreshing={loading}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.5}
          onRefresh={() => fetchData(new Date())}
          renderItem={() => (
            <View className="mt-4 px-4">
              {!loading && data.length === 0 ? (
                <View className="w-full flex flex-col items-center justify-center">
                  <Text
                    className="text-lg text-neutral-950 font-medium text-center mt-40"
                    style={OutfitRegular}
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
              <View className="h-96" />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
