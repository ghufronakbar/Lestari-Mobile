import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Modal,
  Switch,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import {
  createReqDataUser,
  FormRequestDataUser,
  initFormRequestDataUser,
} from "@/services/requestData";
import { ImageResult } from "expo-image-manipulator";
import compressImage from "@/utils/compressImage";
import * as ImagePicker from "expo-image-picker";
import ModalActionImage from "@/components/ui/ModalActionImage";
import { C } from "@/constants/Colors";
import TermsConditions from "@/components/ui/TermsConditions";
import Toast from "react-native-toast-message";
import { ResponseFail } from "@/models/Response";

export default function AddRequestData() {
  useNavigation().setOptions({
    headerShown: false,
  });
  const [form, setForm] = useState<FormRequestDataUser>(
    initFormRequestDataUser
  );
  const [isPickImage, setIsPickImage] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleCreate = async () => {
    if (!selectedImage) {
      Toast.show({
        type: "error",
        text1: "Tidak ada lampiran",
        text2: "Silahkan pilih lampiran terlebih dahulu",
      });
      return;
    }
    if (
      form.body === "" ||
      form.subject === "" ||
      form.instances === "" ||
      form.profession === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Form tidak boleh ada yang kosong",
        text2: "Silahkan lengkapi form terlebih dahulu",
      });
      return;
    }
    if (!isConfirmed) {
      Toast.show({
        type: "error",
        text1: "Syarat dan ketentuan belum diterima",
        text2: "Silahkan setujui syarat dan ketentuan terlebih dahulu",
      });
      return;
    }
    try {
      setIsPending(true);
      await createReqDataUser(form, selectedImage);
      Toast.show({
        type: "success",
        text1: "Berhasil Mengajukan Permintaan",
        text2: "Cek Email secara berkala untuk informasi lebih lanjut",
      });
      setForm(initFormRequestDataUser);
      setSelectedImage(null);
      setIsPickImage(false);
      setIsConfirmOpen(false);
      setIsConfirmed(false);
    } catch (error) {
      const err = error as ResponseFail;
      Toast.show({
        type: "error",
        text1: "Gagal Mengajukan Permintaan",
        text2:
          err?.response?.data?.message ||
          "Terjadi kesalahan saat mengajukan permintaan",
      });
    } finally {
      setIsPending(false);
    }
  };

  const toastPending = () => {
    Toast.show({
      type: "info",
      text1: "Loading...",
      text2: "Harap Tunggu Sebentar...",
    });
  };

  const handlePickGallery = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const compressedImage = await compressImage(result.assets[0].uri);
        setSelectedImage(compressedImage);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPickImage(false);
      }
    }
  };

  const handlePickCamera = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const compressedImage = await compressImage(result.assets[0].uri);
        setSelectedImage(compressedImage);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPickImage(false);
      }
    }
  };

  return (
    <SafeAreaView>
      <ModalActionImage
        title="Unggah Lampiran"
        message="Pilih aksi untuk melanjutkan"
        isVisible={isPickImage}
        onClose={() => setIsPickImage(false)}
        onCamera={handlePickCamera}
        onGallery={handlePickGallery}
      />
      <KeyboardAvoidingView className="px-4 pt-8 flex flex-col h-screen">
        <View className="flex flex-row items-center space-x-2">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
          <Text className="text-4xl text-neutral-950 font-bold" style={Inter}>
            Buat Permintaan
          </Text>
        </View>
        <ScrollView className="mt-8 space-y-4">
          <View className="w-full h-40 rounded-lg border-2 border-neutral-300 overflow-hidden shadow-sm">
            <Image
              source={
                !selectedImage
                  ? require("@/assets/placeholder.jpg")
                  : { uri: selectedImage.uri }
              }
              className="w-full h-full object-cover"
            />
          </View>
          <Pressable
            className="w-[40%] bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2 self-end"
            onPress={() => setIsPickImage(true)}
          >
            <Text className="text-sm text-white text-center" style={Inter}>
              {selectedImage ? "Ubah" : "Unggah"} Lampiran
            </Text>
          </Pressable>
          <View className="flex flex-col">
            <CustomInputText
              label="Profesi"
              placeholder="Masukkan Profesi Anda"
              value={form.profession}
              onChangeText={(value) => setForm({ ...form, profession: value })}
            />
            <CustomInputText
              label="Instansi"
              placeholder="Masukkan Asal Instansi"
              value={form.instances}
              onChangeText={(value) => setForm({ ...form, instances: value })}
            />
            <CustomInputText
              label="Kepentingan"
              placeholder="Tuliskan Kepentingan"
              onChangeText={(value) => setForm({ ...form, subject: value })}
              value={form.subject}
            />
            <CustomInputText
              label="Deskripsi"
              placeholder="Deskrpisikan Kepentingan Anda"
              onChangeText={(value) => setForm({ ...form, body: value })}
              value={form.body}
              numberOfLines={10}
              multiline
            />
            <Pressable
              className=" mb-4 flex flex-row items-center self-center"
              onPress={() => setIsConfirmOpen(true)}
            >
              <Text className="text-sm" style={Inter}>
                Saya menyutujui{" "}
                <Text className="text-custom-1">syarat dan ketentuan</Text> yang
                berlaku
              </Text>
            </Pressable>
            <Pressable
              className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2"
              onPress={isPending ? toastPending : handleCreate}
            >
              {isPending ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-sm text-white text-center" style={Inter}>
                  Kirim
                </Text>
              )}
            </Pressable>
          </View>
          <View className="h-96" />
        </ScrollView>
        <TermsConditions
          visible={isConfirmOpen}
          type="data"
          onClose={() => {
            setIsConfirmOpen(false);
          }}
          onConfirm={() => {
            setIsConfirmed(true);
            setIsConfirmOpen(false);
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
