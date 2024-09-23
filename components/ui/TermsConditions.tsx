import { Inter } from "@/constants/Fonts";
import {
  TERMS_CONDITIONS_REQUEST_ACCOUNT,
  TERMS_CONDITIONS_REQUEST_DATA,
} from "@/data/termsCondition";
import formatDate from "@/utils/formatDate";
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
  type: "data" | "account";
}

const TermsConditions = ({
  visible,
  onClose,
  onConfirm,
  type,
}: TermsConditionsProps) => {
  const TNC =
    type === "data"
      ? TERMS_CONDITIONS_REQUEST_DATA
      : TERMS_CONDITIONS_REQUEST_ACCOUNT;
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
          <Text className="font-bold text-lg">{TNC.title}</Text>
          <AntDesign name="close" size={24} color="transparent" />
        </View>
        <ScrollView className="flex-1 px-4 space-y-4">
          {TNC.sections.map((section, index) => (
            <View key={index} className="space-y-2">
              <Text
                className="text-base font-bold text-neutral-950"
                style={Inter}
              >
                {section.title}
              </Text>
              <Text
                className="text-start text-base text-neutral-950"
                style={Inter}
              >
                <View className="space-y-2">
                  {section.content.map((content, index) => (
                    <View key={index}>
                      <Text
                        className="text-start text-base font-medium text-neutral-950"
                        style={Inter}
                      >
                        {content.sub_title}
                      </Text>
                      <Text
                        className="text-start text-base text-neutral-950"
                        style={Inter}
                      >
                        {content.text}
                      </Text>
                    </View>
                  ))}
                </View>
              </Text>
            </View>
          ))}

          <Text className="text-start text-neutral-950 text-sm" style={Inter}>
            Terakhir diperbarui pada: {formatDate(TNC.last_updated)}
          </Text>
          <View className="flex flex-row flex-wrap items-center justify-center space-x-2 mt-8">
            <Text className="text-base font-medium text-center">
              {TNC.acceptance}
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
