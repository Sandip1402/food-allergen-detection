import { Text } from "react-native";
import Card from "@/components/common/Card";
import { useTheme } from "@/hooks/useTheme";

interface DetectedAllergen {
    id: string;
    name: string;
    severity: string;
    description: string;
}

interface Props {
    allergens: DetectedAllergen[];
}

export default function RecommendationCard({
    allergens,
}: Props) {
    const { colors, spacing, typography } = useTheme();
    
    const allergenNames = allergens.map((a) => a.name);

    const recommendation =
        allergenNames.length === 0
            ? "No known allergens were detected. Consume according to your dietary preferences."
            : `Avoid consuming this product if you are allergic to ${allergenNames.join(", ")}.`;

    return (
        <Card style={{ marginHorizontal: spacing.lg, marginTop: spacing.lg }}>
            <Text
                style={{
                    fontSize: typography.size.subheading,
                    fontWeight: typography.weight.bold,
                    color: colors.text,
                    marginBottom: spacing.md,
                }}
            >
                Recommendation
            </Text>

            <Text
                style={{
                    color: colors.textSecondary,
                    fontSize: typography.size.body,
                    lineHeight: 24,
                }}
            >
                {recommendation}
            </Text>
        </Card>
    );
}