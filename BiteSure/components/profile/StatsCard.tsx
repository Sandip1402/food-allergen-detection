import Card from "../common/Card";
import { Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";


interface Props {
  title: string;
  value: number;
  color: string;
}

export default function StatsCard({
  title,
  value,
  color,
}: Props) {
  
  const { colors, typography, spacing } = useTheme();

  return (
    <Card className="flex-1 items-center">

      <Text
        style={{
          color,
          fontSize: typography.size.title,
          fontWeight: typography.weight.bold,
        }}
      >
        {value}
      </Text>

      <Text
        style={{
          color: colors.textSecondary,
          marginTop: spacing.sm,
        }}
      >
        {title}
      </Text>

    </Card>
  );
}