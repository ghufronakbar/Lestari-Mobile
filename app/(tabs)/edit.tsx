import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Inter } from "@/constants/Fonts";
import {
  AntDesign,
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

export default function DetailScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FAFAFA", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={{
            uri: "https://ragunanzoo.jakarta.go.id/wp-content/uploads/2022/08/cendrawasih1-1024x682.jpg",
          }}
          className="w-full h-full object-cover"
        />
      }
    >
      <View className="space-y-4">
        <View className="flex flex-row justify-between">
          <View className="flex flex-col max-w-[90%]">
            <Text className="text-3xl text-black font-bold" style={Inter}>
              Nama Lokal
            </Text>
            <Text
              className="text-lg text-neutral-600 font-semibold"
              style={Inter}
            >
              Nama Latin
            </Text>
          </View>
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={24}
            color="black"
          />
        </View>
        <View className="flex flex-row space-x-1">
          <View className="flex flex-row gap-1 items-center mr-1">
            <FontAwesome6 name="envira" size={18} color="#42b968" />
            <Text className="text-sm text-black">Habitat</Text>
          </View>
          <Entypo name="dot-single" size={18} color="black" />
          <View className="flex flex-row gap-1 items-center mr-1">
            <Ionicons name="location" size={18} color="#8cc5ff" />
            <Text className="text-sm text-black">Lokasi</Text>
          </View>
          <Entypo name="dot-single" size={18} color="black" />
          <View className="flex flex-row gap-1 items-center">
            <Octicons name="number" size={18} color="#fcaea4" />
            <Text className="text-sm text-black">3 Ekor</Text>
          </View>
        </View>
        <View className="flex flex-row border border-neutral-200 rounded-xl p-2 space-x-4 items-center">
          <Image source={{ uri: "https://picsum.photos/200/300" }} className="w-[18%] aspect-square rounded-full object-cover" />
          <View className="flex flex-col max-w-[74%]">            
            <Text className="text-black text-lg font-semibold" style={Inter} numberOfLines={1}>Ghufron Akbar Ghufron Akbar Ghufron Akbar </Text>
            <Text className="text-neutral-600 text-sm" style={Inter} numberOfLines={1}>lanstheprodigy@gmail.com</Text>
          </View>
        </View>
        <View className="flex flex-col space-y-2">
          <Text className="text-black text-lg font-semibold" style={Inter}>
            Detail Data Satwa
          </Text>
          <View>
            <Text className="text-black text-base font-semibold" style={Inter}>
              Ditemukan Pada:
            </Text>
            <Text
              className="text-neutral-600 text-base font-semibold"
              style={Inter}
            >
              Selasa, 23 Februari 2022
            </Text>
          </View>
          <View>
            <Text className="text-black text-base font-semibold" style={Inter}>
              Titik Koordinat:
            </Text>
            <Text
              className="text-neutral-600 text-base font-semibold"
              style={Inter}
            >
              2395325, 3253052
            </Text>
          </View>
          <View>
            <Text className="text-black text-base font-semibold" style={Inter}>
              Deskripsi:
            </Text>
            <Text
              className="text-neutral-600 text-base font-semibold"
              style={Inter}
            >
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis veritatis, neque fugit quisquam illo, voluptas doloremque quam, corrupti dolor ipsa architecto itaque? Repellat vitae sequi minus ut dignissimos placeat, iusto maiores, maxime odit, doloremque sunt! Consequuntur odit voluptate aut unde corrupti nihil a saepe suscipit aliquam. Officia nesciunt vero rem ea consequatur enim iusto suscipit quis magnam illum! Cumque, tempora obcaecati voluptas error quis expedita perferendis consectetur fugiat facere sed at quae omnis iure eum. Vel distinctio soluta cupiditate necessitatibus iure odit. Neque rem mollitia excepturi magnam, esse adipisci necessitatibus, eius debitis incidunt deleniti itaque odio rerum doloremque dolores quae?
            </Text>
          </View>          
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
