import { Inter } from "@/constants/Fonts";
import { Animal } from "@/models/Animal";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export const CardContainer = ({ children }: { children?: React.ReactNode }) => {
  return (
    <View className="flex flex-row flex-wrap justify-between">{children}</View>
  );
};

export const Card = ({
  item,
  className,
}: {
  item: Animal;
  className?: string;
}) => {
  return (
    <Pressable
      className={`w-[45vw] h-60 border border-neutral-200 rounded-xl bg-white shadow-sm mb-2 overflow-hidden ${className}`}
      onPress={() =>
        router.push({
          pathname: "/animal/[id]",
          params: { id: item.animalId },
        })
      }
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-[60%] object-cover"
      />
      <View className="p-2 flex flex-col">
        <Text
          className="text-black text-lg font-medium"
          numberOfLines={1}
          style={Inter}
        >
          {item.localName}
        </Text>
        <Text
          className="text-neutral-600 text-sm font-medium"
          numberOfLines={1}
          style={Inter}
        >
          {item.latinName}
        </Text>
        <View className="flex flex-row items-center gap-1 mt-1">
          <Ionicons name="location" size={12} color="black" />
          <Text
            className="text-neutral-600 text-sm font-medium"
            style={Inter}
            numberOfLines={1}
          >
            {item.city}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
