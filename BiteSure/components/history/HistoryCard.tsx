import { Image, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Card from "@/components/common/Card";
import StatusBadge from "@/components/StatusBadge";

import { useTheme } from "@/hooks/useTheme";
import { ScanResult } from "@/context/allergenStore";

interface HistoryCardProps {
  scan: ScanResult;
  onPress?: () => void;
}

export default function HistoryCard({
  scan,
  onPress,
}: HistoryCardProps) {

  const {
    colors,
    typography,
    spacing,
  } = useTheme();

  const allergenNames =
    scan.detectedAllergens.map(
      (a) => a.name
    );

  const previewText =
    allergenNames.length === 0
      ? "No allergens detected"
      : allergenNames.length <= 2
        ? allergenNames.join(", ")
        : `${allergenNames.slice(0, 2).join(", ")} +${allergenNames.length - 2
        }`;

  const statusMap = {
    safe: "Safe",
    warning: "Warning",
    unsafe: "Unsafe",
  } as const;

  const status = statusMap[scan.risk];

  return (
    <Pressable onPress={onPress}>
      <Card className="mx-6 mb-4">

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >

          <Image
            source={{
              uri: scan.imageUri,
            }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
            }}
          />

          <View
            style={{
              flex: 1,
              marginLeft: spacing.md,
            }}
          >

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >

              <View
                style={{
                  flex: 1,
                  marginRight: spacing.sm,
                }}
              >

                <Text
                  numberOfLines={1}
                  style={{
                    color: colors.text,
                    fontSize:
                      typography.size.subheading,
                    fontWeight:
                      typography.weight.semibold,
                  }}
                >
                  {scan.productName ??
                    "Unknown Product"}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    color:
                      allergenNames.length
                        ? colors.warning
                        : colors.success,

                    marginTop: 4,
                  }}
                >
                  {previewText}
                </Text>

              </View>

              <StatusBadge status={status} />

            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: spacing.sm,
              }}
            >

              <MaterialCommunityIcons
                name="clock-outline"
                size={16}
                color={colors.icon}
              />

              <Text
                style={{
                  marginLeft: 6,
                  color:
                    colors.textSecondary,
                  fontSize:
                    typography.size.caption,
                }}
              >
                {new Date(
                  scan.timestamp
                ).toLocaleString()}
              </Text>

            </View>

          </View>

        </View>

      </Card>
    </Pressable>
  );
}