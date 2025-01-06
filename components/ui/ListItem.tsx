import { C } from "@/constants/Colors";
import { OutfitMedium, OutfitRegular } from "@/constants/Fonts";
import { RequestData } from "@/models/RequestData";
import formatDate from "@/utils/formatDate";
import { AntDesign } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export const ListContainer = ({ children }: { children?: React.ReactNode }) => {
  return <View className="flex flex-col justify-between">{children}</View>;
};

export const ListItem = ({ item }: { item: RequestData }) => {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/request-data/[id]",
          params: { id: item.requestDataId },
        })
      }
    >
      <View className="w-full border border-neutral-200 rounded-lg h-28 bg-white shadow-sm flex flex-row justify-between items-center px-4 mb-1">
        <View className="flex flex-col max-w-[80%]">
          <Text
            className="text-lg text-neutral-950 font-bold"
            numberOfLines={1}
            style={OutfitRegular}
          >
            {item.subject}
          </Text>
          <Text
            className="text-sm text-neutral-600 font-medium"
            numberOfLines={2}
            style={OutfitRegular}
          >
            {item.body}
          </Text>
          <Text
            className="text-xs text-neutral-600 font-medium mt-2"
            numberOfLines={1}
            style={OutfitRegular}
          >
            {formatDate(item.createdAt)}
          </Text>
        </View>
        <View className="flex flex-col items-center justify-center w-[20%] space-y-1">
          <View
            style={{
              backgroundColor: item.isPending
                ? C.info
                : item.isApproved
                ? C.success
                : C.error,
            }}
            className="px-2 py-1 rounded-full"
          >
            <Text className="text-xs text-white" style={OutfitMedium}>
              {item.isPending
                ? "Tertunda"
                : item.isApproved
                ? "Disetujui"
                : "Ditolak"}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
