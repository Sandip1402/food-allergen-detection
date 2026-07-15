import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Card from "../common/Card";

import { useTheme } from "@/hooks/useTheme";

interface Props {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  onPress: () => void;
}

export default function ProfileMenuItem({
  icon,
  title,
  onPress,
}: Props) {

  const { colors, typography, spacing } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <Card className="mx-6 mb-4">

        <View className="flex-row items-center justify-between">

          <View className="flex-row items-center">

            <MaterialCommunityIcons
              name={icon}
              size={24}
              color={colors.primary}
            />

            <Text
              style={{
                marginLeft: spacing.lg,
                color: colors.text,
                fontSize: typography.size.body,
                fontWeight: typography.weight.medium,
              }}
            >
              {title}
            </Text>

          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={colors.textSecondary}
          />

        </View>

      </Card>
    </Pressable>
  );
}