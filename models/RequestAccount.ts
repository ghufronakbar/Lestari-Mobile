export interface RequestAccount {
  requestAccountId: number;
  name: string;
  email: string;
  phone: string;
  profession: string;
  instances: string;
  subject: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  isApproved: boolean;
  isPending: boolean;
}

export const initRequestAccount: RequestAccount = {
  requestAccountId: 0,
  name: "Loading...",
  email: "Loading...",
  phone: "Loading...",
  profession: "Loading...",
  instances: "Loading...",
  subject: "Loading...",
  body: "Loading...",
  createdAt: "2022-01-01T00:00:00.000Z",
  updatedAt: "2022-01-01T00:00:00.000Z",
  isApproved: false,
  isPending: true,
};
