import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "@/hooks/useTheme";

interface FlashButtonProps {
  flash: "off" | "on";
  onPress: () => void;
}

const SIZE = 52;

export default function FlashButton({
  flash,
  onPress,
}: FlashButtonProps) {
  const { colors, radius, shadows } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: SIZE,
          height: SIZE,
          borderRadius: radius.full,
          backgroundColor: colors.card,

          justifyContent: "center",
          alignItems: "center",

          ...shadows.card,
        },
        pressed && {
          opacity: 0.85,
        },
      ]}
    >
      <MaterialCommunityIcons
        name={flash === "on" ? "flash" : "flash-off"}
        color={flash === "on" ? colors.warning : colors.icon}
        size={24}
      />
    </Pressable>
  );
}