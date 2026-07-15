import { Text, Pressable, ViewStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { ButtonVariant } from "@/types/button";

interface ButtonProps {
    title: string;

    onPress: () => void;

    disabled?: boolean;

    loading?: boolean;

    style?: ViewStyle;

    variant?: ButtonVariant;
}

export default function Button({
    title,
    onPress,
    disabled,
    loading,
    style,
    variant = "primary"
}: ButtonProps) {

    const { colors, radius, typography } = useTheme();
    const variants = {
        primary: {
            background: colors.primary,
            text: "#FFFFFF",
            border: colors.primary,
        },

        secondary: {
            background: "transparent",
            text: colors.primary,
            border: colors.primary,
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
        backgroundColor: colors.primary,
        borderRadius: radius.xl,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1
    };


    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                defaultStyle,
                {
                    backgroundColor: button.background,
                    borderColor: button.border,
                },
                pressed && { opacity: 0.85 },
                style,
            ]}
        >
            <Text
                style={{
                    color: button.text,
                    fontWeight: typography.weight.bold,
                    fontSize: typography.size.body,
                }}
            >
                {title}
            </Text>
        </Pressable>
    );
}