import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Inter } from "@/constants/Fonts";
import { Feather, Ionicons } from "@expo/vector-icons";
import { CustomInputText } from "@/components/ui/CustomInputText";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  deleteAnimal,
  editAnimal,
  editAnimalImage,
  FormAnimal,
  getAnimalById,
  initFormAnimal,
} from "@/services/animal";
import SpinnerLoading from "@/components/ui/SpinnerLoading";
import Toast from "react-native-toast-message";
import { ResponseFail } from "@/models/Response";
import ModalActionImage from "@/components/ui/ModalActionImage";
import { ImageResult } from "expo-image-manipulator";
import compressImage from "@/utils/compressImage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapModal from "@/components/ui/MapModal";
import ModalConfirmation from "@/components/ui/ModalConfirmation";
import { getSuggestions } from "@/services/suggestion";
import useDebounce from "@/utils/useDebounce";
import { Suggestion } from "@/models/Suggestion";

export default function EditAnimalScreen() {
  const [form, setForm] = useState<FormAnimal>(initFormAnimal);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);
  const [image, setImage] = useState<string>("");
  const { id } = useLocalSearchParams() as { id: string };
  const [isPickImage, setIsPickImage] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState<boolean>(false);

  const fetchSuggestions = async (text: string) => {
    const response = await getSuggestions(text);
    setSuggestions(response.data);
  };

  useDebounce(
    () => {
      if (form.localName.length <= 2 && form.latinName.length <= 2) {
        setIsSuggestionOpen(false);
        return;
      }
      if (form.localName.length >= 2) {
        fetchSuggestions(form.localName);
        setIsSuggestionOpen(true);
      }
      if (form.latinName.length >= 2) {
        fetchSuggestions(form.latinName);
        setIsSuggestionOpen(true);
      }
    },
    500,
    [form.localName, form.latinName]
  );

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

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setIsPickImage(false);
  };

  const fetchData = async () => {
    try {
      const response = await getAnimalById(Number(id));
      setForm(response);
      setImage(response.image);
      setLoading(false);
    } catch (error) {
      router.back();
    }
  };
  useNavigation().setOptions({
    headerShown: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <SpinnerLoading />;
  }

  const handleAnimal = async () => {
    if (
      form.latinName === "" ||
      form.localName === "" ||
      form.habitat === "" ||
      form.description === "" ||
      form.amount === 0 ||
      form.city === "" ||
      form.latitude === "" ||
      form.longitude === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Form tidak boleh ada yang kosong",
      });
      return;
    }
    setLoading(true);
    try {
      await editAnimal(Number(id), form);
      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Berhasil Mengedit Satwa",
      });
      if (selectedImage) {
        await editAnimalImage(Number(id), selectedImage);
      }
      setLoading(false);
      router.back();
    } catch (error) {
      setLoading(false);
      const err = error as ResponseFail;
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: err?.response?.data?.message || "Terjadi kesalahan",
      });
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    setIsPending(true);
    try {
      const currentLocation = await Location.getCurrentPositionAsync({});
      const reversed = await Location.reverseGeocodeAsync(
        currentLocation.coords
      );
      setForm({
        ...form,
        latitude: currentLocation.coords.latitude.toString(),
        longitude: currentLocation.coords.longitude.toString(),
        city: reversed[0].city || "",
      });
      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Berhasil Mengambil Lokasi Saat Ini",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Terjadi Kesalahan Saat Mengambil Lokasi",
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

  const handleDelete = async () => {
    toastPending();
    setLoading(true);
    try {
      await deleteAnimal(Number(id));
      Toast.show({
        type: "success",
        text1: "Sukses",
        text2: "Berhasil Menghapus Satwa",
      });
      router.push({ pathname: "/(home)/history" });
    } catch (error) {
      const err = error as ResponseFail;
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: err?.response?.data?.message || "Terjadi kesalahan",
      });
    }
  };

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? 36 : 0 }}>
      <ModalActionImage
        isVisible={isPickImage}
        message="Pilih Aksi Untuk Melanjutkan"
        title="Ganti Gambar"
        onCamera={handlePickCamera}
        onGallery={handlePickGallery}
        onClose={() => {
          setIsPickImage(false);
        }}
        onDelete={selectedImage ? handleDeleteImage : undefined}
      />
      <KeyboardAvoidingView className="px-4 flex flex-col h-screen">
        <View className="flex flex-row items-center space-x-2">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
          <Text className="text-4xl text-neutral-950 font-bold" style={Inter}>
            Edit Satwa
          </Text>
        </View>
        <ScrollView className="mt-8 space-y-4">
          <View className="w-full h-40 rounded-lg border-2 border-neutral-300 overflow-hidden shadow-sm">
            <Image
              source={
                selectedImage ? { uri: selectedImage?.uri } : { uri: image }
              }
              className="w-full h-full object-cover"
            />
          </View>
          <Pressable
            className="w-[40%] bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2 self-end"
            onPress={() => setIsPickImage(true)}
          >
            <Text className="text-sm text-white text-center" style={Inter}>
              {selectedImage ? "Ubah" : "Unggah"} Gambar
            </Text>
          </Pressable>
          <View className="flex flex-col">
            <CustomInputText
              label="Nama Lokal"
              placeholder="Masukkan Nama Lokal"
              onChangeText={(value) => setForm({ ...form, localName: value })}
              value={form.localName}
            />
            <CustomInputText
              label="Nama Latin"
              placeholder="Masukkan Nama Latin"
              onChangeText={(value) => setForm({ ...form, latinName: value })}
              value={form.latinName}
            />
            {isSuggestionOpen && suggestions.length > 0 && (
              <View className="border border-neutral-300 rounded-lg bg-white">
                {suggestions.map((item) => (
                  <TouchableOpacity
                    key={item.suggestionId}
                    onPress={() => {
                      setForm({
                        ...form,
                        latinName: item.latinName,
                        localName: item.localName,
                      });
                      setIsSuggestionOpen(false);
                    }}
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: "#ddd",
                    }}
                  >
                    <View className="flex flex-col space-y-1">
                      <Text
                        className="text-black font-semibold text-base"
                        style={Inter}
                      >
                        {item.localName}
                      </Text>
                      <Text className="text-neutral-600 text-sm" style={Inter}>
                        {item.latinName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <CustomInputText
              label="Jumlah Ditemukan"
              placeholder="Masukkan Jumlah Ditemukan"
              onChangeText={(value) =>
                setForm({ ...form, amount: Number(value) })
              }
              value={form.amount.toString()}
              keyboardType="number-pad"
            />
            <CustomInputText
              label="Habitat"
              placeholder="Masukkan Habitat Ditemukan"
              onChangeText={(value) => setForm({ ...form, habitat: value })}
              value={form.habitat}
            />
            <View className="flex flex-col space-y-2 mb-4">
              <Text className="text-black text-lg font-medium" style={Inter}>
                Lokasi
              </Text>

              <TextInput
                className="w-full bg-white border border-neutral-200 rounded-l-lg px-4 py-2 h-12"
                placeholder={"Masukkan Kota Ditemukan"}
                style={Inter}
                placeholderTextColor={"#a3a3a3"}
                onChangeText={(value) => setForm({ ...form, city: value })}
                value={form.city}
              />
              <View className="w-full flex flex-row justify-between mb-2 items-center">
                <TextInput
                  className="w-[49%] bg-white border border-neutral-200 rounded-lg px-4 py-2 h-12"
                  placeholder={"Latitude"}
                  style={Inter}
                  keyboardType="numbers-and-punctuation"
                  placeholderTextColor={"#a3a3a3"}
                  onChangeText={(value) =>
                    setForm({ ...form, latitude: value })
                  }
                  value={form.latitude}
                />
                <TextInput
                  className="w-[49%] bg-white border border-neutral-200 rounded-lg px-4 py-2 h-12"
                  placeholder={"Longitude"}
                  style={Inter}
                  keyboardType="numbers-and-punctuation"
                  placeholderTextColor={"#a3a3a3"}
                  onChangeText={(value) =>
                    setForm({ ...form, longitude: value })
                  }
                  value={form.longitude}
                />
              </View>
              <View className="flex flex-row justify-between items-center my-2">
                <View className="h-px w-[30%] bg-neutral-200" />
                <Text style={Inter}>Atau Gunakan</Text>
                <View className="h-px w-[30%] bg-neutral-200" />
              </View>
              <View className="w-full flex flex-row justify-between mb-4">
                <Pressable
                  className="bg-custom-success w-[48%] px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2"
                  onPress={isPending ? toastPending : getLocation}
                >
                  {isPending ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <>
                      <Feather name="map-pin" color="white" />
                      <Text
                        className="text-sm text-white text-center"
                        style={Inter}
                      >
                        Lokasi Saat Ini
                      </Text>
                    </>
                  )}
                </Pressable>
                <Pressable
                  className="bg-custom-info w-[48%] px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2"
                  onPress={isPending ? toastPending : () => setIsMapOpen(true)}
                >
                  <Feather name="map" color="white" />
                  <Text
                    className="text-sm text-white text-center"
                    style={Inter}
                  >
                    Buka Map
                  </Text>
                </Pressable>
              </View>
              <CustomInputText
                label="Deskripsi"
                placeholder="Deskrpisikan Satwa Ditemukan"
                onChangeText={(value) =>
                  setForm({ ...form, description: value })
                }
                value={form.description}
                numberOfLines={10}
                multiline
              />
              <Pressable
                className="bg-custom-1 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2"
                onPress={handleAnimal}
              >
                <Text className="text-sm text-white text-center" style={Inter}>
                  Simpan
                </Text>
              </Pressable>
              <Pressable
                className="bg-red-500 px-2 py-2 rounded-lg flex flex-row items-center justify-center h-10 space-x-2"
                onPress={() => setIsConfirmDelete(true)}
              >
                <Text className="text-sm text-white text-center" style={Inter}>
                  Hapus
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="h-96" />
        </ScrollView>
        <MapModal
          isMapOpen={isMapOpen}
          setIsMapOpen={setIsMapOpen}
          form={form}
          setForm={setForm}
        />
        <ModalConfirmation
          title="Hapus Satwa"
          message="Apakah anda yakin ingin menghapus satwa ini?"
          isVisible={isConfirmDelete}
          onClose={() => setIsConfirmDelete(false)}
          onConfirm={handleDelete}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
