import {
  Image,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { Card } from "@/components/ui/Card";
import { Link, router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { initSavedProfile, SavedProfile } from "@/models/SavedProfile";
import { getSavedProfile } from "@/services/account";
import greet from "@/helpers/greet";
import { Animal } from "@/models/Animal";
import { getAllAnimals } from "@/services/animal";
import Overview from "@/components/ui/OverviewScreen";
import { C } from "@/constants/Colors";

export default function HomeScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });

  const [prof, setProf] = useState<SavedProfile>(initSavedProfile);
  const [data, setData] = useState<Animal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await getAllAnimals("", 5);
    setData(response.data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {};
    }, [])
  );

  const fetchProfile = async () => {
    const result = await getSavedProfile();
    setProf({
      accessToken: result.accessToken || "",
      refreshToken: result.refreshToken || "",
      name: result.name || "",
      email: result.email || "",
      phone: result.phone || "",
      picture: result.picture || "",
    });
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 36 : 0 }}>
      <ScrollView className="px-4 space-y-8 bg-neutral-50 min-h-screen">
        <View className="flex flex-row justify-between items-center py-4">
          <View className="flex flex-col gap-2 w-[85%]">
            <Text
              className="text-base text-neutral-600 font-semibold"
              style={Inter}
            >
              {greet.time} 👋
            </Text>
            <Text
              className="text-2xl text-neutral-950 font-semibold"
              style={Inter}
              numberOfLines={1}
            >
              {prof.name.split(" ").slice(0, 2).join(" ")}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              fetchProfile();
              router.push({ pathname: "/(home)/profile" });
            }}
            className="w-[15%] aspect-square"
          >
            <Image
              source={
                prof.picture === ""
                  ? require("@/assets/profile.png")
                  : { uri: prof.picture }
              }
              width={49}
              height={49}
              className="rounded-full w-12 h-12 aspect-square object-cover"
            />
          </Pressable>
        </View>
        <View className="flex flex-col space-y-2">
          <Text className="text-black text-4xl" style={Inter}>
            {greet.first}
          </Text>
          <Text className="text-custom-1 text-4xl" style={Inter}>
            {greet.second}
          </Text>
        </View>
        <View>
          <Overview />
        </View>
        <View className="flex flex-col">
          <View className="flex flex-row items-center justify-between mb-6">
            <Text className="text-black text-xl font-semibold" style={Inter}>
              Riwayat Kontribusi
            </Text>
            <Link href={"/(home)/history"}>
              <Text className="text-custom-1 text-base" style={Inter}>
                Lihat Semua
              </Text>
            </Link>
          </View>
          <ScrollView horizontal>
            {data.map((item) => (
              <Card key={item.animalId} item={item} isPadding />
            ))}
          </ScrollView>
          {!loading && !data.length && (
            <View className="flex-1 items-center justify-center mt-16">
              <Text className="text-black text-lg">Tidak ada riwayat</Text>
            </View>
          )}
          {loading && (
            <View className="flex-1 items-center justify-center mt-16">
              <ActivityIndicator size="large" color={C[1]} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
