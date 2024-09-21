import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ListContainer, ListItem } from "@/components/ui/ListItem";
import { router, useNavigation } from "expo-router";
import { C } from "@/constants/Colors";

export default function DetailRequestDataScreen() {
  useNavigation().setOptions({
    headerShown: false,
  });
  return (
    <SafeAreaView>
      <ScrollView className="px-4 pt-8 flex flex-col h-screen space-y-4">
        <Text className="text-4xl text-neutral-950 font-bold" style={Inter}>
          Lorem ipsum, dolor sit amet consectetur adipisicing
        </Text>
        <View>
          <View className="flex flex-row items-center justify-center w-[26%] py-1 px-2 space-x-1 bg-custom-success rounded-xl">
            <AntDesign name="check" size={16} color="white" />
            <Text className="text-xs text-white font-medium" style={Inter}>
              Disetujui
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-medium" style={Inter}>
            Diajukan Pada: Selasa, 12 Desember 2024
          </Text>
          <Text className="font-medium" style={Inter}>
            Dijawab Pada: -
          </Text>
        </View>
        <Text className="text-neutral-600 text-base" style={Inter}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid enim
          impedit minus nam soluta voluptatum reiciendis accusantium placeat
          cumque quibusdam doloremque voluptates dolorem nihil atque odit odio
          delectus voluptas, qui vel ipsa. Nisi quam illum, modi a saepe
          temporibus quibusdam eum ex soluta aspernatur maiores commodi
          doloremque hic consectetur distinctio quos voluptatem illo dicta
          impedit, quia iusto voluptates necessitatibus odio eius. Harum,
          delectus necessitatibus! Ipsa iure sequi, iste qui deserunt explicabo
          sint, ipsum debitis aperiam vero optio id eaque dolores ut recusandae,
          vitae quia! Corrupti doloribus neque similique, ea dolor quaerat,
          saepe quia quam voluptatibus suscipit quos sit temporibus voluptate
          ullam rerum a sequi enim delectus, doloremque praesentium vero?
          Distinctio quos autem doloremque sed ut nam perferendis reiciendis
          nulla! Architecto id dolore expedita, fuga quo adipisci. Modi at
          pariatur molestias iste commodi ipsam autem iure doloremque saepe
          dolor quo quibusdam vel harum vitae, consectetur quos fugiat atque
          doloribus. Eius maiores illum recusandae. Consectetur explicabo facere
          non eius inventore in temporibus fugiat? In repellendus enim, esse
          magnam veniam, earum modi dolorem, architecto ipsum dolorum voluptatem
          hic praesentium officia aliquid ducimus! Labore, doloribus distinctio.
          Tempora laborum excepturi soluta voluptate ipsa. Rem rerum sunt, unde
          at exercitationem quaerat magni. Deserunt laborum quisquam
          dignissimos.
        </Text>
        <Pressable
          className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2"
          onPress={() => router.push("https://google.com")}
        >
          <Text className="text-sm text-white text-center" style={Inter}>
            Unduh
          </Text>
        </Pressable>
        <View className="h-96" />
      </ScrollView>
    </SafeAreaView>
  );
}
