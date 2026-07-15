import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  subtitle: string;
}

export default function EmptyState({
  icon,
  title,
  subtitle,
}: Props) {
  return (
    <View className="items-center justify-center py-20 px-8">
      <MaterialCommunityIcons
        name={icon}
        size={70}
        color="#94A3B8"
      />

      <Text className="text-xl font-bold text-slate-700 mt-5">
        {title}
      </Text>

      <Text className="text-slate-500 text-center mt-2 leading-6">
        {subtitle}
      </Text>
    </View>
  );
}