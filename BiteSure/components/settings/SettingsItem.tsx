import Card from "@/components/common/Card";
import { useTheme } from "@/hooks/useTheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

interface SettingsItemProps {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    title: string;
    subtitle?: string;
    right?: ReactNode;
    showChevron?: boolean;
    onPress?: () => void;

    variant?: "default" | "success" | "warning" | "danger";
}

export default function SettingsItem({
    icon,
    title,
    subtitle,
    right,
    showChevron = true,
    onPress,
    variant = "default",
}: SettingsItemProps) {

    const { colors, spacing, typography, radius } = useTheme();

    const iconColor = {
        default: colors.primary,
        success: colors.success,
        warning: colors.warning,
        danger: colors.danger,
    }[variant];

    const titleColor = variant === "danger" ? colors.danger : colors.text;

    return (
        <Pressable onPress={onPress}>
            <Card className="mx-6 mb-3">
                <View className="flex-row items-center">

                    {/* Icon */}
                    <View
                        style={{
                            width: 42,
                            height: 42,
                            borderRadius: radius.lg,
                            backgroundColor: colors.surface,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <MaterialCommunityIcons
                            name={icon}
                            size={22}
                            color={iconColor}
                        />
                    </View>

                    {/* Title */}
                    <View
                        style={{
                            flex: 1,
                            marginLeft: spacing.lg,
                        }}
                    >
                        <Text
                            style={{
                                color: titleColor,
                                fontSize: typography.size.body,
                                fontWeight: typography.weight.semibold,
                            }}
                        >
                            {title}
                        </Text>

                        {subtitle && (
                            <Text
                                style={{
                                    color: colors.textSecondary,
                                    fontSize: typography.size.caption,
                                    marginTop: 2,
                                }}
                            >
                                {subtitle}
                            </Text>
                        )}
                    </View>

                    {/* Right */}
                    {right}

                    {showChevron && (
                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={22}
                            color={colors.icon}
                        />
                    )}

                </View>
            </Card>
        </Pressable>
    );
}