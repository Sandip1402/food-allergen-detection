import { View, Text } from "react-native";
import Screen from "@/components/common/Screen";

import Header from "@/components/Header";
import ScanCard from "@/components/ScanCard";
import QuickAction from "@/components/QuickAction";
import TipCard from "@/components/TipCard";
import RecentScanCard from "@/components/RecentScanCard";
import { useTheme } from "@/hooks/useTheme";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import SummaryCard from "@/components/SummaryCard";

export default function Home() {

  const { colors } = useTheme();

  return (
    <Screen scroll>
      <Header />

      <ScanCard />

      <View className="flex-row mt-8 px-4">

        <QuickAction
          title="Camera"
          icon={
            <MaterialCommunityIcons
              name="camera"
              size={28}
              color="#2563EB"
            />
          }
        />

        <QuickAction
          title="Gallery"
          icon={
            <MaterialCommunityIcons
              name="image"
              size={28}
              color="#2563EB"
            />
          }
        />

        <QuickAction
          title="Search"
          icon={
            <MaterialCommunityIcons
              name="magnify"
              size={28}
              color="#2563EB"
            />
          }
        />

      </View>

      <SummaryCard />

      <Text style={{ color: colors.text }} className="px-6 mt-8 text-xl font-bold">
        Health Tip
      </Text>

      <TipCard />

      <Text style={{ color: colors.text }} className="px-6 mt-8 text-xl font-bold">
          Recent Activity
      </Text>

      <RecentScanCard
        food="Chocolate Cookies"
        status="Unsafe"
      />

      <RecentScanCard
        food="Bread"
        status="Safe"
      />

      <RecentScanCard
        food="Protein Bar"
        status="Warning"
      />

      <View className="h-28" />

    </Screen>
  );
}