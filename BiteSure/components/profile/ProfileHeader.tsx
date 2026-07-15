import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";


interface Props {
  name: string;
}

export default function ProfileHeader({ name }: Props) {
  
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const { colors, radius, typography, spacing } = useTheme();
    
  return (
    <View className="items-center mt-6">

      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: radius.full,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: typography.size.heading,
            fontWeight: typography.weight.bold,
          }}
        >
          {initials}
        </Text>
      </View>

      <Text
        style={{
          marginTop: spacing.lg,
          color: colors.text,
          fontSize: typography.size.heading,
          fontWeight: typography.weight.bold,
        }}
      >
        {name}
      </Text>

      <Text
        style={{
          marginTop: 4,
          color: colors.textSecondary,
        }}
      >
        Allergy Profile
      </Text>

    </View>
  );
}