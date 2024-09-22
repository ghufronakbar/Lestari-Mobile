import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { logout } from "@/services/auth";
import { useEffect, useState } from "react";
import { initSavedProfile, SavedProfile } from "@/models/SavedProfile";
import { getSavedProfile } from "@/services/account";
import ModalActionImage from "@/components/ui/ModalActionImage";

export default function ProfileScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });

  const [prof, setProf] = useState<SavedProfile>(initSavedProfile);

  const fetchResult = async () => {
    const result = await getSavedProfile();
    console.log(result);
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
  }, []);

  return (
    <SafeAreaView>
      
      <ScrollView className="px-4 pt-8 flex flex-col h-screen space-y-8">
        <View className="relative w-32 h-32 self-center">
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
        </View>
        <View>
          <Text
            className="text-black text-2xl self-center font-semibold text-center"
            style={Inter}
          >
            {prof.name}
          </Text>
          <Text
            className="text-neutral-600 text-base self-center font-medium text-center"
            style={Inter}
          >
            {prof.email}
          </Text>
          <Text
            className="text-neutral-600 text-base self-center font-medium text-center"
            style={Inter}
          >
            +{prof.phone.slice(0, 2)} {prof.phone.slice(2, 5)}-
            {prof.phone.slice(5, 9)}-{prof.phone.slice(9)}
          </Text>
        </View>
        <View className="bg-custom-1 border border-neutral-200 rounded-xl p-4 flex flex-row justify-around">
          <View className="flex flex-col gap-2 justify-center items-center  w-[40%]">
            <Text className="text-white font-medium" style={Inter}>
              Total Kontribusi
            </Text>
            <Text className="text-white text-4xl font-semibold" style={Inter}>
              20
            </Text>
          </View>
          <View className="w-px h-16 bg-neutral-200" />
          <View className="flex flex-col gap-2 justify-center items-center w-[40%] ">
            <Text className="text-white font-medium" style={Inter}>
              Minggu Ini
            </Text>
            <Text className="text-white text-4xl font-semibold" style={Inter}>
              20
            </Text>
          </View>
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
                style={Inter}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
    icon: <MaterialCommunityIcons name="bird" size={18} color="#6D57FC" />,
    onPress: () => router.push("/(home)/history"),
  },
  {
    name: "Ubah Kata Sandi",
    icon: <MaterialCommunityIcons name="lock" size={18} color="#6D57FC" />,
    onPress: () => router.push("/feature/change-password"),
  },
  {
    name: "Ubah Nomor Telepon",
    icon: <MaterialCommunityIcons name="phone" size={18} color="#6D57FC" />,
    onPress: () => router.push("/feature/change-phone"),
  },
  {
    name: "Permintaan Data Satwa",
    icon: <MaterialCommunityIcons name="database" size={18} color="#6D57FC" />,
    onPress: () => router.push("/request-data"),
  },
  {
    name: "Keluar",
    icon: <MaterialCommunityIcons name="logout" size={18} color="#525252" />,
    onPress: () => logout(),
  },
];
