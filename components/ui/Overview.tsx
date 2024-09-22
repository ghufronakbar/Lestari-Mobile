import { Inter } from "@/constants/Fonts";
import { View, Text, Pressable } from "react-native";

const Overview = () => {
  return (
    <Pressable className="bg-custom-1 border border-neutral-200 rounded-xl p-4 flex flex-row justify-around">
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
    </Pressable>
  );
};

export default Overview;
