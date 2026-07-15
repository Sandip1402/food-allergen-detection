import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

interface GalleryButtonProps {
  onPress: () => void;
}

const SIZE = 52;

export default function GalleryButton({
  onPress,
}: GalleryButtonProps) {
  const { colors, radius, shadows } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: SIZE,
          height: SIZE,
          borderRadius: radius.full,

          justifyContent: "center",
          alignItems: "center",

          backgroundColor: colors.card,

          ...shadows.card,
        },
        pressed && {
          opacity: 0.85,
        },
      ]}
    >
      <MaterialCommunityIcons
        name="image-outline"
        size={24}
        color={colors.primary}
      />
    </Pressable>
  );
}