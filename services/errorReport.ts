import { ErrorReportForm } from "@/models/ErrorReport";
import axiosInstance from "@/config/axiosInstance";
import { Response } from "@/models/Response";

export const sendErrorReport = async (
  form: ErrorReportForm
): Promise<Response> => {
  try {
    const { data } = await axiosInstance.post<Response>("/error-report", form);
    return data;
  } catch (error) {
    throw error;
  }
};

export const initErrorReport: ErrorReportForm = {
    subject: "",
    body: "",
  };
  