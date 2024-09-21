import SpinnerLoading from "@/components/SpinnerLoading";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function IndexScreen() {
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <SpinnerLoading />;
  }
  return null
}
