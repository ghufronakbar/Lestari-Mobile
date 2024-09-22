import { initRequestData, RequestData } from "./RequestData";

export interface SendData {
  sendDataId: number;
  localName: boolean;
  latinName: boolean;
  habitat: boolean;
  description: boolean;
  city: boolean;
  longitude: boolean;
  latitude: boolean;
  image: boolean;
  amount: boolean;
  dateStart: string;
  dateEnd: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  requestDataId: number;
  requestData: RequestData;
}

export const initSendData: SendData = {
  sendDataId: 0,
  localName: false,
  latinName: false,
  habitat: false,
  description: false,
  city: false,
  longitude: false,
  latitude: false,
  image: false,
  amount: false,
  dateStart: "2021-01-01T00:00:00.000Z",
  dateEnd: "2021-01-01T00:00:00.000Z",
  url: "/",
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
  requestDataId: 0,
  requestData: initRequestData,
};
