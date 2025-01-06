import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import { OutfitRegular } from "@/constants/Fonts";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { ResponseFail } from "@/models/Response";
import { getLinkForgotPass } from "@/services/account";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleForgot = async () => {
    if (email === "") {
      {
        Toast.show({
          type: "error",
          text1: "Gagal",
          text2: "Isi email terlebih dahulu",
        });
        return;
      }
    }
    try {
      setLoading(true);
      const res = await getLinkForgotPass(email);
      Toast.show({
        type: "success",
        text1: "Berhasil",
        text2:
          res?.message || "Berhasil mengirim link lupa password ke email anda",
      });
      router.back();
    } catch (error) {
      console.log(error);
      const err = error as ResponseFail;
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2:
          err?.response?.data?.message ||
          "Gagal mengirim link lupa password ke email anda",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView className=" flex flex-col h-screen">
        <ScrollView className="mt-8 px-4  space-y-4">
          <View className="flex flex-col">
            <CustomInputText
              label="Email"
              placeholder="Masukkan Email Anda"
              keyboardType="email-address"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
            <Pressable
              className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2"
              onPress={loading ? () => {} : () => handleForgot()}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-sm text-white text-center" style={OutfitRegular}>
                  Kirim
                </Text>
              )}
            </Pressable>
          </View>
          <View className="h-96" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
