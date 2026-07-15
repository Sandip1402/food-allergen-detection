import { View } from "react-native";
import { router } from "expo-router";

import Button from "@/components/common/Button";
import { useTheme } from "@/hooks/useTheme";

export default function ResultActions() {
    const { spacing } = useTheme();

    return (
        <View
            style={{
                marginHorizontal: spacing.lg,
                marginTop: spacing.xl,
                marginBottom: spacing.xl,
                gap: spacing.md,
            }}
        >
            <Button
                title="Scan Again"
                onPress={() => router.replace("/scanner")}
            />

            <Button
                title="Back to Home"
                variant="secondary"
                onPress={() => router.replace("/")}
            />
        </View>
    );
}