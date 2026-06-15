import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { AllergenCard } from "@/components/AllergenCard";
import { Colors } from "@/constants/Colors";
import { useAllergenStore } from "@/context/allergenStore";
import { apiService } from "@/services/apiService";

export default function Index() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { userPreferences, scanHistory, setIsLoading, isLoading } =
    useAllergenStore();

  useEffect(() => {
    // Check backend connectivity on app load
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      await apiService.healthCheck();
    } catch (error) {
      console.log("Backend not available yet");
    }
  };

  const recentScans = scanHistory.slice(0, 3);
  const riskLevel =
    userPreferences.allergies.length > 0 ? "HIGH" : "LOW";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header Card */}
      <View
        style={[
          styles.headerCard,
          { backgroundColor: colors.tint, shadowColor: colors.tint },
        ]}
      >
        <View style={styles.headerContent}>
          <View>
            <ThemedText
              style={{ color: "white", fontSize: 18, marginBottom: 4 }}
            >
              Welcome!
            </ThemedText>
            <ThemedText style={{ color: "rgba(255,255,255,0.8)" }}>
              Your allergen detection assistant
            </ThemedText>
          </View>
          <MaterialCommunityIcons name="leaf" size={40} color="white" />
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: colors.background,
              borderColor: colors.info,
            },
          ]}
        >
          <MaterialCommunityIcons name="shield-alert" size={24} color={colors.info} />
          <ThemedText type="subtitle" style={{ marginTop: 8 }}>
            {userPreferences.allergies.length}
          </ThemedText>
          <ThemedText style={{ fontSize: 12, opacity: 0.7 }}>
            Known Allergies
          </ThemedText>
        </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: colors.background,
              borderColor: colors.tint,
            },
          ]}
        >
          <MaterialCommunityIcons name="history" size={24} color={colors.tint} />
          <ThemedText type="subtitle" style={{ marginTop: 8 }}>
            {scanHistory.length}
          </ThemedText>
          <ThemedText style={{ fontSize: 12, opacity: 0.7 }}>
            Total Scans
          </ThemedText>
        </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: colors.background,
              borderColor:
                riskLevel === "HIGH" ? colors.danger : colors.success,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={riskLevel === "HIGH" ? "alert" : "check-circle"}
            size={24}
            color={riskLevel === "HIGH" ? colors.danger : colors.success}
          />
          <ThemedText type="subtitle" style={{ marginTop: 8 }}>
            {riskLevel}
          </ThemedText>
          <ThemedText style={{ fontSize: 12, opacity: 0.7 }}>
            Risk Level
          </ThemedText>
        </View>
      </View>

      {/* Your Allergies */}
      {userPreferences.allergies.length > 0 && (
        <View style={styles.section}>
          <ThemedText type="subtitle">Your Allergies</ThemedText>
          <View style={styles.allergenList}>
            {userPreferences.allergies.map((allergen) => (
              <TouchableOpacity
                key={allergen.id}
                onPress={() => router.push("/profile")}
              >
                <AllergenCard allergen={allergen} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Scan to Check */}
      <View style={styles.section}>
        <ThemedText type="subtitle" style={{ marginBottom: 12 }}>
          Ready to Scan?
        </ThemedText>
        <ThemedButton
          label="Open Camera"
          icon="camera"
          onPress={() => router.push("/scanner")}
          size="large"
          style={{ marginBottom: 12 }}
        />
        <ThemedButton
          label="Upload Photo"
          icon="image-plus"
          variant="secondary"
          onPress={() => router.push("/scanner")}
          size="large"
        />
      </View>

      {/* Recent Scans */}
      {recentScans.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">Recent Scans</ThemedText>
            <TouchableOpacity onPress={() => router.push("/history")}>
              <ThemedText style={{ color: colors.tint, fontWeight: "600" }}>
                View All
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.allergenList}>
            {recentScans.map((scan) => (
              <TouchableOpacity
                key={scan.id}
                onPress={() => router.push(`/scanner?scanId=${scan.id}`)}
              >
                <View
                  style={[
                    styles.recentScanCard,
                    { borderColor: colors.tabIconDefault },
                  ]}
                >
                  <View style={styles.scanCardHeader}>
                    <ThemedText type="subtitle">
                      {scan.productName || "Scan Result"}
                    </ThemedText>
                    <ThemedText style={{ fontSize: 12, opacity: 0.7 }}>
                      {new Date(scan.timestamp).toLocaleDateString()}
                    </ThemedText>
                  </View>
                  <ThemedText style={{ fontSize: 12, marginTop: 8 }}>
                    {scan.detectedAllergens.length} allergen(s) detected
                  </ThemedText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Empty State Info */}
      {scanHistory.length === 0 && userPreferences.allergies.length === 0 && (
        <View style={styles.section}>
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="information"
              size={48}
              color={colors.tabIconDefault}
            />
            <ThemedText type="subtitle" style={{ marginTop: 12 }}>
              Get Started
            </ThemedText>
            <ThemedText style={{ marginTop: 8, textAlign: "center" }}>
              Set up your allergies in your profile, then start scanning food
              products to check for allergens.
            </ThemedText>
          </View>
        </View>
      )}
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
    margin: 16,
    padding: 20,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 8,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
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
  allergenList: {
    marginTop: 8,
  },
  recentScanCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 6,
  },
  scanCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
});
