import { OutfitBold, OutfitMedium, OutfitRegular } from "@/constants/Fonts";
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
  Platform,
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
      transparent={true}
      presentationStyle="pageSheet"
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS === "android" ? 25 : 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
            backgroundColor: "white",
          }}
        >
          <Pressable onPress={onClose}>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
          <Text style={{ ...OutfitBold, fontSize: 18 }}>{TNC.title}</Text>
          <AntDesign name="close" size={24} color="transparent" />
        </View>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        >
          {TNC.sections.map((section, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              <Text style={{ ...OutfitBold, fontSize: 16 }}>
                {section.title}
              </Text>
              {section.content.map((content, idx) => (
                <View key={idx}>
                  <Text style={{ ...OutfitMedium, fontSize: 14 }}>
                    {content.sub_title}
                  </Text>
                  <Text
                    style={{ ...OutfitRegular, fontSize: 14, marginBottom: 8 }}
                  >
                    {content.text}
                  </Text>
                </View>
              ))}
            </View>
          ))}
          <Text style={{ ...OutfitRegular, fontSize: 12 }}>
            Terakhir diperbarui pada: {formatDate(TNC.last_updated)}
          </Text>
          <View style={{ marginTop: 16, alignItems: "center" }}>
            <Text style={{ ...OutfitRegular, textAlign: "center" }}>
              {TNC.acceptance}
            </Text>
            <Pressable
              onPress={onConfirm}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#007BFF",
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginTop: 16,
              }}
            >
              <AntDesign name="check" size={16} color="white" />
              <Text style={{ ...OutfitRegular, color: "white", marginLeft: 8 }}>
                Setuju
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default TermsConditions;
