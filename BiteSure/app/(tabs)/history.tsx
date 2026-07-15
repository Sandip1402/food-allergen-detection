import { useState } from "react";
import { ScrollView, View } from "react-native";

import Screen from "@/components/common/Screen";
import SectionHeader from "@/components/common/SectionHeader";
import SearchBar from "@/components/common/SearchBar";
import HistoryCard from "@/components/history/HistoryCard";
import FilterChip from "@/components/history/FilterChip";

const FILTERS = [
  "All",
  "Safe",
  "Warning",
  "Unsafe",
] as const;

export default function History() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("All");

  return (
    <Screen scroll>
      <SectionHeader title="History" />

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search scans..."
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 20,
        }}
      >
        {FILTERS.map((filter) => (
          <FilterChip
            key={filter}
            label={filter}
            active={selected === filter}
            onPress={() => setSelected(filter)}
          />
        ))}
      </ScrollView>

      <HistoryCard
        food="Chocolate Cookies"
        date="Today • 10:25 AM"
        status="Unsafe"
      />

      <HistoryCard
        food="Whole Wheat Bread"
        date="Yesterday • 8:12 PM"
        status="Safe"
      />

      <HistoryCard
        food="Protein Bar"
        date="Yesterday • 2:17 PM"
        status="Warning"
      />

      <View className="h-24" />
    </Screen>
  );
}