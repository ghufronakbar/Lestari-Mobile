import { OutfitBold } from "@/constants/Fonts";
import { AntDesign } from "@expo/vector-icons";
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";

interface ModalShowImageProps {
  visible: boolean;
  onClose: () => void;
  url: ImageSourcePropType;
  title: string;
}
const ModalShowImage = ({
  visible,
  onClose,
  url,
  title,
}: ModalShowImageProps) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View className="flex flex-row items-center justify-between p-4 bg-white z-10">
          <Pressable onPress={onClose}>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
          <Text className="text-lg" style={OutfitBold}>
            {title}
          </Text>
          <AntDesign name="close" size={24} color="transparent" />
        </View>
        <View className="flex-1 justify-center items-center">
          <Image
            source={url}
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalShowImage;
