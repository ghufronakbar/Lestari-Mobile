import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Keyboard,
  Platform,
  FlatList,
} from "react-native";
import { OutfitRegular } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { ListContainer, ListItem } from "@/components/ui/ListItem";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { RequestData } from "@/models/RequestData";
import { getAllReqData } from "@/services/requestData";
import SpinnerLoading from "@/components/ui/SpinnerLoading";
import { refresh } from "@/services/auth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RequestDataScreen() {
  const [data, setData] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const fetchData = async (key?: Date) => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      const response = await getAllReqData(key);
      setData(response.data);
    } catch (error) {
      await refresh();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className="bg-neutral-50">
      <View className="px-4 flex flex-col h-screen bg-neutral-50 ">
        <View className="flex flex-row justify-between">
          <TextInput
            className="w-[80%] bg-white border border-neutral-200 rounded-l-lg px-4 py-2 h-12"
            placeholder="Cari..."
            placeholderTextColor={"#a3a3a3"}
            value={search}
            style={OutfitRegular}
            onChangeText={(text) => setSearch(text)}
          />
          <View className="w-[20%] flex flex-row items-center justify-center bg-custom-1 rounded-r-lg">
            <Ionicons name="search" size={24} color="white" />
          </View>
        </View>
        <Pressable
          className="absolute bg-custom-1 w-fit h-fit p-4 rounded-full bottom-32 right-6 z-50 flex items-center justify-center"
          onPress={() => router.push({ pathname: "/request-data/add" })}
        >
          <Ionicons name="add" color={"white"} size={24} />
        </Pressable>
        <FlatList
          data={[{}]}
          refreshing={loading}
          onRefresh={() => fetchData(new Date())}
          renderItem={() => (
            <View className="mt-8">
              {filteredData.length === 0 ? (
                <View className="w-full flex flex-col items-center justify-center">
                  <Text
                    className="text-lg text-neutral-950 font-medium text-center mt-40"
                    style={OutfitRegular}
                  >
                    Tidak ada hasil{" "}
                    {search !== "" && (
                      <Text>
                        dengan keyword{" "}
                        <Text className="font-semibold">"{search}"</Text>
                      </Text>
                    )}
                  </Text>
                </View>
              ) : null}
              <ListContainer>
                {filteredData.map((item) => (
                  <ListItem key={item.requestDataId} item={item} />
                ))}
              </ListContainer>
              <View className="h-96" />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
