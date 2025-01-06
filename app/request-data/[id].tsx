import {
  View,
  Text,
  ScrollView,
  Pressable,
  Linking,
  Image,
  Platform,
} from "react-native";
import { OutfitBold, OutfitMedium, OutfitRegular } from "@/constants/Fonts";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ListContainer, ListItem } from "@/components/ui/ListItem";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { C } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { initRequestData, RequestData } from "@/models/RequestData";
import formatDate from "@/utils/formatDate";
import { getReqDataById } from "@/services/requestData";
import Toast from "react-native-toast-message";
import ModalShowImage from "@/components/ui/ModalShowImage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailRequestDataScreen() {
  const [isShowImage, setIsShowImage] = useState<boolean>(false);
  const [data, setData] = useState<RequestData>(initRequestData);
  const { id } = useLocalSearchParams() as { id: string };
  const fetchData = async () => {
    try {
      const response = await getReqDataById(Number(id));
      setData(response);
    } catch (error) {
      router.push({ pathname: "/request-data" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownload = async () => {
    const supported = await Linking.canOpenURL(data.sendDatas[0].url);
    if (supported) {
      await Linking.openURL(data.sendDatas[0].url);
    } else {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Terjadi Kesalahan Saat Mengunduh File",
      });
    }
  };

  return (
    <SafeAreaView>
      <View className="px-4 flex flex-col h-screen space-y-4">
        <ScrollView className="space-y-4">
          <Text
            className="text-4xl text-neutral-950"
            style={OutfitBold}
          >
            {data.subject}
          </Text>
          <View>
            <View
              className={`flex flex-row items-center justify-center w-[26%] py-2 px-2 space-x-1 rounded-xl ${
                data.isPending
                  ? "bg-custom-info"
                  : data.isApproved
                  ? "bg-custom-success"
                  : "bg-custom-error"
              }`}
            >
              <AntDesign
                name={
                  data?.isPending
                    ? "clockcircle"
                    : data.isApproved
                    ? "check"
                    : "close"
                }
                size={12}
                color="white"
              />
              <Text
                className="text-xs text-white"
                style={OutfitMedium}
              >
                {data.isPending
                  ? "Tertunda"
                  : data.isApproved
                  ? "Disetujui"
                  : "Ditolak"}
              </Text>
            </View>
          </View>
          <View>
            <Text className="font-medium" style={OutfitRegular}>
              Diajukan Pada:{" "}
              {data.requestDataId === 0 ? "-" : `${formatDate(data.createdAt)}`}
            </Text>
            <Text className="font-medium" style={OutfitRegular}>
              Dijawab Pada:{" "}
              {data.requestDataId === 0 ? "-" : `${formatDate(data.createdAt)}`}
            </Text>
          </View>
          <Text className="text-neutral-600 text-base" style={OutfitRegular}>
            {data.body}
          </Text>
          <Text className="font-medium" style={OutfitRegular}>
            Lampiran:
          </Text>
          <Pressable onPress={() => setIsShowImage(true)}>
            <Image
              source={
                data.requestDataId === 0
                  ? require("@/assets/placeholder.jpg")
                  : { uri: data.attachment }
              }
              className="w-full h-40 object-cover rounded-lg border border-neutral-300 overflow-hidden shadow-sm"
            />
          </Pressable>
          <Text
            className="font-medium text-neutral-600 text-xs -mt-4"
            style={OutfitRegular}
          >
            *Klik untuk melihat
          </Text>
          {!data.isPending && data.isApproved && data.sendDatas.length > 0 && (
            <Pressable
              className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2"
              onPress={handleDownload}
            >
              <Text
                className="text-sm text-white text-center"
                style={OutfitRegular}
              >
                Unduh
              </Text>
            </Pressable>
          )}
          <ModalShowImage
            visible={isShowImage}
            onClose={() => {
              setIsShowImage(false);
            }}
            url={
              data.requestDataId === 0
                ? require("@/assets/placeholder.jpg")
                : { uri: data.attachment }
            }
            title="Lampiran"
          />
          <View className="h-96" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
