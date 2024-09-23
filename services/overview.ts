import { Response } from "@/models/Response";
import axiosInstance from "@/config/axiosInstance";
import { Overview } from "@/models/Overview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOTAL_ANIMAL, TOTAL_WEEKLY } from "@/constants/asyncStorage";

interface ResposneOverview extends Response {
  data: Overview;
}
export const getOverview = async (): Promise<ResposneOverview> => {
  try {
    const { data } = await axiosInstance.get<ResposneOverview>("/overview");
    await AsyncStorage.setItem(TOTAL_ANIMAL, data.data.totalAnimal.toString());
    await AsyncStorage.setItem(TOTAL_WEEKLY, data.data.totalWeekly.toString());
    return data;
  } catch (error) {
    throw error;
  }
};

export const refreshOverview = async (): Promise<ResposneOverview> => {
  try {
    const { data } = await axiosInstance.post<ResposneOverview>("/overview");
    await AsyncStorage.setItem(TOTAL_ANIMAL, data.data.totalAnimal.toString());
    await AsyncStorage.setItem(TOTAL_WEEKLY, data.data.totalWeekly.toString());
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSavedOverview = async (): Promise<Overview> => {
  return {
    totalAnimal: Number(await AsyncStorage.getItem(TOTAL_ANIMAL)),
    totalWeekly: Number(await AsyncStorage.getItem(TOTAL_WEEKLY)),
  };
};
