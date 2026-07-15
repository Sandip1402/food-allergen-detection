import { View, Text } from "react-native";
import { CircleAlert } from "lucide-react-native";

import Card from "@/components/common/Card";
import { useTheme } from "@/hooks/useTheme";

interface AllergenCardProps {
    allergens: string[];
}

export default function AllergenCard({
    allergens,
}: AllergenCardProps) {
    const { colors, spacing, typography, radius } = useTheme();

    return (
        <Card
            style={{
                marginHorizontal: spacing.lg,
                marginTop: spacing.lg,
            }}
        >
            <Text
                style={{
                    fontSize: typography.size.subheading,
                    fontWeight: typography.weight.bold,
                    color: colors.text,
                    marginBottom: spacing.lg,
                }}
            >
                Detected Allergens
            </Text>

            {allergens.length === 0 ? (
                <Text
                    style={{
                        color: colors.textSecondary,
                        fontSize: typography.size.body,
                    }}
                >
                    No allergens detected.
                </Text>
            ) : (
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: spacing.sm,
                    }}
                >
                    {allergens.map((allergen) => (
                        <View
                            key={allergen}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",

                                backgroundColor:
                                    colors.status.danger.background,

                                paddingHorizontal: spacing.md,
                                paddingVertical: spacing.sm,

                                borderRadius: radius.xl,
                            }}
                        >
                            <CircleAlert
                                size={16}
                                color={colors.status.danger.text}
                            />

                            <Text
                                style={{
                                    marginLeft: spacing.xs,
                                    color: colors.status.danger.text,
                                    fontSize: typography.size.caption,
                                    fontWeight: typography.weight.semibold,
                                }}
                            >
                                {allergen}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </Card>
    );
}