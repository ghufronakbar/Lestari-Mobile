import { Inter } from "@/constants/Fonts";
import { AntDesign } from "@expo/vector-icons";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

interface TermsConditionsProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const TermsConditions = ({
  visible,
  onClose,
  onConfirm,
}: TermsConditionsProps) => {
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
          <Text className="font-bold text-lg">Syarat dan Ketentuan</Text>
          <AntDesign name="close" size={24} color="transparent" />
        </View>
        <ScrollView className="flex-1 px-4">
          <Text
            className="text-justify text-base text-neutral-950"
            style={Inter}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga est
            doloribus ab reiciendis accusantium vero, modi expedita voluptatum
            libero, illum et aliquid amet ipsa delectus sequi. Debitis rerum
            nesciunt dolores, recusandae fugit iste aliquid aspernatur
            reiciendis nulla! Perspiciatis eaque voluptatem rerum totam, tempore
            temporibus repellat quidem architecto consectetur accusantium labore
            magni, ipsum eligendi delectus omnis sunt incidunt iure dolorem
            fugit blanditiis repudiandae, nisi consequuntur quaerat? Temporibus
            nulla totam aliquam tempore maiores molestias quas, eligendi a quam
            unde minus, voluptatum neque quos sint, autem alias deleniti
            blanditiis in suscipit molestiae eius. Eum nostrum eos obcaecati
            iure commodi assumenda voluptatem eius aliquam! Lorem ipsum dolor
            sit amet consectetur, adipisicing elit. Fuga est doloribus ab
            reiciendis accusantium vero, modi expedita voluptatum libero, illum
            et aliquid amet ipsa delectus sequi. Debitis rerum nesciunt dolores,
            recusandae fugit iste aliquid aspernatur reiciendis nulla!
            Perspiciatis eaque voluptatem rerum totam, tempore temporibus
            repellat quidem architecto consectetur accusantium labore magni,
            ipsum eligendi delectus omnis sunt incidunt iure dolorem fugit
            blanditiis repudiandae, nisi consequuntur quaerat? Temporibus nulla
            totam aliquam tempore maiores molestias quas, eligendi a quam unde
            minus, voluptatum neque quos sint, autem alias deleniti blanditiis
            in suscipit molestiae eius. Eum nostrum eos obcaecati iure commodi
            assumenda voluptatem eius aliquam! Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Fuga est doloribus ab reiciendis
            accusantium vero, modi expedita voluptatum libero, illum et aliquid
            amet ipsa delectus sequi. Debitis rerum nesciunt dolores, recusandae
            fugit iste aliquid aspernatur reiciendis nulla! Perspiciatis eaque
            voluptatem rerum totam, tempore temporibus repellat quidem
            architecto consectetur accusantium labore magni, ipsum eligendi
            delectus omnis sunt incidunt iure dolorem fugit blanditiis
            repudiandae, nisi consequuntur quaerat? Temporibus nulla totam
            aliquam tempore maiores molestias quas, eligendi a quam unde minus,
            voluptatum neque quos sint, autem alias deleniti blanditiis in
            suscipit molestiae eius. Eum nostrum eos obcaecati iure commodi
            assumenda voluptatem eius aliquam! Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Fuga est doloribus ab reiciendis
            accusantium vero, modi expedita voluptatum libero, illum et aliquid
            amet ipsa delectus sequi. Debitis rerum nesciunt dolores, recusandae
            fugit iste aliquid aspernatur reiciendis nulla! Perspiciatis eaque
            voluptatem rerum totam, tempore temporibus repellat quidem
            architecto consectetur accusantium labore magni, ipsum eligendi
            delectus omnis sunt incidunt iure dolorem fugit blanditiis
            repudiandae, nisi consequuntur quaerat? Temporibus nulla totam
            aliquam tempore maiores molestias quas, eligendi a quam unde minus,
            voluptatum neque quos sint, autem alias deleniti blanditiis in
            suscipit molestiae eius. Eum nostrum eos obcaecati iure commodi
            assumenda voluptatem eius aliquam!
          </Text>
          <View className="flex flex-row flex-wrap items-center justify-center space-x-2 mt-8">
            <Text className="text-base font-medium text-center">
              Saya menyutujui syarat dan ketentuan yang berlaku
            </Text>
            <Pressable
              className="flex flex-row items-center space-x-2 rounded-full bg-custom-1 px-4 py-2 mt-8"
              onPress={onConfirm}
            >
              <AntDesign name="check" size={16} color="white" />
              <Text className="text-base text-white" style={Inter}>
                Setuju
              </Text>
            </Pressable>
          </View>
          <View className="h-40" />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default TermsConditions;
