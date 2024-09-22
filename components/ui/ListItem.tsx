import { C } from "@/constants/Colors";
import { Inter } from "@/constants/Fonts";
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
            style={Inter}
          >
            {item.subject}
          </Text>
          <Text
            className="text-sm text-neutral-600 font-medium"
            numberOfLines={2}
            style={Inter}
          >
            {item.body}
          </Text>
          <Text
            className="text-xs text-neutral-600 font-medium mt-2"
            numberOfLines={1}
            style={Inter}
          >
            {formatDate(item.createdAt)}
          </Text>
        </View>
        <View className="flex flex-col items-center justify-center w-[20%] space-y-1">
          <AntDesign
            name={
              item.isPending
                ? "clockcircle"
                : item.isApproved
                ? "checkcircle"
                : "closecircle"
            }
            size={24}
            color={
              item.isPending ? C.info : item.isApproved ? C.success : C.error
            }
          />
          <Text className="text-xs text-neutral-600 font-medium" style={Inter}>
            {item.isPending
              ? "Tertunda"
              : item.isApproved
              ? "Disetujui"
              : "Ditolak"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
