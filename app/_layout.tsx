import SpinnerLoading from "@/components/ui/SpinnerLoading";
import { refresh } from "@/services/auth";
import { useFonts } from "expo-font";
import { router, Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // useEffect(() => {
  //   const handleAuthCheck = async () => {
  //     try {
  //       await refresh();
  //       router.push("/(home)");
  //     } catch (error) {
  //       Toast.show({
  //         type: "error",
  //         text1: "Sesi Kadaluarsa",
  //         text2: "Silahkan login kembali",
  //       });
  //       router.push("/login");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (loading || !fontsLoaded) {
  //     handleAuthCheck();
  //   }
  // }, [loading]);
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <Toast />
    </View>
  );
}
