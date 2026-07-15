import { useLocalSearchParams } from "expo-router";

import Screen from "@/components/common/Screen";
import TopBar from "@/components/scanner/TopBar";

import RiskCard from "@/components/results/RiskCard";
import AllergenCard from "@/components/results/AllergenCard";
import RecommendationCard from "@/components/results/RecommendationCard";
import ConfidenceCard from "@/components/results/ConfidenceCard";
import ResultActions from "@/components/results/ResultActions";

import AllergyMatchCard from "@/components/results/AllergyMatchedCard";
import { useAllergyStore } from "@/store/allergyStore";
import { matchUserAllergies } from "@/utils/allergyMatcher";

import Card from "@/components/common/Card";
import { Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";


export default function ResultScreen() {

    const { colors, typography, spacing } = useTheme();

    const { result } = useLocalSearchParams<{
        result?: string;
    }>();


    const parsedResult = result
        ? JSON.parse(result)
        : null;


    const detectedAllergens =
        parsedResult?.allergens ?? [];


    const userAllergies =
        useAllergyStore(
            state => state.selectedAllergies
        );


    const allergyMatch =
        matchUserAllergies(
            detectedAllergens,
            userAllergies
        );


    return (
        <Screen scroll>

            <TopBar title="Analysis Result" />


            <RiskCard
                allergenCount={
                    detectedAllergens.length
                }
            />


            {/* Personalized Allergy Status */}

            {
                userAllergies.length === 0 && (

                    <Card
                        style={{
                            marginTop: spacing.lg,
                        }}
                    >
                        <Text
                            style={{
                                color: colors.text,
                                fontSize:
                                    typography.size.heading,
                                fontWeight:
                                    typography.weight.bold,
                            }}
                        >
                            Personalize Your Results
                        </Text>


                        <Text
                            style={{
                                marginTop: spacing.sm,
                                color:
                                    colors.textSecondary,
                            }}
                        >
                            Add your allergies in Settings
                            to get personalized warnings.
                        </Text>

                    </Card>
                )
            }


            {
                userAllergies.length > 0 &&
                allergyMatch.hasMatch && (

                    <AllergyMatchCard
                        matches={
                            allergyMatch.matches
                        }
                    />

                )
            }


            {
                userAllergies.length > 0 &&
                !allergyMatch.hasMatch && (

                    <Card
                        style={{
                            marginTop: spacing.lg,
                        }}
                    >

                        <Text
                            style={{
                                color:
                                    colors.success,

                                fontSize:
                                    typography.size.heading,

                                fontWeight:
                                    typography.weight.bold,
                            }}
                        >
                            ✓ No Saved Allergies Detected
                        </Text>


                        <Text
                            style={{
                                marginTop: spacing.sm,
                                color:
                                    colors.textSecondary,
                            }}
                        >
                            None of your selected
                            allergies were found.
                        </Text>

                    </Card>

                )
            }



            <AllergenCard
                allergens={
                    detectedAllergens
                }
            />


            <RecommendationCard
                allergens={
                    detectedAllergens
                }
            />


            <ConfidenceCard />


            <ResultActions />

        </Screen>
    );
}