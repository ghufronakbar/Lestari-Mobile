import { initUser, User } from "./User";
import { SendData } from "./SendData";

export interface RequestData {
  requestDataId: number;
  name: string;
  email: string;
  profession: string;
  instances: string;
  subject: string;
  body: string;
  isPending: boolean;
  isApproved: boolean;
  userId: number;
  attachment: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  sendDatas: SendData[];
}

export const initRequestData: RequestData = {
  requestDataId: 0,
  name: "Loading...",
  email: "Loading...",
  profession: "Loading...",
  instances: "Loading...",
  subject: "Loading...",
  body: "Loading...",
  isPending: true,
  isApproved: false,
  userId: 0,
  attachment: "/",
  createdAt: "2022-01-01T00:00:00.000Z",
  updatedAt: "2022-01-01T00:00:00.000Z",
  user: initUser,
  sendDatas: [],
};
