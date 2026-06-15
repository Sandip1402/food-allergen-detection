import React, { ComponentProps } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  icon?: ComponentProps<typeof MaterialCommunityIcons>['name'];
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  size?: "small" | "medium" | "large";
}

export function ThemedButton({
  label,
  onPress,
  variant = "primary",
  icon,
  loading = false,
  disabled = false,
  style,
  size = "medium",
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const variantColors = {
    primary: colors.tint,
    secondary: colors.tabIconDefault,
    danger: colors.danger,
  };

  const sizeStyles = {
    small: { paddingVertical: 8, paddingHorizontal: 12 },
    medium: { paddingVertical: 12, paddingHorizontal: 16 },
    large: { paddingVertical: 16, paddingHorizontal: 24 },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? colors.tabIconDefault : variantColors[variant],
          opacity: disabled ? 0.5 : 1,
        },
        sizeStyles[size],
        style,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color="white" size={20} />
        ) : (
          <>
            {icon && <MaterialCommunityIcons name={icon || "circle"} size={20} color="white" />}
            <ThemedText
              style={{
                color: "white",
                marginLeft: icon ? 8 : 0,
                fontSize: size === "small" ? 12 : size === "large" ? 16 : 14,
              }}
            >
              {label}
            </ThemedText>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
