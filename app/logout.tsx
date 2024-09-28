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
        text1: "Logout Success",
        text2: "You have been successfully logged out.",
      });
      router.replace({ pathname: "/" });
    }, 1000);
  }, []);
  return <SpinnerLoading />;
};

export default LogoutScreen;
