import { Text, type TextProps, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const theme = useColorScheme() ?? "light";
  const color = theme === "dark" ? darkColor : lightColor;

  const colors = Colors[theme];

  return (
    <Text
      style={[
        { color: color || colors.text },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 21,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 27,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
    color: "#0A84FF",
  },
});
