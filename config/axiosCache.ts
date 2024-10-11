import { SERVER_URL } from "@/constants";
import { ACCESS_TOKEN } from "@/constants/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const axiosCache = setupCache(
  axios.create({
    // baseURL: `${SERVER_URL}/api/user`,
    baseURL: `https://api.lestarikehati.com/api/user`,
    // baseURL: "http://192.168.100.24:5000/api/user",
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  }),
  {
    ttl: 1000 * 60 * 20,
    interpretHeader: false,
  }
);

axiosCache.interceptors.request.use(
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

export default axiosCache;
