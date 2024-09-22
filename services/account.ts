import axiosInstance from "@/config/axiosInstance";
import { Response } from "@/models/Response";
import { PHONE, PICTURE } from "@/constants/asyncStorage";
import { User } from "@/models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProfileResponse extends Response {
  data: User;
}

export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const { data } = await axiosInstance.get<ProfileResponse>(
      "/account/profile"
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (
  newPassword: string,
  oldPassword: string
): Promise<Response> => {
  try {
    const { data } = await axiosInstance.put<Response>("/account/password", {
      newPassword,
      oldPassword,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const changePhone = async (
  phone: string,
  password: string
): Promise<Response> => {
  try {
    const { data } = await axiosInstance.put<Response>("/account/phone", {
      phone,
      password,
    });
    await AsyncStorage.setItem(PHONE, phone);
    return data;
  } catch (error) {
    throw error;
  }
};

export const changePicture = async (image: File): Promise<ProfileResponse> => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axiosInstance.put<ProfileResponse>(
      "/account/picture",
      formData
    );
    await AsyncStorage.setItem(PICTURE, data.data.picture || "");
    return data;
  } catch (error) {
    throw error;
  }
};

export const deletePicture = async (): Promise<Response> => {
  try {
    const { data } = await axiosInstance.delete<Response>("/account/picture");
    await AsyncStorage.removeItem(PICTURE);
    return data;
  } catch (error) {
    throw error;
  }
};
