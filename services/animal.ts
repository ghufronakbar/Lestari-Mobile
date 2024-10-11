import axiosInstance from "@/config/axiosInstance";
import { Animal } from "@/models/Animal";
import { Limitation } from "@/models/Limitation";
import { Response } from "@/models/Response";
import * as ImagePicker from "expo-image-picker";

interface AnimalResponse extends Response {
  limitation: Limitation;
  data: Animal[];
}

type Query = "editable";

export const getAllAnimals = async (
  search: string,
  limit: number,
  query?: Query
): Promise<AnimalResponse> => {
  try {
    const { data } = await axiosInstance.get<AnimalResponse>(`/animal`, {
      params: {
        search,
        limit,
        query,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAnimalById = async (id: number): Promise<Animal> => {
  try {
    const { data } = await axiosInstance.get(`/animal/${id}`);
    return data.data;
  } catch (error) {
    throw error;
  }
};

export interface FormAnimal {
  localName: string;
  latinName: string;
  habitat: string;
  description: string;
  city: string;
  longitude: string;
  latitude: string;
  amount: number;
}

export const initFormAnimal: FormAnimal = {
  localName: "",
  latinName: "",
  habitat: "",
  description: "",
  city: "",
  longitude: "",
  latitude: "",
  amount: 0,
};

export const createAnimal = async (
  form: FormAnimal,
  image: ImagePicker.ImagePickerAsset
): Promise<Response> => {
  const formData = new FormData();
  formData.append("image", {
    uri: image.uri,
    type: "image/jpeg",
    name: "animal.jpg",
  } as any);
  formData.append("localName", form.localName);
  formData.append("latinName", form.latinName);
  formData.append("habitat", form.habitat);
  formData.append("description", form.description);
  formData.append("city", form.city);
  formData.append("longitude", form.longitude);
  formData.append("latitude", form.latitude);
  formData.append("amount", form.amount.toString());
  try {
    const { data } = await axiosInstance.post<Response>("/animal", formData,
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

export const editAnimal = async (
  id: number,
  form: FormAnimal
): Promise<Response> => {
  try {
    const { data } = await axiosInstance.put<Response>(`/animal/${id}`, form);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editAnimalImage = async (
  id: number,
  image: ImagePicker.ImagePickerAsset
): Promise<Response> => {
  const formData = new FormData();
  formData.append("image", {
    uri: image.uri,
    type: "image/jpeg",
    name: "animal.jpg",
  } as any);
  try {
    const { data } = await axiosInstance.patch<Response>(
      `/animal/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteAnimal = async (id: number): Promise<Response> => {
  try {
    const { data } = await axiosInstance.delete<Response>(`/animal/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
