import { Text } from "react-native";
import Card from "@/components/common/Card";
import { useTheme } from "@/hooks/useTheme";

interface Props {
    matches: string[];
}

export default function AllergyMatchCard({
    matches,
}: Props) {

    const { colors, typography } = useTheme();

    return (
        <Card>

            <Text
                style={{
                    color: colors.danger,
                    fontSize: typography.size.heading,
                    fontWeight: typography.weight.bold
                }}
            >
                ⚠ Matches Your Allergies
            </Text>


            <Text
                style={{
                    marginTop: 8,
                    color: colors.text
                }}
            >
                {matches.join(", ")}
            </Text>

        </Card>
    )

}