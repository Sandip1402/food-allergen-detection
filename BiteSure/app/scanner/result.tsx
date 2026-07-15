import { useLocalSearchParams } from "expo-router";
import Screen from "@/components/common/Screen";
import TopBar from "@/components/scanner/TopBar";

import RiskCard from "@/components/results/RiskCard";
import AllergenCard from "@/components/results/AllergenCard";
import RecommendationCard from "@/components/results/RecommendationCard";
import ConfidenceCard from "@/components/results/ConfidenceCard";
import ResultActions from "@/components/results/ResultActions";

export default function ResultScreen() {

    const { result } = useLocalSearchParams<{
        result?: string;
    }>();

    const parsedResult = result ? JSON.parse(result) : null;

    const allergens = parsedResult?.allergens ?? [];

    return (
        <Screen scroll>
            <TopBar title="Analysis Result" />

            <RiskCard allergenCount={allergens.length} />

            <AllergenCard allergens={allergens} />

            <RecommendationCard allergens={allergens} />

            <ConfidenceCard />

            <ResultActions />
        </Screen>
    );
}