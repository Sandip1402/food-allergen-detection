import Card from "@/components/common/Card";
import StatusBadge from "@/components/StatusBadge";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View} from "react-native";

import { useTheme } from "@/hooks/useTheme";

interface HistoryCardProps {
  food: string;
  date: string;
  status: "Safe" | "Warning" | "Unsafe";
}

export default function HistoryCard({
  food,
  date,
  status,
}: HistoryCardProps) {
  
  const { colors, typography } = useTheme();

  return (
    <Card className="mx-6 mb-4">
      <View className="flex-row items-center justify-between">

        <View className="flex-1">
          <Text
            style={{
              color: colors.text,
              fontSize: typography.size.subheading,
              fontWeight: typography.weight.semibold
            }}
          >
            {food}
          </Text>

          <View className="flex-row items-center mt-2">
            <MaterialCommunityIcons
              name="clock-outline"
              size={16}
              color={colors.icon}
            />

            <Text
              style={{
                marginLeft: 6,
                color: colors.icon,
              }}
            >
              {date}
            </Text>
          </View>
        </View>

        <StatusBadge status={status} />

      </View>
    </Card>
  );
}