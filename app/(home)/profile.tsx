import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Platform,
  FlatList,
} from "react-native";
import { OutfitRegular } from "@/constants/Fonts";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { logout } from "@/services/auth";
import { useEffect, useState } from "react";
import { initSavedProfile, SavedProfile } from "@/models/SavedProfile";
import {
  changePicture,
  deletePicture,
  getSavedProfile,
} from "@/services/account";
import ModalActionImage from "@/components/ui/ModalActionImage";
import OverviewCard from "@/components/ui/OverviewScreen";
import compressImage from "@/utils/compressImage";
import { ImageResult } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { initOverview, Overview } from "@/models/Overview";
import { getOverview } from "@/services/overview";

export default function ProfileScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });

  const [prof, setProf] = useState<SavedProfile>(initSavedProfile);
  const [isPickImage, setIsPickImage] = useState<boolean>(false);
  const [overview, setOverview] = useState<Overview>(initOverview);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = async (key?: Date) => {
    setLoading(true);
    const [resOverview] = await Promise.all([getOverview(key)]);
    setOverview(resOverview.data);
    setLoading(false);
  };

  const fetchResult = async () => {
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
    fetchResult();
    fetchData();
  }, []);

  const handlePickGallery = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setIsPickImage(false);
      try {
        const compressedImage = await compressImage(result.assets[0].uri);

        await changePicture(compressedImage);
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Berhasil mengganti foto profile",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Gagal mengganti foto profile",
        });
      } finally {
        await fetchResult();
      }
    }
  };

  const handlePickCamera = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setIsPickImage(false);
      try {
        const compressedImage = await compressImage(result.assets[0].uri);
        await changePicture(compressedImage);
        Toast.show({
          type: "success",
          text1: "Berhasil",
          text2: "Berhasil mengganti foto profile",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Gagal mengganti foto profile",
        });
      } finally {
        await fetchResult();
      }
    }
  };

  const handleDeleteImage = async () => {
    setIsPickImage(false);
    Toast.show({
      type: "info",
      text1: "Loading...",
      text2: "Menghapus Foto Profile",
    });
    try {
      await deletePicture();
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2: "Berhasil menghapus foto profile",
      });
      fetchResult();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Gagal menghapus foto profile",
      });
    }
  };

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 36 : 0 }}>
      <ModalActionImage
        isVisible={isPickImage}
        onCamera={handlePickCamera}
        onGallery={handlePickGallery}
        onClose={() => setIsPickImage(false)}
        message="Pilih Aksi untuk Melanjutkan"
        title="Edit Foto Profile"
        onDelete={prof.phone !== "" ? handleDeleteImage : undefined}
      />

      <FlatList
        data={[{}]}
        refreshing={loading}
        onRefresh={() => fetchData(new Date())}
        renderItem={() => (
          <View className="px-4  flex flex-col h-screen space-y-8">
            <Pressable
              className="relative w-32  h-32 mt-10 self-center"
              onPress={() => {
                setIsPickImage(true);
              }}
            >
              <Image
                source={
                  prof.picture === ""
                    ? require("@/assets/profile.png")
                    : { uri: prof.picture }
                }
                width={49}
                height={49}
                className="rounded-full w-full h-full object-cover"
              />
              <View className="w-fit h-fit rounded-full bottom-1 right-1 absolute bg-custom-1 z-10 flex items-center justify-center">
                <Ionicons name="add" color="white" size={24} />
              </View>
            </Pressable>
            <View>
              <Text
                className="text-black text-2xl self-center font-semibold text-center"
                style={OutfitRegular}
              >
                {prof.name}
              </Text>
              <Text
                className="text-neutral-600 text-base self-center font-medium text-center"
                style={OutfitRegular}
              >
                {prof.email}
              </Text>
              <Text
                className="text-neutral-600 text-base self-center font-medium text-center"
                style={OutfitRegular}
              >
                +{prof.phone.slice(0, 2)} {prof.phone.slice(2, 5)}-
                {prof.phone.slice(5, 9)}-{prof.phone.slice(9)}
              </Text>
            </View>
            <View>
              <OverviewCard data={overview} />
            </View>
            <View className="flex flex-col space-y-4 px-4">
              {MENUS.map((item, index) => (
                <Pressable
                  className="flex flex-row items-center"
                  key={index}
                  onPress={() => {
                    if (item.onPress) {
                      item.onPress();
                    }
                  }}
                >
                  <View className="w-[10%]">{item.icon}</View>
                  <Text
                    className="text-base font-normal text-neutral-600 tracking-wide"
                    style={OutfitRegular}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>
            <View className="h-40" />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

interface MenuProfile {
  name: string;
  icon: React.ReactNode;
  onPress: (() => void) | null;
}

const MENUS: MenuProfile[] = [
  {
    name: "Riwayat Input Satwa",
    icon: <MaterialCommunityIcons name="bird" size={18} color="#3b82f6" />,
    onPress: () => router.push("/(home)/history"),
  },
  {
    name: "Ubah Kata Sandi",
    icon: <MaterialCommunityIcons name="lock" size={18} color="#3b82f6" />,
    onPress: () => router.push("/feature/change-password"),
  },
  {
    name: "Ubah Nomor Telepon",
    icon: <MaterialCommunityIcons name="phone" size={18} color="#3b82f6" />,
    onPress: () => router.push("/feature/change-phone"),
  },
  {
    name: "Permintaan Data Satwa",
    icon: <MaterialCommunityIcons name="database" size={18} color="#3b82f6" />,
    onPress: () => router.push("/request-data"),
  },
  {
    name: "Laporkan Masalah Aplikasi",
    icon: <MaterialIcons name="report-problem" size={18} color="#3b82f6" />,
    onPress: () => router.push("/feature/error-report"),
  },
  {
    name: "Keluar",
    icon: <MaterialCommunityIcons name="logout" size={18} color="#525252" />,
    onPress: () => {
      router.replace({ pathname: "/logout" });
      logout();
    },
  },
];
