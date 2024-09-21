import { Inter } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

export const CardContainer = ({ children }: { children?: React.ReactNode }) => {
  return (
    <View className="flex flex-row flex-wrap justify-between">{children}</View>
  );
};

export const Card = ({ className }: { className?: string }) => {
  return (
    <Link href="/animal/1">
      <View
        className={`w-[45vw] h-60 border border-neutral-200 rounded-xl bg-white shadow-sm mb-2 overflow-hidden ${className}`}
      >
        <Image
          source={{ uri: "https://picsum.photos/200/300" }}
          className="w-full h-[60%] object-cover"
        />
        <View className="p-2 flex flex-col">
          <Text
            className="text-black text-lg font-medium"
            numberOfLines={1}
            style={Inter}
          >
            Nama Lokal
          </Text>
          <Text
            className="text-neutral-600 text-sm font-medium"
            numberOfLines={1}
            style={Inter}
          >
            Nama Latin
          </Text>
          <View className="flex flex-row items-center gap-1 mt-1">
            <Ionicons name="location" size={12} color="black" />
            <Text
              className="text-neutral-600 text-sm font-medium"
              style={Inter}
              numberOfLines={1}
            >
              Lokasi
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
};
