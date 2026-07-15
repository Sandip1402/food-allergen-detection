import { ReactNode } from "react";
import { View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  
  const { colors, radius, spacing, shadows } = useTheme();

  return (
    <View
      className={`rounded-3xl p-5 ${className}`}
      style={{
        backgroundColor: colors.surface,
        borderRadius: radius["2xl"],
        padding: spacing.xl,
        ...shadows.card
      }}
    >
      {children}
    </View>
  );
}