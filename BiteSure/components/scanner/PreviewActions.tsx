import { View, Text } from "react-native";
import { RotateCw, ScanSearch } from "lucide-react-native";

import Button from "@/components/common/Button";
import { useTheme } from "@/hooks/useTheme";

interface PreviewActionsProps {
    isAnalyzing: boolean;
    onRetake: () => void;
    onAnalyze: () => void;
}

export default function PreviewActions({
    isAnalyzing,
    onRetake,
    onAnalyze,
}: PreviewActionsProps) {
    const { colors, spacing, typography } = useTheme();

    return (
        <View
            style={{
                marginTop: spacing.xl,
                paddingHorizontal: spacing.sm,
            }}
        >
            <Text
                style={{
                    textAlign: "center",
                    color: colors.text,
                    fontSize: typography.size.heading,
                    fontWeight: typography.weight.bold,
                }}
            >
                Preview
            </Text>

            <Text
                style={{
                    textAlign: "center",
                    color: colors.textSecondary,
                    marginTop: spacing.sm,
                    marginBottom: spacing.xl,
                    fontSize: typography.size.body,
                    lineHeight: 22,
                }}
            >
                Review the captured image before analysis.
            </Text>


            <View
                style={{
                    flexDirection: "row",
                    gap: spacing.md,
                    alignItems: "center",
                }}
            >
                <View style={{ flex: 1 }}>
                    <Button
                        title="Retake"
                        variant="secondary"
                        leftIcon={<RotateCw size={18} color={colors.primary} />}
                        onPress={onRetake}
                        disabled={isAnalyzing}
                    />
                </View>

                <View style={{ flex: 1.6 }}>
                    <Button
                        title={isAnalyzing ? "Analyzing..." : "Analyze"}
                        leftIcon={<ScanSearch size={18} color={colors.buttonPrimaryText} />}
                        onPress={onAnalyze}
                        loading={isAnalyzing}
                        disabled={isAnalyzing}
                    />
                </View>
            </View>
        </View>
    );
}