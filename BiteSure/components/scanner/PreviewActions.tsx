import { View, Text } from "react-native";

import Button from "@/components/common/Button";

import { useTheme } from "@/hooks/useTheme";

interface PreviewActionsProps {
    onRetake: () => void;
    onAnalyze: () => void;
}

export default function PreviewActions({
    onRetake,
    onAnalyze,
}: PreviewActionsProps) {
    const { colors, spacing, typography } = useTheme();

    return (
        <View
            style={{
                marginTop: spacing.xl,
            }}
        >
            <Text
                style={{
                    textAlign: "center",
                    color: colors.textSecondary,
                    marginBottom: spacing.lg,
                    fontSize: typography.size.body
                }}
            >
                Review the captured image before analysis
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    gap: spacing.md,
                }}
            >
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Button
                        variant="secondary"
                        title="Retake"
                        onPress={onRetake}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Button
                        title="Analyze"
                        onPress={onAnalyze}
                    />
                </View>
            </View>

        </View>
    );
}