export interface Payload {
  userId: number;
  name: string;
  email: string;
  phone: string;
  iat: number;
  exp: number;
}

export const initPayload: Payload = {
  userId: 0,
  name: "Loading...",
  email: "Loading...",
  phone: "Loading...",
  iat: 0,
  exp: 0,
};
