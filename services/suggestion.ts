import { Suggestion } from "@/models/Suggestion";
import { Response } from "@/models/Response";
import axiosCache from "@/config/axiosCache";

interface ResposneSuggesstion extends Response {
  data: Suggestion[];
}
export const getSuggestions = async (
  search: string
): Promise<ResposneSuggesstion> => {
  try {
    const { data } = await axiosCache.get("/suggestion", {
      params: {
        search,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
