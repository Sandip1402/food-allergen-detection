import { View, Text, StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";

const FRAME_HEIGHT = 260;
const CORNER = 32;
const STROKE = 4;
const FRAME_COLOR = "#FFFFFF";

export default function CameraOverlay() {
  const { spacing, typography, radius } = useTheme();


  return (
    <View
      pointerEvents="none"
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "82%",
          height: FRAME_HEIGHT,
          position: "relative",
        }}
      >
        {/* Top Left */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: CORNER,
            height: CORNER,
            borderTopWidth: STROKE,
            borderLeftWidth: STROKE,
            borderColor: FRAME_COLOR,
            borderTopLeftRadius: radius.lg,
          }}
        />

        {/* Top Right */}
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: CORNER,
            height: CORNER,
            borderTopWidth: STROKE,
            borderRightWidth: STROKE,
            borderColor: FRAME_COLOR,
            borderTopRightRadius: radius.lg,
          }}
        />

        {/* Bottom Left */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: CORNER,
            height: CORNER,
            borderBottomWidth: STROKE,
            borderLeftWidth: STROKE,
            borderColor: FRAME_COLOR,
            borderBottomLeftRadius: radius.lg,
          }}
        />

        {/* Bottom Right */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: CORNER,
            height: CORNER,
            borderBottomWidth: STROKE,
            borderRightWidth: STROKE,
            borderColor: FRAME_COLOR,
            borderBottomRightRadius: radius.lg,
          }}
        />
      </View>

      <Text
        style={{
          marginTop: spacing.xl,
          color: "#FFFFFF",
          fontSize: typography.size.body,
          fontWeight: typography.weight.medium,
          textAlign: "center",
        }}
      >
        Align the ingredient list{"\n"}inside the frame
      </Text>
    </View>
  );
}