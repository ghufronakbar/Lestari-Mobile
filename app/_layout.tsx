import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack, useNavigation } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { LogBox } from "react-native";
import { C } from "@/constants/Colors";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";

LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Outfit-Thin": require("@/assets/fonts/Outfit-Thin.ttf"),
    "Outfit-ExtraLight": require("@/assets/fonts/Outfit-ExtraLight.ttf"),
    "Outfit-Light": require("@/assets/fonts/Outfit-Light.ttf"),
    "Outfit-Regular": require("@/assets/fonts/Outfit-Regular.ttf"),
    "Outfit-Medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "Outfit-SemiBold": require("@/assets/fonts/Outfit-SemiBold.ttf"),
    "Outfit-Bold": require("@/assets/fonts/Outfit-Bold.ttf"),
    "Outfit-ExtraBold": require("@/assets/fonts/Outfit-ExtraBold.ttf"),
    "Outfit-Black": require("@/assets/fonts/Outfit-Black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="forgot-password"
          options={{
            headerShown: true,
            title: "Reset Kata Sandi",
            headerTintColor: "black",
            headerStyle: { backgroundColor: "white" },
          }}
        />
        <Stack.Screen
          name="feature/change-password"
          options={{
            headerShown: true,
            title: "Ubah Kata Sandi",
            headerTintColor: "black",
            headerStyle: { backgroundColor: "white" },
          }}
        />
        <Stack.Screen
          name="feature/change-phone"
          options={{
            headerShown: true,
            title: "Ubah Nomor Telepon",
            headerTintColor: "black",
            headerStyle: { backgroundColor: "white" },
          }}
        />
        <Stack.Screen
          name="request-data/index"
          options={{
            headerShown: true,
            title: "Permintaan Data",
            headerTintColor: "black",
            headerStyle: { backgroundColor: "white" },
          }}
        />
        <Stack.Screen
          name="request-data/[id]"
          options={{
            headerShown: true,
            title: "Detail Permintaan",
            headerTintColor: "black",
            headerStyle: { backgroundColor: "white" },
          }}
        />
        <Stack.Screen
          name="animal/[id]/edit"
          options={{
            headerShown: true,
            title: "Edit Satwa",
            headerTintColor: "black",
            headerStyle: { backgroundColor: "white" },
          }}
        />
        <Stack.Screen
          name="edit-draft"
          options={{
            headerShown: true,
            title: "Edit Satwa",
            headerTintColor: "black",
            headerStyle: { backgroundColor: "white" },
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: true,
            title: "Pendaftaran Akun",
            headerTintColor: "black",
            headerStyle: { backgroundColor: "white" },
          }}
        />
        <Stack.Screen
          name="request-data/add"
          options={{
            headerShown: true,
            title: "Buat Permintaan Data",
            headerTintColor: "black",
            headerStyle: { backgroundColor: "white" },
          }}
        />
        <Stack.Screen
          name="feature/error-report"
          options={{
            headerShown: true,
            title: "Kirim Laporan",
            headerTintColor: "black",
            headerStyle: { backgroundColor: "white" },
          }}
        />
        <Stack.Screen
          name="animal/[id]/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </View>
  );
}
