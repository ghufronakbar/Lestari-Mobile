import { Image, Text, SafeAreaView, View, ScrollView } from "react-native";
import { Inter } from "@/constants/Fonts";
import { Card, CardContainer } from "@/components/ui/Card";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "react-native-screens";

interface Greet {
  time: string;
  first: string;
  second: string;
}

export default function HomeScreen() {
  const now = new Date();
  let greet: Greet;
  if (now.getHours() < 12) {
    greet = {
      time: "Selamat Pagi",
      first: "Semangat Beraktivitas",
      second: "Kawan!",
    };
  } else if (now.getHours() < 15) {
    greet = {
      time: "Selamat Siang",
      first: "Waktunya Mendata",
      second: "Satwa!",
    };
  } else if (now.getHours() < 18) {
    greet = {
      time: "Selamat Sore",
      first: "Semoga Harimu",
      second: "Menyenangkan!",
    };
  } else {
    greet = {
      time: "Selamat Malam",
      first: "Jangan Lupa",
      second: "Istirahat!",
    };
  }
  return (
    <SafeAreaView>
      <ScrollView className="px-4 pt-8 space-y-8 bg-neutral-50 min-h-screen">
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-col gap-2">
            <Text
              className="text-base text-neutral-600 font-semibold"
              style={Inter}
            >
              {greet.time} 👋
            </Text>
            <Text
              className="text-2xl text-neutral-950 font-semibold"
              style={Inter}
            >
              Ghufron Akbar
            </Text>
          </View>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            }}
            width={49}
            height={49}
            className="rounded-full h-full aspect-square object-cover"
          />
        </View>
        <View className="flex flex-col space-y-2">
          <Text className="text-black text-4xl" style={Inter}>
            {greet.first}
          </Text>
          <Text className="text-custom-1 text-4xl" style={Inter}>
            {greet.second}
          </Text>
        </View>
        <View className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-row justify-around">
          <View className="flex flex-col gap-2 justify-center items-center  w-[40%]">
            <Text className="text-neutral-600 font-medium" style={Inter}>
              Total Kontribusi
            </Text>
            <Text className="text-4xl font-semibold" style={Inter}>
              20
            </Text>
          </View>
          <View className="w-px h-16 bg-neutral-200" />
          <View className="flex flex-col gap-2 justify-center items-center w-[40%]">
            <Text className="text-neutral-600 font-medium" style={Inter}>
              Minggu Ini
            </Text>
            <Text className="text-4xl font-semibold" style={Inter}>
              20
            </Text>
          </View>
        </View>
        <View className="flex flex-col">
          <View className="flex flex-row items-center justify-between mb-6">
            <Text className="text-black text-xl font-semibold" style={Inter}>
              Riwayat Kontribusi
            </Text>
            <Text className="text-custom-1 text-base" style={Inter}>
              Lihat Semua
            </Text>
          </View>
          <ScrollView horizontal>
            <Card />
            <Card />
            <Card />
            <Card />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
