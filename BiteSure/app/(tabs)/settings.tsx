import { Switch, Text } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/common/Screen";
import SectionHeader from "@/components/common/SectionHeader";

import SettingsSection from "@/components/settings/SettingsSection";
import SettingsItem from "@/components/settings/SettingsItem";

import { useTheme } from "@/hooks/useTheme";
import { AppIcons } from "@/constants/AppIcons";
import { APP_NAME, APP_VERSION } from "@/constants/AppConstants";

export default function Settings() {

  const { colors, typography, spacing } = useTheme();

  return (
    <Screen scroll>

      <SectionHeader title="Settings" />

      <SettingsSection title="Preferences">

        <SettingsItem
          icon={AppIcons.appearance}
          title="Appearance"
          subtitle="System"
          onPress={() =>
            router.push("/settings/appearance")
          }
        />

        <SettingsItem
          icon={AppIcons.notifications}
          title="Notifications"
          right={
            <Switch
              value={true}
              onValueChange={() => { }}
            />
          }
          showChevron={false}
        />

        <SettingsItem
          icon={AppIcons.language}
          title="Language"
          subtitle="English"
          onPress={() => { }}
        />

      </SettingsSection>

      <SettingsSection title="Health & Safety">

        <SettingsItem
          icon={AppIcons.allergies}
          title="Manage Allergies"
          onPress={() => router.push("/settings/allergies")}
        />

        <SettingsItem
          icon={AppIcons.emergency}
          title="Emergency Contacts"
          onPress={() => { }}
        />

        <SettingsItem
          icon={AppIcons.notes}
          title="Medical Notes"
          onPress={() => { }}
        />

      </SettingsSection>

      <SettingsSection title="Privacy & Data">

        <SettingsItem
          icon={AppIcons.privacy}
          title="Privacy Policy"
          onPress={() => { }}
        />

        <SettingsItem
          icon={AppIcons.download}
          title="Export Scan History"
          onPress={() => { }}
        />

        <SettingsItem
          icon={AppIcons.delete}
          title="Clear Scan History"
          onPress={() => { }}
        />

      </SettingsSection>

      <SettingsSection title="Support">

        <SettingsItem
          icon={AppIcons.help}
          title="Help Center"
          onPress={() => { }}
        />

        <SettingsItem
          icon={AppIcons.star}
          title="Rate App"
          onPress={() => { }}
        />

        <SettingsItem
          icon={AppIcons.information}
          title="About"
          subtitle="Version 1.0.0"
          onPress={() => { }}
        />

      </SettingsSection>

      <Text
        style={{
          textAlign: "center",
          color: colors.textSecondary,
          fontSize: typography.size.caption,
          marginVertical: spacing["3xl"],
        }}
      >
        {APP_NAME} v{APP_VERSION}
      </Text>

    </Screen>
  );
}