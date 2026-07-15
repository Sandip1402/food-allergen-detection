import { View, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export default function Header() {
  const hour = new Date().getHours();
  const { colors } = useTheme();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <View className="px-6 pt-6">
      <Text style={{ color: colors.text }} className="text-base">
        {greeting} 👋
      </Text>

      <Text style={{ color: colors.text }} className="text-3xl font-bold mt-1">
        Stay Safe
      </Text>

      <Text style={{ color: colors.text }} className="mt-2">
        Scan ingredients before you eat.
      </Text>
    </View>
  );
}