import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { ListContainer, ListItem } from "@/components/ui/ListItem";
import { router, useNavigation } from "expo-router";

export default function RequestDataScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });
  return (
    <SafeAreaView>
      <View className="px-4 pt-8 flex flex-col h-screen">
        <Text className="text-4xl text-neutral-950 font-bold" style={Inter}>
          Permintaan Data
        </Text>
        <View className="mt-8 flex flex-row justify-between">
          <TextInput
            className="w-[80%] bg-white border border-neutral-200 rounded-l-lg px-4 py-2 h-12"
            placeholder="Cari..."
            placeholderTextColor={'#a3a3a3'}
          />
          <View className="w-[20%] flex flex-row items-center justify-center bg-custom-1 rounded-r-lg">
            <Ionicons name="search" size={24} color="white" />
          </View>
        </View>
        <Pressable
          className="absolute bg-custom-1 w-fit h-fit p-4 rounded-full bottom-24 right-6 z-50 flex items-center justify-center"
          onPress={() => router.push("/request-data/add")}
        >
          <Ionicons name="add" color={"white"} size={24} />
        </Pressable>
        <ScrollView className="mt-8">
          <ListContainer>
            <ListItem />
            <ListItem />
            <ListItem />
          </ListContainer>
          <View className="h-96" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
