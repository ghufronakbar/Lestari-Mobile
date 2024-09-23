import { Inter } from "@/constants/Fonts";
import { initOverview, Overview } from "@/models/Overview";
import { ResponseFail } from "@/models/Response";
import { getSavedOverview, refreshOverview } from "@/services/overview";
import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Toast from "react-native-toast-message";

const OverviewScreen = () => {
  const [data, setData] = useState<Overview>(initOverview);

  const fetchData = async () => {
    const response = await getSavedOverview();
    setData(response);
  };
  useEffect(() => {
    fetchData();
  });

  const handleRefresh = async () => {
    Toast.show({
      type: "info",
      text1: "Loading...",
      text2: "Harap Tunggu Sebentar...",
    });
    try {
      const response = await refreshOverview();
      setData(response.data);
      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Berhasil Refresh Data",
      });
    } catch (error) {      
      const err = error as ResponseFail;
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: err?.response?.data?.message || "Terjadi kesalahan",
      });
    }
  };

  return (
    <Pressable
      className="bg-custom-1 border border-neutral-200 rounded-xl p-4 flex flex-row justify-around"
      onLongPress={handleRefresh}
    >
      <View className="flex flex-col gap-2 justify-center items-center  w-[40%]">
        <Text className="text-white font-medium" style={Inter}>
          Total Kontribusi
        </Text>
        <Text className="text-white text-4xl font-semibold" style={Inter}>
          {data.totalAnimal}
        </Text>
      </View>
      <View className="w-px h-16 bg-neutral-200" />
      <View className="flex flex-col gap-2 justify-center items-center w-[40%] ">
        <Text className="text-white font-medium" style={Inter}>
          Minggu Ini
        </Text>
        <Text className="text-white text-4xl font-semibold" style={Inter}>
          {data.totalWeekly}
        </Text>
      </View>
    </Pressable>
  );
};

export default OverviewScreen;
