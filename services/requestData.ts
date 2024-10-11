import axiosInstance from "@/config/axiosInstance";
import { RequestData } from "@/models/RequestData";
import { Response } from "@/models/Response";
import * as ImagePicker from "expo-image-picker";

interface RequestDataResponse {
  data: RequestData[];
}

export const getAllReqData = async (): Promise<RequestDataResponse> => {
  try {
    const { data } = await axiosInstance.get("/request-data");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getReqDataById = async (id: number): Promise<RequestData> => {
  try {
    const { data } = await axiosInstance.get(`/request-data/${id}`);
    return data.data;
  } catch (error) {
    throw error;
  }
};

export interface FormRequestDataUser {
  subject: string;
  body: string;
  instances: string;
  profession: string;
}

export const initFormRequestDataUser: FormRequestDataUser = {
  subject: "",
  body: "",
  instances: "",
  profession: "",
};

export const createReqDataUser = async (
  form: FormRequestDataUser,
  image: ImagePicker.ImagePickerAsset
): Promise<Response> => {
  try {
    const formData = new FormData();
    formData.append("subject", form.subject);
    formData.append("body", form.body);
    formData.append("instances", form.instances);
    formData.append("profession", form.profession);
    formData.append("image", {
      uri: image.uri,
      type: "image/jpeg",
      name: "requestDataAttachment.jpg",
    } as any);
    const { data } = await axiosInstance.post("/request-data", formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    return data;
  } catch (error) {
    throw error;
  }
};
