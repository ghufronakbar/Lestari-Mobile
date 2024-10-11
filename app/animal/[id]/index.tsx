import {
  Image,
  View,
  Text,
  Pressable,
  ScrollView,
  Linking,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Inter } from "@/constants/Fonts";
import {
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import { Animal, initAnimal } from "@/models/Animal";
import { useEffect, useState } from "react";
import { getAnimalById } from "@/services/animal";
import { initSavedProfile, SavedProfile } from "@/models/SavedProfile";
import { getSavedProfile } from "@/services/account";
import formatDate from "@/utils/formatDate";
import Toast from "react-native-toast-message";
import ModalShowImage from "@/components/ui/ModalShowImage";

export default function DetailScreen() {
  const [data, setData] = useState<Animal>(initAnimal);
  const [prof, setProf] = useState<SavedProfile>(initSavedProfile);
  const [isShowImage, setIsShowImage] = useState<boolean>(false);
  const { id } = useLocalSearchParams() as { id: string };
  const fetchData = async () => {
    try {
      const response = await getAnimalById(Number(id));
      setData(response);
    } catch (error) {
      router.push({ pathname: "/(home)/history" });
    }
  };

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
    fetchData();
  }, []);

  const openMaps = async () => {
    const supported = await Linking.canOpenURL(data.urlGoogleMap);
    if (supported) {
      await Linking.openURL(data.urlGoogleMap);
    } else {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Link Maps Tidak Tersedia",
      });
    }
  };

  useNavigation().setOptions({
    headerShown: false,
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FAFAFA", dark: "#1D3D47" }}
      headerImage={
        <Pressable onPress={() => setIsShowImage(true)}>
          <Image
            source={
              data.animalId === 0
                ? require("@/assets/placeholder.jpg")
                : { uri: data.image }
            }
            className="w-full h-full object-cover"
          />
        </Pressable>
      }
    >
      <View className="space-y-4">
        <View className="flex flex-row justify-between">
          <View className="flex flex-col max-w-[90%]">
            <Pressable
              className="flex flex-row space-x-2 items-center mb-4"
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
              <Text className="text-base text-neutral-600" style={Inter}>
                Kembali
              </Text>
            </Pressable>
            <Text className="text-3xl text-black font-bold" style={Inter}>
              {data.localName}
            </Text>
            <Text
              className="text-lg text-neutral-600 font-semibold italic"
              style={Inter}
            >
              {data.latinName}
            </Text>
          </View>
          {data.isEditable && (
            <MaterialCommunityIcons
              name="circle-edit-outline"
              size={24}
              color="black"
              onPress={() => {
                router.push({
                  pathname: "/animal/[id]/edit",
                  params: { id: data.animalId },
                });
              }}
            />
          )}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row space-x-1">
            <View className="flex flex-row gap-1 items-center mr-1">
              <FontAwesome6 name="envira" size={18} color="#42b968" />
              <Text className="text-sm text-black">{data.habitat}</Text>
            </View>
            <Entypo name="dot-single" size={18} color="black" />
            <View className="flex flex-row gap-1 items-center mr-1">
              <Ionicons name="location" size={18} color="#8cc5ff" />
              <Text className="text-sm text-black">{data.city}</Text>
            </View>
            <Entypo name="dot-single" size={18} color="black" />
            <View className="flex flex-row gap-1 items-center">
              <Octicons name="number" size={18} color="#fcaea4" />
              <Text className="text-sm text-black">{data.amount} Ekor</Text>
            </View>
            <Entypo name="dot-single" size={18} color="black" />
            <Pressable
              className="flex flex-row gap-1 items-center"
              onPress={openMaps}
            >
              <FontAwesome6 name="location-arrow" size={18} color="black" />
              <Text className="text-sm text-black">Cek Lokasi</Text>
            </Pressable>
          </View>
        </ScrollView>
        <View className="flex flex-row border border-neutral-200 rounded-xl p-2 space-x-4 items-center">
          <Image
            source={
              prof.picture === ""
                ? require("@/assets/profile.png")
                : { uri: prof.picture }
            }
            className="w-[18%] aspect-square rounded-full object-cover"
          />
          <View className="flex flex-col max-w-[74%]">
            <Text
              className="text-black text-lg font-semibold"
              style={Inter}
              numberOfLines={1}
            >
              {prof.name}
            </Text>
            <Text
              className="text-neutral-600 text-sm"
              style={Inter}
              numberOfLines={1}
            >
              {prof.email}
            </Text>
          </View>
        </View>
        <View className="flex flex-col space-y-2">
          <Text className="text-black text-lg font-semibold" style={Inter}>
            Detail Data Satwa
          </Text>
          <View>
            <Text className="text-black text-base font-semibold" style={Inter}>
              Ditemukan Pada:
            </Text>
            <Text
              className="text-neutral-600 text-base font-semibold"
              style={Inter}
            >
              {data.animalId !== 0 && formatDate(data.createdAt)}
            </Text>
          </View>
          <View>
            <Text className="text-black text-base font-semibold" style={Inter}>
              Terakhir Diubah:
            </Text>
            <Text
              className="text-neutral-600 text-base font-semibold"
              style={Inter}
            >
              {data.animalId !== 0 && formatDate(data.updatedAt)}
            </Text>
          </View>
          <View>
            <Text className="text-black text-base font-semibold" style={Inter}>
              Titik Koordinat:
            </Text>
            <Text
              className="text-neutral-600 text-base font-semibold"
              style={Inter}
            >
              {data.animalId !== 0 && `${data.latitude}, ${data.longitude}`}
            </Text>
          </View>
          <View>
            <Text className="text-black text-base font-semibold" style={Inter}>
              Deskripsi:
            </Text>
            <Text
              className="text-neutral-600 text-base font-semibold"
              style={Inter}
            >
              {data.description}
            </Text>
          </View>
        </View>
      </View>
      <ModalShowImage
        visible={isShowImage}
        onClose={() => {
          setIsShowImage(false);
        }}
        url={
          data.animalId === 0
            ? require("@/assets/placeholder.jpg")
            : { uri: data.image }
        }
        title={data.localName}
      />
    </ParallaxScrollView>
  );
}
