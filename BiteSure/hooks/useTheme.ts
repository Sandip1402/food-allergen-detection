import { Colors } from "@/constants/Colors";
import { Radius } from "@/constants/Radius";
import { Shadows } from "@/constants/Shadows";
import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { useColorScheme } from "react-native";

export function useTheme() {
  const scheme = useColorScheme() ?? "light";

  return {
    isDark: scheme === "dark",

    colors: Colors[scheme],

    spacing: Spacing,
    radius: Radius,
    typography: Typography,
    shadows: Shadows,
  };
}