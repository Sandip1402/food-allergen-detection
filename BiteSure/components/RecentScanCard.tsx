import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StatusBadge from "./StatusBadge";

interface Props {
  food: string;
  status: "Safe" | "Warning" | "Unsafe";
}

export default function RecentScanCard({
  food,
  status,
}: Props) {

  const color =
    status === "Safe"
      ? "#22C55E"
      : status === "Warning"
      ? "#F59E0B"
      : "#EF4444";

  return (
    <View className="mx-6 mt-4 bg-white rounded-2xl p-5 flex-row justify-between items-center">

      <View>

        <Text className="font-semibold text-lg">
          {food}
        </Text>

        <StatusBadge status={status} />

      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={28}
        color="#94A3B8"
      />

    </View>
  );
}