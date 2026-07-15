import React, { ReactNode } from "react";
import {
    Text,
    Pressable,
    View,
    ViewStyle,
    ActivityIndicator,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { ButtonVariant } from "@/types/button";

interface ButtonProps {
    title: string;
    onPress: () => void;

    disabled?: boolean;
    loading?: boolean;

    style?: ViewStyle;

    variant?: ButtonVariant;

    leftIcon?: ReactNode;
}

export default function Button({
    title,
    onPress,
    disabled = false,
    loading = false,
    style,
    variant = "primary",
    leftIcon,
}: ButtonProps) {
    const { colors, radius, typography } = useTheme();

    const variants = {
        primary: {
            background: colors.primary,
            text: "#FFFFFF",
            border: colors.primary,
        },

        secondary: {
            background: colors.surface,
            text: colors.primary,
            border: colors.border,
        },

        danger: {
            background: colors.danger,
            text: "#FFFFFF",
            border: colors.danger,
        },

        ghost: {
            background: "transparent",
            text: colors.text,
            border: "transparent",
        },
    };

    const button = variants[variant];

    const defaultStyle: ViewStyle = {
        backgroundColor: button.background,
        borderColor: button.border,

        borderRadius: radius.xl,
        borderWidth: 1,

        height: 56,

        justifyContent: "center",
        alignItems: "center",

        paddingHorizontal: 20,

        ...(variant === "primary"
            ? {
                  elevation: 3,
                  shadowColor: "#000",
                  shadowOffset: {
                      width: 0,
                      height: 2,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
              }
            : {}),
    };

    return (
        <Pressable
            disabled={disabled || loading}
            onPress={onPress}
            style={({ pressed }) => [
                defaultStyle,
                pressed && {
                    opacity: 0.9,
                    transform: [{ scale: 0.98 }],
                },
                (disabled || loading) && {
                    opacity: 0.6,
                },
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={button.text} />
            ) : (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                    }}
                >
                    {leftIcon}

                    <Text
                        style={{
                            color: button.text,
                            fontWeight: typography.weight.bold,
                            fontSize: typography.size.body,
                        }}
                    >
                        {title}
                    </Text>
                </View>
            )}
        </Pressable>
    );
}