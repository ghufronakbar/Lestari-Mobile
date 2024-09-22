import { Animal } from "./Animal";
import { RequestData } from "./RequestData";

export interface User {
  userId: number;
  email: string;
  name: string;
  phone: string;
  password: string;
  picture: string | null;
  refreshToken?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  animals: Animal[];
  requestDatas: RequestData[];
  _count: {
    animals: number;
    requestDatas: number;
  };
}

export const initUser: User = {
  userId: 0,
  email: "Loading...",
  name: "Loading...",
  phone: "Loading...",
  password: "Loading...",
  picture: null,
  isActive: false,
  createdAt: "2022-04-01T00:00:00.000Z",
  updatedAt: "2022-04-01T00:00:00.000Z",
  animals: [],
  requestDatas: [],
  _count: {
    animals: 0,
    requestDatas: 0,
  },
};
