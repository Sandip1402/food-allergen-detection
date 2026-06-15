import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { AllergenCard } from "@/components/AllergenCard";
import { Colors } from "@/constants/Colors";
import { useAllergenStore, ScanResult } from "@/context/allergenStore";
import { apiService } from "@/services/apiService";
import { router } from "expo-router";
import { v4 as uuidv4 } from "uuid";

export default function ScannerScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [scanMode, setScanMode] = useState<"camera" | "upload" | "results">(
    "camera"
  );
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [detectedAllergens, setDetectedAllergens] = useState<any[]>([]);

  const { addScanResult, userPreferences, setError } = useAllergenStore();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo.uri);
        setScanMode("results");
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setCapturedImage(result.assets[0].uri);
        setScanMode("results");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const analyzeScan = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    try {
      // Mock detection - replace with actual backend call
      const result: ScanResult = {
        id: uuidv4(),
        imageUri: capturedImage,
        detectedAllergens: [
          {
            id: "1",
            name: "Peanuts",
            severity: "high",
            description: "Tree nut allergen that can cause severe reactions",
          },
          {
            id: "2",
            name: "Dairy",
            severity: "medium",
            description: "Milk-based products",
          },
        ],
        confidence: 0.92,
        timestamp: new Date().toISOString(),
        productName: productName || "Unknown Product",
        notes: "Found on ingredients label",
      };

      // Filter allergens against user's known allergies
      const matchingAllergens = result.detectedAllergens.filter((detected) =>
        userPreferences.allergies.some(
          (userAllergen) =>
            userAllergen.name.toLowerCase() === detected.name.toLowerCase()
        )
      );

      setScanResult(result);
      setDetectedAllergens(result.detectedAllergens);

      // Save to store
      addScanResult(result);

      // Show warning if user allergies detected
      if (matchingAllergens.length > 0) {
        Alert.alert(
          "⚠️ Warning",
          `This product contains allergens you're allergic to: ${matchingAllergens.map((a) => a.name).join(", ")}`
        );
      }
    } catch (error) {
      setError("Failed to analyze image. Please try again.");
      Alert.alert("Error", "Failed to analyze the image");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScan = () => {
    setCapturedImage(null);
    setProductName("");
    setScanResult(null);
    setDetectedAllergens([]);
    setScanMode("camera");
  };

  // Camera Mode
  if (scanMode === "camera") {
    if (!permission?.granted) {
      return (
        <View
          style={[
            styles.container,
            { backgroundColor: colors.background, justifyContent: "center" },
          ]}
        >
          <View style={styles.centerContent}>
            <MaterialCommunityIcons
              name="camera-off"
              size={64}
              color={colors.tabIconDefault}
            />
            <ThemedText type="subtitle" style={{ marginTop: 16 }}>
              Camera Permission Required
            </ThemedText>
            <ThemedText style={{ marginTop: 8, textAlign: "center" }}>
              We need permission to access your camera to scan products.
            </ThemedText>
            <ThemedButton
              label="Grant Permission"
              onPress={requestPermission}
              style={{ marginTop: 20 }}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <CameraView style={styles.camera} ref={cameraRef} facing="back" />
          <View style={styles.overlayContainer}>
            {/* Focus Box */}
            <View
              style={[
                styles.focusBox,
                { borderColor: colors.tint },
              ]}
            />
            {/* Instructions */}
            <View style={styles.instructionsContainer}>
              <ThemedText
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Position the product label or barcode in the center
              </ThemedText>
            </View>

            {/* Controls */}
            <View style={styles.controlsContainer}>
              <TouchableOpacity
                onPress={() => setScanMode("camera")}
                style={[styles.controlButton, { opacity: 0.7 }]}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={28}
                  color="white"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={takePicture}
                style={styles.captureButton}
              >
                <View style={styles.captureInner} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={pickImage}
                style={[styles.controlButton, { opacity: 0.7 }]}
              >
                <MaterialCommunityIcons
                  name="image"
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
      </View>
    );
  }

  // Results/Analysis Mode
  if (scanMode === "results") {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.resultContainer}
      >
        {/* Image Preview */}
        <Image source={{ uri: capturedImage! }} style={styles.previewImage} />

        {/* Product Name Input */}
        <View style={styles.section}>
          <ThemedText style={{ marginBottom: 8 }}>Product Name</ThemedText>
          <View
            style={[
              styles.inputField,
              { borderColor: colors.tabIconDefault },
            ]}
          >
            <MaterialCommunityIcons
              name="package-variant"
              size={20}
              color={colors.tabIconDefault}
            />
            {/* Simple text input simulation */}
            <ThemedText
              style={{
                flex: 1,
                marginLeft: 8,
                color: productName ? colors.text : colors.tabIconDefault,
              }}
            >
              {productName || "Enter product name..."}
            </ThemedText>
          </View>
        </View>

        {/* Analysis Buttons */}
        <View style={styles.section}>
          <ThemedButton
            label={isAnalyzing ? "Analyzing..." : "Analyze Allergens"}
            icon="magnify-scan"
            onPress={analyzeScan}
            loading={isAnalyzing}
            style={{ marginBottom: 12 }}
            size="large"
          />
          <ThemedButton
            label="Retake Photo"
            icon="camera-retake"
            variant="secondary"
            onPress={resetScan}
            size="large"
          />
        </View>

        {/* Detected Allergens */}
        {detectedAllergens.length > 0 && (
          <View style={styles.section}>
            <ThemedText type="subtitle" style={{ marginBottom: 12 }}>
              Detected Allergens ({detectedAllergens.length})
            </ThemedText>
            {detectedAllergens.map((allergen) => (
              <AllergenCard
                key={allergen.id}
                allergen={allergen}
                showConfidence={true}
                confidenceScore={scanResult?.confidence || 0.85}
              />
            ))}

            {/* Confidence Score */}
            {scanResult && (
              <View style={[styles.infoBox, { backgroundColor: colors.info }]}>
                <MaterialCommunityIcons
                  name="information"
                  size={20}
                  color="white"
                />
                <ThemedText
                  style={{
                    color: "white",
                    marginLeft: 12,
                    flex: 1,
                  }}
                >
                  Confidence: {(scanResult.confidence * 100).toFixed(1)}%
                </ThemedText>
              </View>
            )}
          </View>
        )}

        {/* Warning Box if user allergies detected */}
        {scanResult && detectedAllergens.some((allergen) =>
          userPreferences.allergies.some(
            (userAllergy) =>
              userAllergy.name.toLowerCase() === allergen.name.toLowerCase()
          )
        ) && (
          <View style={[styles.warningBox, { backgroundColor: colors.danger }]}>
            <MaterialCommunityIcons
              name="alert"
              size={20}
              color="white"
            />
            <ThemedText
              style={{
                color: "white",
                marginLeft: 12,
                flex: 1,
              }}
            >
              ⚠️ This product contains allergens you're allergic to!
            </ThemedText>
          </View>
        )}
      </ScrollView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    paddingBottom: 40,
  },
  camera: {
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  focusBox: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderRadius: 12,
    marginTop: 60,
  },
  instructionsContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
    borderRadius: 8,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingBottom: 40,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "white",
  },
  captureInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "white",
  },
  centerContent: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  previewImage: {
    width: "100%",
    height: 280,
    borderRadius: 12,
    marginBottom: 20,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
  },
});
