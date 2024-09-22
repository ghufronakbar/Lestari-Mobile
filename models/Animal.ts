import { initUser, User } from "./User";

export interface Animal {
  animalId: number;
  localName: string;
  latinName: string;
  habitat: string;
  description: string;
  city: string;
  longitude: string;
  latitude: string;
  amount: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  image: string;
  urlGoogleMap: string;
  user: User;
}

export const initAnimal: Animal = {
  animalId: 0,
  localName: "Loading...",
  latinName: "Loading...",
  habitat: "Loading...",
  description: "Loading...",
  city: "Loading...",
  longitude: "200,0",
  latitude: "200,0",
  amount: 0,
  userId: 0,
  createdAt: "2022-04-01T00:00:00.000Z",
  updatedAt: "2022-04-01T00:00:00.000Z",
  image: "/",
  urlGoogleMap: "https://www.google.com/maps",
  user: initUser,
};
