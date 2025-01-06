import {
  Image,
  View,
  Text,
  Pressable,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { OutfitBold, OutfitRegular, OutfitSemiBold } from "@/constants/Fonts";
import {
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Animal, initAnimal } from "@/models/Animal";
import { useCallback, useEffect, useState } from "react";
import { getAnimalById } from "@/services/animal";
import { initSavedProfile, SavedProfile } from "@/models/SavedProfile";
import { getSavedProfile } from "@/services/account";
import formatDate from "@/utils/formatDate";
import Toast from "react-native-toast-message";
import ModalShowImage from "@/components/ui/ModalShowImage";
import {
  AnimalDraft,
  getDraftByKey,
  removeFromDraft,
  uploadDrafts,
} from "@/services/draft";

export default function DetailDraftScreen() {
  const [data, setData] = useState<AnimalDraft>();
  const [prof, setProf] = useState<SavedProfile>(initSavedProfile);
  const [isShowImage, setIsShowImage] = useState<boolean>(false);
  const { id } = useLocalSearchParams() as { id: string };
  const fetchData = async () => {
    try {
      const response = await getDraftByKey(id);
      if (!response) {
        router.back();
      } else {
        setData(response);
      }
    } catch (error) {
      router.push({ pathname: "/(home)/history" });
    }
  };

  const handleDelete = async () => {
    await removeFromDraft(id);
    Toast.show({
      type: "success",
      text1: "Sukses",
      text2: "Berhasil Menghapus Draft Satwa",
    });
    router.back();
  };

  const handleUpload = async () => {
    try {
      Toast.show({
        type: "info",
        text1: "Loading",
        text2: "Mengupload Draft Satwa",
      });
      await uploadDrafts(id);
      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Berhasil Mengupload Draft Satwa",
      });
      router.back();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal Mengupload Draft Satwa, Cek Koneksi Internet Anda",
      });
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

  useFocusEffect(
    useCallback(() => {
      fetchData();
      fetchProfile();
    }, [])
  );

  const openMaps = async () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${data?.latitude},${data?.longitude}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
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
              data?.key === undefined
                ? require("@/assets/placeholder.jpg")
                : { uri: data?.image?.uri }
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
              <Text
                className="text-base text-neutral-600"
                style={OutfitRegular}
              >
                Kembali
              </Text>
            </Pressable>
            <Text className="text-3xl text-black" style={OutfitBold}>
              {data?.localName}
            </Text>
            <Text
              className="text-lg text-neutral-600 italic"
              style={OutfitSemiBold}
            >
              {data?.latinName}
            </Text>
            <View className="items-center bg-custom-2 py-1 px-2 rounded-full w-20 mt-2">
              <Text className="text-xs text-white" style={OutfitRegular}>
                Draft
              </Text>
            </View>
          </View>

          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={24}
            color="black"
            onPress={() => {
              router.push({
                pathname: "/edit-draft",
                params: { id: data?.key },
              });
            }}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row space-x-1">
            <View className="flex flex-row gap-1 items-center mr-1">
              <FontAwesome6 name="envira" size={18} color="#42b968" />
              <Text className="text-sm text-black" style={OutfitRegular}>
                {data?.habitat}
              </Text>
            </View>
            <Entypo name="dot-single" size={18} color="black" />
            <View className="flex flex-row gap-1 items-center mr-1">
              <Ionicons name="location" size={18} color="#8cc5ff" />
              <Text className="text-sm text-black" style={OutfitRegular}>
                {data?.city}
              </Text>
            </View>
            <Entypo name="dot-single" size={18} color="black" />
            <View className="flex flex-row gap-1 items-center">
              <Octicons name="number" size={18} color="#fcaea4" />
              <Text className="text-sm text-black" style={OutfitRegular}>
                {data?.amount} Ekor
              </Text>
            </View>
            <Entypo name="dot-single" size={18} color="black" />
            <Pressable
              className="flex flex-row gap-1 items-center"
              onPress={openMaps}
            >
              <FontAwesome6 name="location-arrow" size={18} color="black" />
              <Text className="text-sm text-black" style={OutfitRegular}>
                Cek Lokasi
              </Text>
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
              style={OutfitRegular}
              numberOfLines={1}
            >
              {prof.name}
            </Text>
            <Text
              className="text-neutral-600 text-sm"
              style={OutfitRegular}
              numberOfLines={1}
            >
              {prof.email}
            </Text>
          </View>
        </View>
        <View className="flex flex-col space-y-2">
          <Text
            className="text-black text-lg font-semibold"
            style={OutfitRegular}
          >
            Detail Data Satwa
          </Text>
          <View>
            <Text
              className="text-black text-base font-semibold"
              style={OutfitRegular}
            >
              Ditemukan Pada:
            </Text>
            <Text
              className="text-neutral-600 text-base font-semibold"
              style={OutfitRegular}
            >
              {data?.key !== undefined && formatDate(data?.createdAt)}
            </Text>
          </View>
          <View>
            <Text
              className="text-black text-base font-semibold"
              style={OutfitRegular}
            >
              Terakhir Diubah:
            </Text>
            <Text
              className="text-neutral-600 text-base font-semibold"
              style={OutfitRegular}
            >
              {data?.key !== undefined && formatDate(data?.createdAt)}
            </Text>
          </View>
          <View>
            <Text
              className="text-black text-base font-semibold"
              style={OutfitRegular}
            >
              Titik Koordinat:
            </Text>
            <Text
              className="text-neutral-600 text-base font-semibold"
              style={OutfitRegular}
            >
              {data?.key !== undefined &&
                `${data?.latitude}, ${data?.longitude}`}
            </Text>
          </View>
          <View>
            <Text
              className="text-black text-base font-semibold"
              style={OutfitRegular}
            >
              Deskripsi:
            </Text>
            <Text
              className="text-neutral-600 text-base font-semibold"
              style={OutfitRegular}
            >
              {data?.description}
            </Text>
          </View>
          <View className="mt-2" />
          <TouchableOpacity
            className="bg-white border border-red-600 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2"
            onPress={handleDelete}
          >
            <Text
              className="text-sm text-red-600 text-center"
              style={OutfitRegular}
            >
              Hapus
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2"
            onPress={handleUpload}
          >
            <Text
              className="text-sm text-white text-center"
              style={OutfitRegular}
            >
              Unggah
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalShowImage
        visible={isShowImage}
        onClose={() => {
          setIsShowImage(false);
        }}
        url={
          data?.key === undefined
            ? require("@/assets/placeholder.jpg")
            : { uri: data?.image }
        }
        title={data?.localName || ""}
      />
    </ParallaxScrollView>
  );
}
