import React, { useState } from "react";
import {
  StyleSheet,
  View,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { AllergenCard } from "@/components/AllergenCard";
import { Colors } from "@/constants/Colors";
import { useAllergenStore, Allergen } from "@/context/allergenStore";

// Mock allergen database
const COMMON_ALLERGENS: Allergen[] = [
  {
    id: "1",
    name: "Peanuts",
    severity: "high",
    description: "Legume allergen, can cause severe reactions",
  },
  {
    id: "2",
    name: "Tree Nuts",
    severity: "high",
    description: "Including almonds, walnuts, cashews, etc.",
  },
  {
    id: "3",
    name: "Milk/Dairy",
    severity: "medium",
    description: "Lactose and milk proteins",
  },
  {
    id: "4",
    name: "Eggs",
    severity: "medium",
    description: "Egg proteins",
  },
  {
    id: "5",
    name: "Wheat",
    severity: "medium",
    description: "Gluten-containing grain",
  },
  {
    id: "6",
    name: "Soy",
    severity: "low",
    description: "Soybean products",
  },
  {
    id: "7",
    name: "Fish",
    severity: "high",
    description: "Fish and fish derivatives",
  },
  {
    id: "8",
    name: "Shellfish",
    severity: "high",
    description: "Crustaceans and mollusks",
  },
  {
    id: "9",
    name: "Sesame",
    severity: "low",
    description: "Sesame seeds and oil",
  },
  {
    id: "10",
    name: "Sulfites",
    severity: "low",
    description: "Food preservatives",
  },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { userPreferences, updateUserAllergies, setUserPreferences } =
    useAllergenStore();
  const [showAllergenSelector, setShowAllergenSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const availableAllergens = COMMON_ALLERGENS.filter(
    (allergen) =>
      !userPreferences.allergies.some((a) => a.id === allergen.id)
  );

  const handleToggleAllergen = (allergen: Allergen) => {
    const isSelected = userPreferences.allergies.some(
      (a) => a.id === allergen.id
    );
    if (isSelected) {
      updateUserAllergies(
        userPreferences.allergies.filter((a) => a.id !== allergen.id)
      );
    } else {
      updateUserAllergies([...userPreferences.allergies, allergen]);
    }
  };

  const handleRemoveAllergen = (id: string) => {
    updateUserAllergies(
      userPreferences.allergies.filter((a) => a.id !== id)
    );
  };

  const handleToggleNotifications = () => {
    setUserPreferences({
      ...userPreferences,
      notificationsEnabled: !userPreferences.notificationsEnabled,
    });
  };

  const handleToggleDarkMode = () => {
    setUserPreferences({
      ...userPreferences,
      darkMode: !userPreferences.darkMode,
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Profile Header */}
      <View style={styles.headerCard}>
        <View
          style={[
            styles.avatarCircle,
            { backgroundColor: colors.tint, opacity: 0.2 },
          ]}
        >
          <MaterialCommunityIcons name="account" size={40} color={colors.tint} />
        </View>
        <View style={styles.headerInfo}>
          <ThemedText type="title">My Profile</ThemedText>
          <ThemedText style={{ marginTop: 4 }}>
            Manage your allergen preferences
          </ThemedText>
        </View>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <ThemedText type="subtitle" style={{ marginBottom: 12 }}>
          Settings
        </ThemedText>

        {/* Notifications */}
        <View style={[styles.settingRow, { borderBottomColor: colors.tabIconDefault }]}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons
              name="bell"
              size={20}
              color={colors.tint}
            />
            <View style={styles.settingLabel}>
              <ThemedText>Notifications</ThemedText>
              <ThemedText style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>
                Alerts for allergen warnings
              </ThemedText>
            </View>
          </View>
          <Switch
            value={userPreferences.notificationsEnabled}
            onValueChange={handleToggleNotifications}
            trackColor={{
              false: colors.tabIconDefault,
              true: colors.info,
            }}
            thumbColor={colors.tint}
          />
        </View>

        {/* Dark Mode */}
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons
              name="moon-waning-crescent"
              size={20}
              color={colors.tint}
            />
            <View style={styles.settingLabel}>
              <ThemedText>Dark Mode</ThemedText>
              <ThemedText style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>
                Use dark theme
              </ThemedText>
            </View>
          </View>
          <Switch
            value={userPreferences.darkMode}
            onValueChange={handleToggleDarkMode}
            trackColor={{
              false: colors.tabIconDefault,
              true: colors.info,
            }}
            thumbColor={colors.tint}
          />
        </View>
      </View>

      {/* Allergies Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">My Allergies</ThemedText>
          {userPreferences.allergies.length > 0 && (
            <TouchableOpacity onPress={() => setShowAllergenSelector(true)}>
              <MaterialCommunityIcons
                name="plus-circle"
                size={24}
                color={colors.tint}
              />
            </TouchableOpacity>
          )}
        </View>

        {userPreferences.allergies.length === 0 ? (
          <View style={styles.emptyAllergenState}>
            <MaterialCommunityIcons
              name="shield-check"
              size={48}
              color={colors.success}
            />
            <ThemedText
              type="subtitle"
              style={{ marginTop: 12, textAlign: "center" }}
            >
              No Allergies Listed
            </ThemedText>
            <ThemedText style={{ marginTop: 8, textAlign: "center" }}>
              Add your allergies to get personalized allergen warnings
            </ThemedText>
            <ThemedButton
              label="Add Allergy"
              icon="plus"
              onPress={() => setShowAllergenSelector(true)}
              style={{ marginTop: 16 }}
            />
          </View>
        ) : (
          <View>
            {userPreferences.allergies.map((allergen) => (
              <View key={allergen.id} style={styles.allergyItemContainer}>
                <AllergenCard allergen={allergen} />
                <TouchableOpacity
                  onPress={() => handleRemoveAllergen(allergen.id)}
                  style={[
                    styles.removeButton,
                    { backgroundColor: colors.danger, opacity: 0.1 },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={20}
                    color={colors.danger}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Add Allergen Modal-like Section */}
      {showAllergenSelector && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Add Allergen</ThemedText>
            <TouchableOpacity onPress={() => setShowAllergenSelector(false)}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={[styles.searchBox, { borderColor: colors.tabIconDefault }]}>
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={colors.tabIconDefault}
            />
            <ThemedText style={{ flex: 1, marginLeft: 8 }}>
              Search allergens...
            </ThemedText>
          </View>

          {/* Available Allergens */}
          <View style={styles.allergenSelector}>
            {availableAllergens.map((allergen) => (
              <TouchableOpacity
                key={allergen.id}
                onPress={() => handleToggleAllergen(allergen)}
                style={[
                  styles.allergenOption,
                  { borderColor: colors.tabIconDefault },
                ]}
              >
                <View>
                  <ThemedText type="subtitle">{allergen.name}</ThemedText>
                  <ThemedText style={{ fontSize: 12, marginTop: 4 }}>
                    {allergen.description}
                  </ThemedText>
                </View>
                <MaterialCommunityIcons
                  name="plus-circle-outline"
                  size={24}
                  color={colors.tint}
                />
              </TouchableOpacity>
            ))}
          </View>

          <ThemedButton
            label="Done"
            onPress={() => setShowAllergenSelector(false)}
            style={{ marginTop: 12 }}
          />
        </View>
      )}

      {/* About Section */}
      <View style={styles.section}>
        <ThemedText type="subtitle" style={{ marginBottom: 12 }}>
          About
        </ThemedText>
        <View style={[styles.aboutItem, { borderColor: colors.tabIconDefault }]}>
          <View>
            <ThemedText>Version</ThemedText>
            <ThemedText style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
              1.0.0
            </ThemedText>
          </View>
        </View>
        <View style={[styles.aboutItem, { borderColor: colors.tabIconDefault }]}>
          <View>
            <ThemedText>Privacy Policy</ThemedText>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={colors.text}
          />
        </View>
        <View style={styles.aboutItem}>
          <View>
            <ThemedText>Terms of Service</ThemedText>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={colors.text}
          />
        </View>
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <ThemedButton
          label="Clear All Data"
          icon="delete-forever"
          variant="danger"
          onPress={() =>
            Alert.alert(
              "Clear Data",
              "This will delete all your scan history and allergen preferences.",
              [
                { text: "Cancel", onPress: () => {} },
                {
                  text: "Clear",
                  onPress: () => {
                    updateUserAllergies([]);
                  },
                  style: "destructive",
                },
              ]
            )
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingLabel: {
    marginLeft: 12,
    flex: 1,
  },
  emptyAllergenState: {
    alignItems: "center",
    paddingVertical: 32,
  },
  allergyItemContainer: {
    position: "relative",
    marginBottom: 8,
  },
  removeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  allergenSelector: {
    marginBottom: 12,
  },
  allergenOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  aboutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
});
