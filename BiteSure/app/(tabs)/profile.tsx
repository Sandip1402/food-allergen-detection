import { View } from "react-native";

import Screen from "@/components/common/Screen";
import Card from "@/components/common/Card";
import SectionHeader from "@/components/common/SectionHeader";

import ProfileHeader from "@/components/profile/ProfileHeader";
import AllergyChip from "@/components/profile/AllergyChip";
import StatsCard from "@/components/profile/StatsCard";
import ProfileMenuItem from "@/components/profile/ProfileMenuItem";

import { Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";


export default function Profile() {
  
  const { colors, typography, spacing } = useTheme();
  
  return (
    <Screen scroll>

      <SectionHeader title="You" />

      <ProfileHeader name="Sandip Das" />

      {/* Allergies */}

      <Card className="mx-6 mt-8">

        <Text
          style={{
            color: colors.text,
            fontSize: typography.size.subheading,
            fontWeight: typography.weight.bold,
          }}
        >
          My Allergies
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: spacing.md,
            marginTop: spacing.lg,
          }}
        >
          <AllergyChip label="🥜 Peanut" />
          <AllergyChip label="🥛 Milk" />
          <AllergyChip label="🥚 Egg" />
          <AllergyChip label="🌾 Gluten" />
        </View>

      </Card>

      {/* Statistics */}

      <SectionHeader title="Statistics" />

      <View
        style={{
          flexDirection: "row",
          marginHorizontal: spacing["2xl"],
          gap: spacing.md,
        }}
      >
        <StatsCard
          title="Scans"
          value={24}
          color={colors.primary}
        />

        <StatsCard
          title="Safe"
          value={20}
          color={colors.success}
        />

        <StatsCard
          title="Unsafe"
          value={4}
          color={colors.danger}
        />
      </View>

      {/* Menu */}

      <SectionHeader title="More" />

      <ProfileMenuItem
        icon="food-apple"
        title="Manage Allergies"
        onPress={() => {}}
      />

      <ProfileMenuItem
        icon="card-account-details"
        title="Emergency Contacts"
        onPress={() => {}}
      />

      <ProfileMenuItem
        icon="information-outline"
        title="About"
        onPress={() => {}}
      />

      <View
        style={{
          height: spacing["4xl"],
        }}
      />

    </Screen>
  );
}