import { C } from "@/constants/Colors";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRef, useState, useEffect } from "react";
import { FormAnimal } from "@/services/animal";
import * as Location from "expo-location";
import MapView, { Region } from "react-native-maps";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

interface MapModalProps {
  isMapOpen: boolean;
  setIsMapOpen: (value: boolean) => void;
  form: FormAnimal;
  setForm: (value: FormAnimal) => void;
}

export default function MapModal({
  isMapOpen,
  setIsMapOpen,
  form,
  setForm,
}: MapModalProps) {
  const [mapRegion, setMapRegion] = useState<Region>({
    latitude: form.latitude ? parseFloat(form.latitude) : -7.782741082121513,
    longitude: form.longitude ? parseFloat(form.longitude) : 110.3670542376976,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const mapRef = useRef<MapView>(null);

  // Function to check location permissions
  const checkLocationPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Izin Diperlukan",
        text2: "Aplikasi memerlukan izin akses lokasi untuk membuka peta",
      });
      setIsMapOpen(false);
      return false;
    }
    return true;
  };

  // Function to handle map open with permission check
  const handleOpenMap = async () => {
    const hasPermission = await checkLocationPermissions();
    if (hasPermission) {
      setIsMapOpen(true);
    }
  };

  useEffect(() => {
    handleOpenMap();
  }, []);

  // Function to handle selecting location
  const handleSelectLocation = async () => {
    if (mapRef.current) {
      mapRef.current.getCamera().then(async (camera) => {
        try {
          const { center } = camera;
          const reversed = await Location.reverseGeocodeAsync({
            latitude: center.latitude,
            longitude: center.longitude,
          });
          setForm({
            ...form,
            latitude: center.latitude.toString(),
            longitude: center.longitude.toString(),
            city: reversed[0].city || "",
          });
          Toast.show({
            type: "success",
            text1: "Sukses",
            text2: "Berhasil Mengambil Lokasi",
          });
        } catch (error) {
          Toast.show({
            type: "error",
            text1: "Gagal",
            text2: "Terjadi Kesalahan Saat Mengambil Lokasi",
          });
        } finally {
          setIsMapOpen(false);
        }
      });
    }
  };

  // Handle map error
  const handleMapError = (error: any) => {
    console.error("Map error:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Terjadi kesalahan saat memuat peta",
    });
  };

  return (
    <Modal
      visible={isMapOpen}
      onRequestClose={() => setIsMapOpen(false)}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => setIsMapOpen(false)}>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
          <Text style={styles.headerText}>Pilih Titik Lokasi</Text>
          <AntDesign name="close" size={24} color="transparent" />
        </View>

        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          initialRegion={mapRegion}
          onMapReady={() => console.log("Map is ready")}
          onRegionChangeComplete={(region) => setMapRegion(region)}
        />

        <View style={styles.markerFixed}>
          <Entypo name="location-pin" size={48} color={"red"} />
        </View>

        <Pressable style={styles.selectButton} onPress={handleSelectLocation}>
          <Text style={styles.selectButtonText}>Pilih</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    zIndex: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  markerFixed: {
    position: "absolute",
    top: height / 2 - 24,
    left: width / 2 - 24,
    zIndex: 10,
  },
  selectButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: C[1],
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  selectButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
