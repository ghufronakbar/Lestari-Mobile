import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
  Keyboard,
  Platform,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { ListContainer, ListItem } from "@/components/ui/ListItem";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { RequestData } from "@/models/RequestData";
import { getAllReqData } from "@/services/requestData";
import SpinnerLoading from "@/components/ui/SpinnerLoading";
import { refresh } from "@/services/auth";

export default function RequestDataScreen() {
  const [data, setData] = useState<RequestData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const fetchData = async () => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      const response = await getAllReqData();
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

  useNavigation().setOptions({
    headerShown: false,
  });

  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 36 : 0 }}>
      <View className="px-4 flex flex-col h-screen bg-neutral-50 ">
        <View className="flex flex-row items-center space-x-2">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
          <Text className="text-4xl text-neutral-950 font-bold" style={Inter}>
            Permintaan Data
          </Text>
        </View>
        <View className="mt-8 flex flex-row justify-between">
          <TextInput
            className="w-[80%] bg-white border border-neutral-200 rounded-l-lg px-4 py-2 h-12"
            placeholder="Cari..."
            placeholderTextColor={"#a3a3a3"}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <View className="w-[20%] flex flex-row items-center justify-center bg-custom-1 rounded-r-lg">
            <Ionicons name="search" size={24} color="white" />
          </View>
        </View>
        <Pressable
          className="absolute bg-custom-1 w-fit h-fit p-4 rounded-full bottom-24 right-6 z-50 flex items-center justify-center"
          onPress={() => router.push({ pathname: "/request-data/add" })}
        >
          <Ionicons name="add" color={"white"} size={24} />
        </Pressable>
        <ScrollView className="mt-8">
          {filteredData.length === 0 ? (
            <View className="w-full h-full flex flex-col items-center justify-center">
              <Text
                className="text-lg text-neutral-950 font-medium text-center"
                style={Inter}
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
