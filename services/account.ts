import axiosInstance from "@/config/axiosInstance";
import { Response } from "@/models/Response";
import {
  ACCESS_TOKEN,
  EMAIL,
  NAME,
  PHONE,
  PICTURE,
  REFRESH_TOKEN,
} from "@/constants/asyncStorage";
import { User } from "@/models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

interface ProfileResponse extends Response {
  data: User;
}

export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const { data } = await axiosInstance.get<ProfileResponse>(
      "/account/profile"
    );
    await AsyncStorage.setItem(PICTURE, data.data.picture || "");
    await AsyncStorage.setItem(PHONE, data.data.phone);
    await AsyncStorage.setItem(EMAIL, data.data.email);
    await AsyncStorage.setItem(NAME, data.data.name);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSavedProfile = async () => {
  try {
    const [picture, phone, email, name, accessToken, refreshToken] =
      await Promise.all([
        AsyncStorage.getItem(PICTURE),
        AsyncStorage.getItem(PHONE),
        AsyncStorage.getItem(EMAIL),
        AsyncStorage.getItem(NAME),
        AsyncStorage.getItem(ACCESS_TOKEN),
        AsyncStorage.getItem(REFRESH_TOKEN),
      ]);
    return { picture, phone, email, name, accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

export interface FormChangePassword {
  newPassword: string;
  oldPassword: string;
  confirmPassword: string;
}

export const initFormChangePassword: FormChangePassword = {
  newPassword: "",
  oldPassword: "",
  confirmPassword: "",
};

export const changePassword = async (
  form: FormChangePassword
): Promise<Response> => {
  try {
    const { data } = await axiosInstance.put<Response>("/account/password", {
      newPassword: form.newPassword,
      oldPassword: form.oldPassword,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export interface FormChangePhone {
  phone: string;
  password: string;
}

export const initFormChangePhone: FormChangePhone = {
  phone: "",
  password: "",
};

export const changePhone = async (form: FormChangePhone): Promise<Response> => {
  try {
    const { data } = await axiosInstance.put<Response>("/account/phone", {
      phone: form.phone,
      password: form.password,
    });
    await AsyncStorage.setItem(PHONE, form.phone);
    return data;
  } catch (error) {
    throw error;
  }
};

export const changePicture = async (
  image: ImagePicker.ImagePickerAsset
): Promise<ProfileResponse> => {
  try {
    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      type: "image/jpeg",
      name: "profile.jpg",
    } as any);
    const { data } = await axiosInstance.put<ProfileResponse>(
      "/account/picture",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
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
    await AsyncStorage.setItem(PICTURE, "");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getLinkForgotPass = async (email: string): Promise<Response> => {
  try {
    const { data } = await axiosInstance.post(`/account/reset-password`, {
      email,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
