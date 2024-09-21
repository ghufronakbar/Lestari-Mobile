import { C } from "@/constants/Colors";
import { Inter } from "@/constants/Fonts";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export const ListContainer = ({ children }: { children?: React.ReactNode }) => {
  return <View className="flex flex-col justify-between">{children}</View>;
};

export const ListItem = () => {
  return (
    <Link href={'/request-data/1'}>
      <View className="w-full border border-neutral-200 rounded-lg h-28 bg-white shadow-sm flex flex-row justify-between items-center px-4 mb-1">
        <View className="flex flex-col max-w-[80%]">
          <Text
            className="text-lg text-neutral-950 font-bold"
            numberOfLines={1}
            style={Inter}
          >
            Subjek
          </Text>
          <Text
            className="text-sm text-neutral-600 font-medium"
            numberOfLines={2}
            style={Inter}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius
            perspiciatis
          </Text>
          <Text
            className="text-xs text-neutral-600 font-medium mt-2"
            numberOfLines={1}
            style={Inter}
          >
            Selasa, 19 Agustus 2022
          </Text>
        </View>
        <View className="flex flex-col items-center justify-center w-[20%] space-y-1">
          <AntDesign name="checkcircle" size={24} color={C.success} />
          <Text className="text-xs text-neutral-600 font-medium" style={Inter}>
            Disetujui
          </Text>
        </View>
      </View>
    </Link>
  );
};

// PENDING
{
  /* <View className="w-full border border-neutral-200 rounded-lg h-28 bg-white shadow-sm flex flex-row justify-between items-center px-4">
<View className="flex flex-col max-w-[80%]">
  <Text
    className="text-lg text-neutral-950 font-bold"
    numberOfLines={1}
    style={Inter}
  >
    Subjek
  </Text>
  <Text
    className="text-sm text-neutral-600 font-medium"
    numberOfLines={2}
    style={Inter}
  >
    Lorem ipsum dolor
  </Text>
  <Text
    className="text-xs text-neutral-600 font-medium mt-2"
    numberOfLines={1}
    style={Inter}
  >
    Selasa, 19 Agustus 2022
  </Text>
</View>
<View className="flex flex-col items-center justify-center w-[20%] space-y-1">
  <AntDesign name="clockcircle" size={24} color={C.info} />
  <Text
    className="text-xs text-neutral-600 font-medium"
    style={Inter}
  >
    Tertunda
  </Text>
</View>
</View> */
}

// REJECTED
{
  /* <View className="w-full border border-neutral-200 rounded-lg h-28 bg-white shadow-sm flex flex-row justify-between items-center px-4">
              <View className="flex flex-col max-w-[80%]">
                <Text
                  className="text-lg text-neutral-950 font-bold"
                  numberOfLines={1}
                  style={Inter}
                >
                  Subjek
                </Text>
                <Text
                  className="text-sm text-neutral-600 font-medium"
                  numberOfLines={2}
                  style={Inter}
                >
                  Lorem ipsum dolor
                </Text>
                <Text
                  className="text-xs text-neutral-600 font-medium mt-2"
                  numberOfLines={1}
                  style={Inter}
                >
                  Selasa, 19 Agustus 2022
                </Text>
              </View>
              <View className="flex flex-col items-center justify-center w-[20%] space-y-1">
                <AntDesign name="closecircle" size={24} color={C.error} />
                <Text
                  className="text-xs text-neutral-600 font-medium"
                  style={Inter}
                >
                  Ditolak
                </Text>
              </View>
            </View> */
}
