import { Pressable, Text, View } from "react-native";
import { Check } from "lucide-react-native";

import Screen from "@/components/common/Screen";
import TopBar from "@/components/scanner/TopBar";
import Card from "@/components/common/Card";

import { useTheme } from "@/hooks/useTheme";
import {
    ThemeMode,
    useThemeStore,
} from "@/store/themeStore";

const OPTIONS: {
    label: string;
    value: ThemeMode;
}[] = [
    {
        label: "System (Recommended)",
        value: "system",
    },
    {
        label: "Light",
        value: "light",
    },
    {
        label: "Dark",
        value: "dark",
    },
];

export default function AppearanceScreen() {
    const {
        colors,
        spacing,
        typography,
        radius,
    } = useTheme();

    const {
        themeMode,
        setThemeMode,
    } = useThemeStore();

    return (
        <Screen>
            <TopBar title="Appearance" />

            <Card
                style={{
                    marginHorizontal: spacing.lg,
                    marginTop: spacing.lg,
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontSize: typography.size.heading,
                        fontWeight: typography.weight.bold,
                        marginBottom: spacing.sm,
                    }}
                >
                    Theme
                </Text>

                <Text
                    style={{
                        color: colors.textSecondary,
                        fontSize: typography.size.body,
                        marginBottom: spacing.lg,
                    }}
                >
                    Choose how the app should look.
                </Text>

                {OPTIONS.map((option) => {
                    const selected =
                        themeMode === option.value;

                    return (
                        <Pressable
                            key={option.value}
                            onPress={() =>
                                setThemeMode(option.value)
                            }
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",

                                paddingVertical:
                                    spacing.md,

                                paddingHorizontal:
                                    spacing.md,

                                borderRadius:
                                    radius.xl,

                                marginBottom:
                                    spacing.sm,

                                backgroundColor:
                                    selected
                                        ? colors.primary
                                        : colors.surface,
                            }}
                        >
                            <Text
                                style={{
                                    color: selected
                                        ? colors.buttonPrimaryText
                                        : colors.text,

                                    fontSize:
                                        typography.size.body,

                                    fontWeight:
                                        typography.weight.medium,
                                }}
                            >
                                {option.label}
                            </Text>

                            {selected && (
                                <Check
                                    size={20}
                                    color={
                                        colors.buttonPrimaryText
                                    }
                                />
                            )}
                        </Pressable>
                    );
                })}
            </Card>
        </Screen>
    );
}