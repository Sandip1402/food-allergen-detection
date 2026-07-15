import { View, Text } from "react-native";
import {
    ShieldCheck,
    TriangleAlert,
    CircleAlert,
} from "lucide-react-native";

import { useTheme } from "@/hooks/useTheme";

interface RiskCardProps {
    allergenCount: number;
}

export default function RiskCard({
    allergenCount,
}: RiskCardProps) {
    const { colors, spacing, typography, radius } = useTheme();

    const risk =
        allergenCount === 0
            ? "safe"
            : allergenCount <= 2
                ? "warning"
                : "danger";

    const config = {
        safe: {
            title: "SAFE",
            subtitle: "No allergens detected.",
            background: colors.status.safe.background,
            text: colors.status.safe.text,
            Icon: ShieldCheck,
        },

        warning: {
            title: "CAUTION",
            subtitle: `${allergenCount} potential allergen${allergenCount > 1 ? "s" : ""
                } detected.`,
            background: colors.status.warning.background,
            text: colors.status.warning.text,
            Icon: TriangleAlert,
        },

        danger: {
            title: "DANGER",
            subtitle: `${allergenCount} allergens detected.`,
            background: colors.status.danger.background,
            text: colors.status.danger.text,
            Icon: CircleAlert,
        },
    };

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
                color={current.text}
            />

            <Text
                style={{
                    marginTop: spacing.md,
                    color: current.text,
                    fontSize: typography.size.heading,
                    fontWeight: typography.weight.bold,
                }}
            >
                {current.title}
            </Text>

            <Text
                style={{
                    marginTop: spacing.sm,
                    color: current.text,
                    fontSize: typography.size.body,
                    textAlign: "center",
                }}
            >
                {current.subtitle}
            </Text>
        </View>
    );
}