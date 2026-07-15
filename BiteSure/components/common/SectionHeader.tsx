import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";


interface Props {
  title: string;
  action?: string;
  onPress?: () => void;
}

export default function SectionHeader({
  title,
  action,
  onPress,
}: Props) {

  const { colors, typography, spacing } = useTheme();

  return (
    <View className="flex-row items-center justify-between px-6 mt-8 mb-4">
      <Text
        style={{
          color: colors.text,
          fontSize: typography.size.heading,
          fontWeight: typography.weight.bold,
          marginTop: spacing["3xl"],
          marginBottom: spacing.lg
        }}
      >
        {title}
      </Text>

      {action && (
        <Pressable onPress={onPress}>
          <Text
            style={{
              color: colors.primary,
              fontWeight: "600",
            }}
          >
            {action}
          </Text>
        </Pressable>
      )}
    </View>
  );
}