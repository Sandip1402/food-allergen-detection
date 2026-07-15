import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";


interface Props {
  label: string;
}

export default function AllergyChip({
  label,
}: Props) {
  
  const { colors, radius, spacing, typography } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.primary + "15",
        borderRadius: radius.full,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
      }}
    >
      <Text
        style={{
          color: colors.primary,
          fontWeight: typography.weight.semibold,
        }}
      >
        {label}
      </Text>
    </View>
  );
}