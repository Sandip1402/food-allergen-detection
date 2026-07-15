import { ReactNode } from "react";
import {
    View,
    ViewStyle,
    StyleProp,
} from "react-native";

import { useTheme } from "@/hooks/useTheme";

interface CardProps {
    children: ReactNode;
    className?: string;
    style?: StyleProp<ViewStyle>;
}

export default function Card({
    children,
    className = "",
    style,
}: CardProps) {
    const {
        colors,
        radius,
        spacing,
        shadows,
    } = useTheme();

    return (
        <View
            className={className}
            style={[
                {
                    backgroundColor: colors.card,
                    borderRadius: radius["2xl"],
                    padding: spacing.xl,
                    overflow: "hidden",
                    ...shadows.card,
                },
                style,
            ]}
        >
            {children}
        </View>
    );
}