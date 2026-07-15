import Button from "@/components/common/Button";
import Screen from "@/components/common/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface PermissionViewProps {
  onGrantPermission: () => void;
}

export default function PermissionView({
  onGrantPermission,
}: PermissionViewProps) {
  const { colors, spacing, typography } = useTheme();

  return (
    <Screen padded>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="camera-off-outline"
          size={80}
          color={colors.primary}
        />

        <Text
          style={{
            marginTop: spacing.xl,
            fontSize: typography.size.heading,
            fontWeight: typography.weight.bold,
            color: colors.text,
          }}
        >
          Camera Permission Needed
        </Text>

        <Text
          style={{
            marginTop: spacing.md,
            textAlign: "center",
            color: colors.textSecondary,
            fontSize: typography.size.body,
            lineHeight: 24,
          }}
        >
          We only use the camera to scan ingredient labels for allergy detection.
        </Text>

        <View style={{  marginTop: spacing["3xl"], 
                        width: "100%", 
                        justifyContent: "center",
                        alignItems: "center" 
                    }}>
          <Button
            variant="ghost"
            title="Grant Permission"
            onPress={onGrantPermission}
          />
        </View>
      </View>
    </Screen>
  );
}