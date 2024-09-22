import { BASE_URL, GEOCODING_API_KEY } from "@/constants/reverseGeocoding";
import { ReverseGeocodingResponse } from "@/models/ReverseGeocodingResponse";
import axios from "axios";

export const reverseGeocoding = async (
  lat: string,
  lon: string
): Promise<ReverseGeocodingResponse | Error> => {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: { apiKey: GEOCODING_API_KEY, lat, lon },
    });

    return data;
  } catch (error) {
    return new Error("Gagal mengambil lokasi");
  }
};
