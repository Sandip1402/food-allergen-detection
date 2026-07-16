import { View, Text } from "react-native";
import {
    ShieldCheck,
    TriangleAlert,
    CircleAlert,
} from "lucide-react-native";

import { useTheme } from "@/hooks/useTheme";

interface RiskCardProps {
    risk: "safe" | "warning" | "unsafe";
}

export default function RiskCard({
    risk,
}: RiskCardProps) {

    const {
        colors,
        spacing,
        typography,
        radius,
    } = useTheme();

    const config = {
        safe: {
            title: "Safe",
            description: "No allergens were detected.",
            color: colors.success,
            background: `${colors.success}20`,
            Icon: ShieldCheck,
        },

        warning: {
            title: "Warning",
            description: "Potential allergens detected.",
            color: colors.warning,
            background: `${colors.warning}20`,
            Icon: TriangleAlert,
        },

        unsafe: {
            title: "Unsafe",
            description: "High-risk allergens detected.",
            color: colors.danger,
            background: `${colors.danger}20`,
            Icon: CircleAlert,
        },
    } as const;

    const current = config[risk];

    return (
        <View
            style={{
                backgroundColor: current.background,
                borderRadius: radius.xl,
                padding: spacing.xl,
                marginHorizontal: spacing.lg,
                marginTop: spacing.lg,
                alignItems: "center",
            }}
        >
            <current.Icon
                size={48}
                color={current.color}
            />

            <Text
                style={{
                    marginTop: spacing.md,
                    color: current.color,
                    fontSize: typography.size.heading,
                    fontWeight: typography.weight.bold,
                }}
            >
                {current.title}
            </Text>

            <Text
                style={{
                    marginTop: spacing.sm,
                    color: colors.text,
                    fontSize: typography.size.body,
                    textAlign: "center",
                }}
            >
                {current.description}
            </Text>
        </View>
    );
}