import SpinnerLoading from "@/components/ui/SpinnerLoading";
import { router } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

const LogoutScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Logout Success",
        text2: "You have been successfully logged out.",
      });
      router.replace({ pathname: "/" });
    }, 1000);
  }, []);
  return <SpinnerLoading />;
};

export default LogoutScreen;
