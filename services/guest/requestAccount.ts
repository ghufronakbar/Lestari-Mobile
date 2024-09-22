import axiosInstance from "@/config/axiosInstance";
import { SERVER_URL } from "@/constants";
import { RequestAccount } from "@/models/RequestAccount";
import { Response } from "@/models/Response";
import axios from "axios";

export interface FormReqAccount {
  name: string;
  email: string;
  phone: string;
  profession: string;
  instances: string;
  subject: string;
  body: string;
}

export const initFormReqAccount: FormReqAccount = {
  name: "",
  email: "",
  phone: "",
  profession: "",
  instances: "",
  subject: "",
  body: "",
};

export const createRequestAccount = async (
  form: FormReqAccount
): Promise<Response> => {
  try {
    const { data } = await axios.post<Response>(
      `${SERVER_URL}/api/guest/request-account`,
      form
    );
    return data;
  } catch (error) {
    throw error;
  }
};
