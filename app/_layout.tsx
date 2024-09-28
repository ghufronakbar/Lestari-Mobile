import { useFonts } from "expo-font";
import { router, Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);  
  
  return (
    <>
      {/* <View style={{ flex: 1 }}> */}
      {/* <Slot /> */}
      <Stack/>
      <Toast />
    {/* </View> */}
    </>
  );
}
