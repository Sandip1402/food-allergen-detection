import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { Allergen } from "@/context/allergenStore";

interface AllergenCardProps {
  allergen: Allergen;
  onPress?: () => void;
  style?: ViewStyle;
  showConfidence?: boolean;
  confidenceScore?: number;
}

export function AllergenCard({
  allergen,
  onPress,
  style,
  showConfidence = false,
  confidenceScore = 0,
}: AllergenCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const severityColors = {
    low: colors.info,
    medium: colors.warning,
    high: colors.danger,
  };

  const severityIcons = {
    low: "alert-circle-outline",
    medium: "alert-circle",
    high: "alert",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.background,
          borderColor: severityColors[allergen.severity],
        },
        style,
      ]}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: severityColors[allergen.severity] },
          ]}
        >
          <MaterialCommunityIcons
            name={severityIcons[allergen.severity]}
            size={20}
            color="white"
          />
        </View>
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle">{allergen.name}</ThemedText>
          <ThemedText style={styles.severity}>
            Severity: {allergen.severity.toUpperCase()}
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.description}>{allergen.description}</ThemedText>

      {showConfidence && (
        <View style={styles.confidenceContainer}>
          <View
            style={[
              styles.confidenceBar,
              {
                width: `${confidenceScore * 100}%`,
                backgroundColor: severityColors[allergen.severity],
              },
            ]}
          />
          <ThemedText style={styles.confidenceText}>
            Confidence: {(confidenceScore * 100).toFixed(1)}%
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 2,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  severity: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  confidenceContainer: {
    marginTop: 8,
  },
  confidenceBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  confidenceText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
