import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Alert } from "react-native";

import Screen from "@/components/common/Screen";
import TopBar from "@/components/scanner/TopBar";
import PreviewImage from "@/components/scanner/PreviewImage";
import PreviewActions from "@/components/scanner/PreviewActions";
import ModeToggle from "@/components/scanner/ModeToggle";

import { useAnalysisStore } from "@/store/analysisStore";
import { apiService } from "@/services/apiService";

import { ScanResult } from "@/context/allergenStore";
import { useHistoryStore } from "@/store/historyStore";

const ANALYSIS_MESSAGES = [
  "Detecting ingredients...",
  "Reading ingredients...",
  "Checking allergens...",
  "Preparing results...",
];

export default function PreviewScreen() {
  const imageUri = useAnalysisStore((state) => state.imageUri);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  // Food or Ingredient mode
  const [mode, setMode] = useState<"food" | "ingredient">("food");

  const statusMessage = ANALYSIS_MESSAGES[statusIndex];

  const addScan = useHistoryStore((state) => state.addScan);

  const handleAnalyze = async () => {
    if (!imageUri || isAnalyzing) return;

    setIsAnalyzing(true);

    try {
      // Call FastAPI
      const response = await apiService.scanImage(imageUri, mode);

      // console.log("Backend Response:");
      // console.log(JSON.stringify(response, null, 2));

      // Convert backend response to frontend ScanResult
      const result: ScanResult = {
        id: Date.now().toString(),
        imageUri,
        detectedAllergens: response.allergens.map(
          (name: string, index: number) => ({
            id: index.toString(),
            name,
            severity: "warning", // We'll improve this later
            description: "",
          })
        ),
        risk:
          response.allergens.length === 0
            ? "safe"
            : "warning",
        confidence: response.confidence
          ? Math.round(response.confidence * 100)
          : 100,
        timestamp: new Date().toISOString(),
        productName: response.food ?? "Ingredient Analysis",
      };

      console.log("Mapped ScanResult:");
      console.log(JSON.stringify(result, null, 2));

      addScan(result);

      router.push({
        pathname: "/scanner/result",
        params: {
          result: JSON.stringify(result),
        },
      });
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Analysis Failed",
        error.message || "Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (!isAnalyzing) {
      setStatusIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setStatusIndex((prev) =>
        prev < ANALYSIS_MESSAGES.length - 1
          ? prev + 1
          : prev
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  useEffect(() => {
    if (!imageUri) {
      router.replace("/scanner");
    }
  }, [imageUri]);

  if (!imageUri) return null;

  return (
    <Screen>
      <TopBar title="Review Scan" />

      <PreviewImage
        imageUri={imageUri}
        isAnalyzing={isAnalyzing}
        statusMessage={statusMessage}
      />

      <ModeToggle
        mode={mode}
        onChange={setMode}
      />

      <PreviewActions
        isAnalyzing={isAnalyzing}
        onRetake={() => router.back()}
        onAnalyze={handleAnalyze}
      />
    </Screen>
  );
}