import axiosInstance from "@/config/axiosInstance";
import {
  ACCESS_TOKEN,
  EMAIL,
  NAME,
  PHONE,
  PICTURE,
  REFRESH_TOKEN,
} from "@/constants/asyncStorage";
import { Response } from "@/models/Response";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface LoginResponse extends Response {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface FormLogin {
  email: string;
  password: string;
}

export const initFormLogin: FormLogin = {
  email: "",
  password: "",
};

export const login = async ({
  email,
  password,
}: FormLogin): Promise<LoginResponse | null> => {
  try {
    const { data } = await axiosInstance.post<LoginResponse>("/account/login", {
      email,
      password,
    });

    if (data.data?.accessToken && data.data?.refreshToken) {
      await AsyncStorage.setItem(ACCESS_TOKEN, data.data.accessToken);
      await AsyncStorage.setItem(REFRESH_TOKEN, data.data.refreshToken);
      return data;
    } else {
      throw new Error("Invalid response structure: Tokens not found");
    }
  } catch (error: any) {
    if (error.response) {
      console.error("Login error response:", error.response.data);
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      console.error("Login request error:", error.request);
      throw new Error("Network error, please try again");
    } else {
      console.error("Login unknown error:", error.message);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const refresh = async (): Promise<LoginResponse | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const { data } = await axiosInstance.post<LoginResponse>(
      "/account/refresh",
      {
        refreshToken,
      }
    );

    if (data.data?.accessToken && data.data?.refreshToken) {
      await AsyncStorage.setItem(ACCESS_TOKEN, data.data.accessToken);
      await AsyncStorage.setItem(REFRESH_TOKEN, data.data.refreshToken);
      return data;
    } else {
      throw new Error("Invalid response structure: Tokens not found");
    }
  } catch (error: any) {
    await AsyncStorage.clear();
    if (error.response) {
      console.error("Refresh error response:", error.response.data);
      throw new Error(error.response.data.message || "Failed to refresh token");
    } else if (error.request) {
      console.error("Refresh request error:", error.request);
      throw new Error("Network error, please try again");
    } else {
      console.error("Refresh unknown error:", error.message);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const logout = async () => {
  await AsyncStorage.clear();
};
