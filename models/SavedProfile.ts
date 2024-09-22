export interface SavedProfile {
  accessToken: string;
  refreshToken: string;
  name: string;
  email: string;
  phone: string;
  picture: string;
}

export const initSavedProfile: SavedProfile = {
  accessToken: "",
  refreshToken: "",
  name: "",
  email: "",
  phone: "",
  picture: "",
};
