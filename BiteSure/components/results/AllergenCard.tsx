import { View, Text } from "react-native";
import { CircleAlert } from "lucide-react-native";

import Card from "@/components/common/Card";
import { useTheme } from "@/hooks/useTheme";
import { ScanResult } from "@/context/allergenStore";
import { ScanResult } from "@/context/allergenStore";

interface Allergen {
    id: string;
    name: string;
    severity: string;
    description: string;
}

interface AllergenCardProps {
    productName: ScanResult["productName"];
    productName: ScanResult["productName"];
    allergens: Allergen[];
    
}

export default function AllergenCard({
    productName,
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
                Detected Allergens - {productName}
                Detected Allergens - {productName}
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
                            key={allergen.id}
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
                                {allergen.name}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </Card>
    );
}