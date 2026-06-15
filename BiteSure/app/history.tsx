import React, { useState } from "react";
import {
  StyleSheet,
  View,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { AllergenCard } from "@/components/AllergenCard";
import { Colors } from "@/constants/Colors";
import { useAllergenStore } from "@/context/allergenStore";
import { router } from "expo-router";

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { scanHistory, removeScanResult, clearHistory } = useAllergenStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleDeleteScan = (id: string, productName: string) => {
    Alert.alert("Delete Scan", `Remove "${productName}" from history?`, [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Delete",
        onPress: () => removeScanResult(id),
        style: "destructive",
      },
    ]);
  };

  const handleClearHistory = () => {
    Alert.alert("Clear History", "Delete all scan records?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Clear All",
        onPress: () => clearHistory(),
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <ThemedText type="title">Scan History</ThemedText>
          <ThemedText style={{ marginTop: 4 }}>
            {scanHistory.length} scan{scanHistory.length !== 1 ? "s" : ""}
          </ThemedText>
        </View>
        {scanHistory.length > 0 && (
          <TouchableOpacity
            onPress={handleClearHistory}
            style={styles.clearButton}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color={colors.danger}
            />
          </TouchableOpacity>
        )}
      </View>

      {scanHistory.length === 0 ? (
        // Empty State
        <ScrollView
          contentContainerStyle={styles.emptyContainer}
          style={styles.scrollView}
        >
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="history"
              size={64}
              color={colors.tabIconDefault}
            />
            <ThemedText type="subtitle" style={{ marginTop: 16 }}>
              No Scans Yet
            </ThemedText>
            <ThemedText style={{ marginTop: 8, textAlign: "center" }}>
              Your scan history will appear here. Start scanning to check
              products for allergens!
            </ThemedText>
            <ThemedButton
              label="Start Scanning"
              icon="camera"
              onPress={() => router.push("/scanner")}
              style={{ marginTop: 24 }}
            />
          </View>
        </ScrollView>
      ) : (
        // History List
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.listContainer}>
          {scanHistory.map((scan, index) => (
            <View
              key={scan.id}
              style={[
                styles.scanCard,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.tabIconDefault,
                },
              ]}
            >
              {/* Card Header */}
              <TouchableOpacity
                onPress={() =>
                  setExpandedId(expandedId === scan.id ? null : scan.id)
                }
                style={styles.cardHeader}
              >
                {/* Product Image */}
                {scan.imageUri && (
                  <Image
                    source={{ uri: scan.imageUri }}
                    style={styles.thumbnail}
                  />
                )}

                {/* Info */}
                <View style={styles.cardInfo}>
                  <ThemedText type="subtitle">
                    {scan.productName || `Scan ${index + 1}`}
                  </ThemedText>
                  <ThemedText style={{ fontSize: 12, marginTop: 4 }}>
                    {new Date(scan.timestamp).toLocaleDateString()} at{" "}
                    {new Date(scan.timestamp).toLocaleTimeString()}
                  </ThemedText>
                  <View style={styles.allergenCountBadge}>
                    <MaterialCommunityIcons
                      name="alert-circle"
                      size={16}
                      color={colors.warning}
                    />
                    <ThemedText
                      style={{
                        fontSize: 11,
                        marginLeft: 4,
                        color: colors.warning,
                      }}
                    >
                      {scan.detectedAllergens.length} allergen(s)
                    </ThemedText>
                  </View>
                </View>

                {/* Expand Icon */}
                <MaterialCommunityIcons
                  name={expandedId === scan.id ? "chevron-up" : "chevron-down"}
                  size={24}
                  color={colors.text}
                />
              </TouchableOpacity>

              {/* Expanded Content */}
              {expandedId === scan.id && (
                <View style={styles.expandedContent}>
                  {/* Allergens */}
                  {scan.detectedAllergens.length > 0 && (
                    <View style={styles.allergenSection}>
                      <ThemedText type="subtitle" style={{ marginBottom: 8 }}>
                        Detected Allergens
                      </ThemedText>
                      {scan.detectedAllergens.map((allergen) => (
                        <AllergenCard
                          key={allergen.id}
                          allergen={allergen}
                          showConfidence={true}
                          confidenceScore={scan.confidence}
                        />
                      ))}
                    </View>
                  )}

                  {/* Notes */}
                  {scan.notes && (
                    <View style={styles.notesSection}>
                      <ThemedText type="subtitle">Notes</ThemedText>
                      <ThemedText style={{ marginTop: 8 }}>
                        {scan.notes}
                      </ThemedText>
                    </View>
                  )}

                  {/* Confidence */}
                  <View
                    style={[
                      styles.infoBar,
                      { backgroundColor: colors.info, opacity: 0.1 },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="information"
                      size={16}
                      color={colors.info}
                    />
                    <ThemedText style={{ marginLeft: 8, fontSize: 12 }}>
                      Confidence: {(scan.confidence * 100).toFixed(1)}%
                    </ThemedText>
                  </View>

                  {/* Actions */}
                  <View style={styles.actions}>
                    <TouchableOpacity
                      onPress={() => {
                        router.push(`/scanner?scanId=${scan.id}`);
                      }}
                      style={[
                        styles.actionButton,
                        {
                          backgroundColor: colors.tint,
                          opacity: 0.1,
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name="eye"
                        size={18}
                        color={colors.tint}
                      />
                      <ThemedText
                        style={{
                          marginLeft: 6,
                          color: colors.tint,
                          fontSize: 12,
                        }}
                      >
                        View
                      </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        handleDeleteScan(scan.id, scan.productName || "Scan")
                      }
                      style={[
                        styles.actionButton,
                        {
                          backgroundColor: colors.danger,
                          opacity: 0.1,
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={18}
                        color={colors.danger}
                      />
                      <ThemedText
                        style={{
                          marginLeft: 6,
                          color: colors.danger,
                          fontSize: 12,
                        }}
                      >
                        Delete
                      </ThemedText>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  clearButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    paddingBottom: 40,
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scanCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 8,
    marginVertical: 8,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  allergenCountBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  expandedContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  allergenSection: {
    marginBottom: 16,
  },
  notesSection: {
    marginBottom: 16,
  },
  infoBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 6,
  },
});
