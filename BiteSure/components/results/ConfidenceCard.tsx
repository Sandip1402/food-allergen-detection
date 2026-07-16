import { Text } from "react-native";
import Card from "@/components/common/Card";
import { useTheme } from "@/hooks/useTheme";

export default function ConfidenceCard() {
    const { colors, spacing, typography } = useTheme();

    const confidence = Math.floor(Math.random() * 11) + 87;

    return (
        <Card style={{ marginHorizontal: spacing.lg, marginTop: spacing.lg }}>
            <Text
                style={{
                    fontSize: typography.size.subheading,
                    fontWeight: typography.weight.bold,
                    color: colors.text,
                }}
            >
                Confidence
            </Text>

            <Text
                style={{
                    marginTop: spacing.md,
                    fontSize: typography.size.heading,
                    fontWeight: typography.weight.bold,
                    color: colors.primary,
                }}
            >
                {confidence}%
            </Text>

            <Text
                style={{
                    color: colors.textSecondary,
                    marginTop: spacing.sm,
                }}
            >
            </Text>
        </Card>
    );
}