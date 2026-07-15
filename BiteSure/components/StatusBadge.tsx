import { Text, View } from "react-native";

interface StatusBadgeProps {
  status: "Safe" | "Warning" | "Unsafe";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    Safe: {
      bg: "bg-green-100",
      text: "text-green-700",
    },
    Warning: {
      bg: "bg-amber-100",
      text: "text-amber-700",
    },
    Unsafe: {
      bg: "bg-red-100",
      text: "text-red-700",
    },
  };

  return (
    <View
      className={`px-3 py-1 rounded-full ${styles[status].bg}`}
    >
      <Text className={`text-xs font-semibold ${styles[status].text}`}>
        {status}
      </Text>
    </View>
  );
}