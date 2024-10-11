import * as ImageManipulator from "expo-image-manipulator";
import { Platform } from "react-native";

const compressImage = async (uri: string) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
  );

  const finalUri = Platform.OS === 'android' ? `file://${manipResult.uri}` : manipResult.uri;

  return {
    ...manipResult,
    uri: finalUri,
  };
};

export default compressImage;
