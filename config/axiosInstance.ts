import { SERVER_URL } from "@/constants";
import { ACCESS_TOKEN } from "@/constants/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const axiosInstance = setupCache(
  axios.create({
    baseURL: `${SERVER_URL}/api/user`,
    // baseURL: "http://192.168.100.24:5000/api/user",
  }),
  // {
  //   ttl: 1000 * 60 * 5,
  //   interpretHeader: false,
  // }
);

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to retrieve token", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
