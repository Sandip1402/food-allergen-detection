import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";

interface TopBarProps {
    title: string;
    onBack?: () => void;
    right?: React.ReactNode;
}

const ICON_SIZE = 22;
const BUTTON_SIZE = 40;

export default function TopBar({
    title,
    onBack,
    right,
}: TopBarProps) {
    const { colors, spacing, typography } = useTheme();
    const handleBack = () => {
        if (onBack) return onBack();
        if (router.canGoBack()) router.back();
    };

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",

                paddingHorizontal: spacing.xl,
                paddingVertical: spacing.lg,
            }}
        >
            <Pressable
                onPress={handleBack}
                style={({ pressed }) => [
                    {
                        width: BUTTON_SIZE,
                        height: BUTTON_SIZE,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                    pressed && { opacity: 0.7 },
                ]}
            >
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={ICON_SIZE}
                    color={colors.text}
                />
            </Pressable>

            <Text
                style={{
                    flex: 1,
                    textAlign: "center",

                    color: colors.text,
                    fontSize: typography.size.title,
                    fontWeight: typography.weight.bold,
                }}
                numberOfLines={1}
            >
                {title}
            </Text>

            <View
                style={{
                    width: BUTTON_SIZE,
                    height: BUTTON_SIZE,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {right}
            </View>
        </View>
    );
}