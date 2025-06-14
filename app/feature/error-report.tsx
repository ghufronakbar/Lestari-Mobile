import {
  Image,
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  ActivityIndicator,
  Platform,
} from "react-native";
import { OutfitRegular } from "@/constants/Fonts";
import { Feather, Ionicons } from "@expo/vector-icons";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { router, useNavigation } from "expo-router";
import { initErrorReport, sendErrorReport } from "@/services/errorReport";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { ResponseFail } from "@/models/Response";
import { ErrorReportForm } from "@/models/ErrorReport";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ErrorReportScreen() {
  const [form, setForm] = useState<ErrorReportForm>(initErrorReport);
  const [isPending, setIsPending] = useState(false);

  const handleSendReport = async () => {
    if (form.body === "" || form.subject === "") {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Form Tidak Boleh Kosong",
      });
      return;
    }
    Toast.show({
      type: "info",
      text1: "Loading...",
      text2: "Harap Tunggu Sebentar...",
    });
    setIsPending(true);
    try {
      await sendErrorReport(form);
      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Berhasil Mengirim Laporan Error",
      });
      setForm(initErrorReport);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Terjadi Kesalahan Saat Mengirim Laporan",
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView className=" flex flex-col h-screen">
        <ScrollView className="px-4  space-y-4">
          <View className="flex flex-col">
            <CustomInputText
              label="Masalah Aplikasi"
              placeholder="Masukkan Masalah Aplikasi"
              value={form.subject}
              onChangeText={(value) => setForm({ ...form, subject: value })}
            />
            <CustomInputText
              label="Detail Masalah"
              placeholder="Masukkan Detail Masalah"
              value={form.body}
              onChangeText={(value) => setForm({ ...form, body: value })}
              multiline
            />
            <Pressable
              className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2 mt-2"
              onPress={
                isPending
                  ? () => {
                      Toast.show({
                        type: "info",
                        text1: "Loading...",
                        text2: "Harap Tunggu Sebentar...",
                      });
                    }
                  : handleSendReport
              }
            >
              {isPending ? (
                <ActivityIndicator size={"small"} color={"white"} />
              ) : (
                <Text
                  className="text-sm text-white text-center"
                  style={OutfitRegular}
                >
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
