import { Inter } from "@/constants/Fonts";
import { Text, TextInput, View } from "react-native";

export interface CustomInputTextProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "number-pad"
    | "decimal-pad"
    | "url"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "name-phone-pad"
    | "twitter"
    | "web-search"
    | "visible-password";
}

export const CustomInputText: React.FC<CustomInputTextProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
}) => {
  return (
    <View className="flex flex-col space-y-2 mb-4">
      <Text className="text-black text-lg font-medium" style={Inter}>
        {label}
      </Text>
      <TextInput
        className={`w-full bg-white border border-neutral-200 rounded-lg px-4 py-2 ${
          multiline ? "h-40" : "h-12"
        } `}
        placeholder={placeholder}
        style={Inter}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor={"#a3a3a3"}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
