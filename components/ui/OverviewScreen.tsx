import { OutfitRegular } from "@/constants/Fonts";
import { initOverview, Overview } from "@/models/Overview";
import { ResponseFail } from "@/models/Response";
import { getSavedOverview, refreshOverview } from "@/services/overview";
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Toast from "react-native-toast-message";

interface Props {
  data: Overview;
}

const OverviewScreen = ({ data }: Props) => {
  return (
    <Pressable className="bg-custom-1 border border-neutral-200 rounded-xl p-4 flex flex-row justify-around">
      <View className="flex flex-col gap-2 justify-center items-center  w-[40%]">
        <Text className="text-white font-medium" style={OutfitRegular}>
          Total Kontribusi
        </Text>
        <Text
          className="text-white text-4xl font-semibold"
          style={OutfitRegular}
        >
          {data.totalAnimal}
        </Text>
      </View>
      <View className="w-px h-16 bg-neutral-200" />
      <View className="flex flex-col gap-2 justify-center items-center w-[40%] ">
        <Text className="text-white font-medium" style={OutfitRegular}>
          Minggu Ini
        </Text>
        <Text
          className="text-white text-4xl font-semibold"
          style={OutfitRegular}
        >
          {data.totalWeekly}
        </Text>
      </View>
    </Pressable>
  );
};

export default OverviewScreen;
