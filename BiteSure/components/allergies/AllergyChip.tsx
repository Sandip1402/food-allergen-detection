import { Pressable, Text } from "react-native";
import { Check } from "lucide-react-native";

import { useTheme } from "@/hooks/useTheme";

interface AllergyChipProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}

export default function AllergyChip({
    label,
    selected,
    onPress,
}: AllergyChipProps) {
    const { colors, spacing, radius, typography } = useTheme();

    return (
        <Pressable
            onPress={onPress}
            style={{
                flexDirection: "row",
                alignItems: "center",

                paddingHorizontal: spacing.md,
                paddingVertical: spacing.sm,

                borderRadius: radius.full,

                backgroundColor: selected
                    ? colors.primary
                    : colors.surface,

                borderWidth: 1,

                borderColor: selected
                    ? colors.primary
                    : colors.border,
            }}
        >
            {selected && (
                <Check
                    size={16}
                    color={colors.buttonPrimaryText}
                />
            )}

            <Text
                style={{
                    marginLeft: selected ? spacing.xs : 0,
                    color: selected
                        ? colors.buttonPrimaryText
                        : colors.text,
                    fontSize: typography.size.caption,
                    fontWeight: typography.weight.medium,
                }}
            >
                {label}
            </Text>
        </Pressable>
    );
}