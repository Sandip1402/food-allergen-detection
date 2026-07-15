import { View, Text } from "react-native";

import Screen from "@/components/common/Screen";
import TopBar from "@/components/scanner/TopBar";
import Card from "@/components/common/Card";

import AllergyChip from "@/components/allergies/AllergyChip";

import { useTheme } from "@/hooks/useTheme";
import { ALLERGENS } from "@/constants/Allergens";
import { useAllergyStore } from "@/store/allergyStore";

export default function AllergiesScreen() {
    const { spacing, typography, colors } = useTheme();

    const {
        selectedAllergies,
        toggleAllergy,
    } = useAllergyStore();

    return (
        <Screen scroll>
            <TopBar title="Manage Allergies" />

            <Card
                style={{
                    marginHorizontal: spacing.lg,
                    marginTop: spacing.lg,
                }}
            >
                <Text
                    style={{
                        fontSize: typography.size.heading,
                        fontWeight: typography.weight.bold,
                        color: colors.text,
                    }}
                >
                    Your Allergies
                </Text>

                <Text
                    style={{
                        color: colors.textSecondary,
                        marginTop: spacing.sm,
                        marginBottom: spacing.lg,
                    }}
                >
                    Select the allergens you want the app to warn you about.
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: spacing.sm,
                    }}
                >
                    {ALLERGENS.map((item) => (
                        <AllergyChip
                            key={item}
                            label={item}
                            selected={selectedAllergies.includes(item)}
                            onPress={() => toggleAllergy(item)}
                        />
                    ))}
                </View>
            </Card>
        </Screen>
    );
}