import { Pressable, Text } from "react-native";

import { useTheme } from "@/hooks/useTheme";

interface Props {
  label: string;
  active: boolean;
  onPress: () => void;
}

export default function FilterChip({
  label,
  active,
  onPress,
}: Props) {
  
  const { colors, radius } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: active ? colors.primary : colors.surface,
        borderRadius: radius.xl,
        paddingHorizontal: 18,
        paddingVertical: 10,
        marginRight: 10,
      }}
    >
      <Text
        style={{
          color: active ? "#fff" : colors.text,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}