import { OutfitRegular } from "@/constants/Fonts";
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
  isPadding = false,
}: {
  item: Animal;
  className?: string;
  isPadding?: boolean;
}) => {
  return (
    <Pressable
      className={`${
        isPadding ? "mr-2" : ""
      } ${className} w-[45vw] h-60 border border-neutral-200 rounded-xl bg-white shadow-sm mb-2 overflow-hidden`}
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
          style={OutfitRegular}
        >
          {item.localName}
        </Text>
        <Text
          className="text-neutral-600 text-sm font-medium italic"
          numberOfLines={1}
          style={OutfitRegular}
        >
          {item.latinName}
        </Text>
        <View className="flex flex-row items-center gap-1 mt-1">
          <Ionicons name="location" size={12} color="black" />
          <Text
            className="text-neutral-600 text-sm font-medium"
            style={OutfitRegular}
            numberOfLines={1}
          >
            {item.city}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
