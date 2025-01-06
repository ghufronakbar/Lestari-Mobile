import SpinnerLoading from "@/components/ui/SpinnerLoading";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const LogoutScreen = () => {
  useNavigation().setOptions({
    headerShown: false,
  });
  useEffect(() => {
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Berhasil Logout",
        text2: "Silahkan Login Kembali",
      });
      router.replace({ pathname: "/" });
    }, 1000);
  }, []);
  return <SpinnerLoading />;
};

export default LogoutScreen;
