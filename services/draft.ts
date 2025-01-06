import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAnimal, FormAnimal } from "./animal";
import * as ImagePicker from "expo-image-picker";

const _ANIMAL_DRAFT_KEY = "animalDrafts";

export interface AnimalDraft extends FormAnimal {
  key: string;
  createdAt: string;
  image: ImagePicker.ImagePickerAsset | null;
}

export const initAnimalDraft: AnimalDraft = {
  key: "",
  createdAt: "",
  localName: "",
  latinName: "",
  habitat: "",
  description: "",
  city: "",
  longitude: "0",
  latitude: "0",
  amount: 0,
  image: null,
};

const _generateRandomKey = () => {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomString}`;
};

export const saveToDraft = async (
  animal: FormAnimal,
  image: ImagePicker.ImagePickerAsset
): Promise<void> => {
  const data: AnimalDraft = {
    ...animal,
    key: _generateRandomKey(),
    createdAt: new Date().toISOString(),
    image,
  };
  const draft = await AsyncStorage.getItem(_ANIMAL_DRAFT_KEY);
  if (!draft) {
    await AsyncStorage.setItem(_ANIMAL_DRAFT_KEY, JSON.stringify([data]));
  } else {
    const parsedDraft = JSON.parse(draft);
    await AsyncStorage.setItem(
      _ANIMAL_DRAFT_KEY,
      JSON.stringify([...parsedDraft, data])
    );
  }
};

export const editDraft = async (
  animal: AnimalDraft,
  image: ImagePicker.ImagePickerAsset | null
): Promise<void> => {
  const drafts = await getDrafts();
  const index = drafts.findIndex(
    (item: AnimalDraft) => item.key === animal.key
  );
  if (index === -1) return;
  const img = image || drafts[index].image;
  if (!img) return;
  drafts[index] = { ...animal, image: img };
  await AsyncStorage.setItem(_ANIMAL_DRAFT_KEY, JSON.stringify(drafts));
};

export const removeFromDraft = async (key: string): Promise<void> => {
  const draft = await AsyncStorage.getItem(_ANIMAL_DRAFT_KEY);
  if (!draft) return;
  const parsedDraft = JSON.parse(draft);
  const filteredDraft = parsedDraft.filter(
    (item: AnimalDraft) => item.key !== key
  );
  await AsyncStorage.setItem(_ANIMAL_DRAFT_KEY, JSON.stringify(filteredDraft));
};

export const getDrafts = async (): Promise<AnimalDraft[]> => {
  const draft = await AsyncStorage.getItem(_ANIMAL_DRAFT_KEY);
  if (!draft) return [];
  const parsedDraft = JSON.parse(draft) as AnimalDraft[];
  parsedDraft.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return parsedDraft;
};

export const getDraftByKey = async (
  key: string
): Promise<AnimalDraft | undefined> => {
  const drafts = await getDrafts();
  return drafts.find((item: AnimalDraft) => item.key === key);
};

export const uploadDrafts = async (key: string): Promise<void> => {
  const drafts = await getDrafts();
  const draft = drafts.find((item: AnimalDraft) => item.key === key);
  if (!draft) return;
  try {
    const image = draft.image;
    if (!image) return;
    await createAnimal(draft, image);
    removeFromDraft(key);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
