import { useTheme } from "@/hooks/useTheme";
import { ReactNode } from "react";
import { Text, View } from "react-native";

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

export default function SettingsSection({
  title,
  children,
}: SettingsSectionProps) {
    
  const { colors, typography, spacing } = useTheme();

  return (
    <View
      style={{
        marginTop: spacing["2xl"],
      }}
    >
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: typography.size.caption,
          fontWeight: typography.weight.semibold,
          marginHorizontal: spacing["2xl"],
          marginBottom: spacing.md,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {title}
      </Text>

      {children}
    </View>
  );
}