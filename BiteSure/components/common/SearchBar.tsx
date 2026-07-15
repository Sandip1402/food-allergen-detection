import { View, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";


interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
}: Props) {
  
  const { colors, radius } = useTheme();
  
  return (
    <View
      className="mx-6 flex-row items-center rounded-2xl px-4"
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        height: 56,
      }}
    >
      <MaterialCommunityIcons
        name="magnify"
        size={22}
        color={colors.icon}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.icon}
        className="flex-1 ml-3"
        style={{
          color: colors.text,
        }}
      />
    </View>
  );
}