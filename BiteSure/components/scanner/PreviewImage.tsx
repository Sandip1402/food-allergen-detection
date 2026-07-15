import { Image, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";

interface PreviewImageProps {
  uri: string;
}

export default function PreviewImage({
  uri,
}: PreviewImageProps) {
  const { radius, shadows, spacing } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: spacing.lg
      }}
    >
      <Image
        source={{ uri }}
        resizeMode="contain"
        style={{
          width: "100%",
          height: "100%",

          borderRadius: radius.xl,

          ...shadows.card,
        }}
      />
    </View>
  );
}