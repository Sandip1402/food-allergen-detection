import { Colors } from "@/constants/Colors";
import { Radius } from "@/constants/Radius";
import { Shadows } from "@/constants/Shadows";
import { Spacing } from "@/constants/Spacing";
import { Typography } from "@/constants/Typography";
import { useAppTheme } from "@/providers/ThemeProvider";

export function useTheme() {
  const { theme } = useAppTheme();

  return {
    isDark: theme === "dark",

    colors: Colors[theme],

    spacing: Spacing,
    radius: Radius,
    typography: Typography,
    shadows: Shadows,
  };
}