import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Alert } from "react-native";

import Screen from "@/components/common/Screen";
import TopBar from "@/components/scanner/TopBar";

import PreviewImage from "@/components/scanner/PreviewImage";
import PreviewActions from "@/components/scanner/PreviewActions";

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

  const imageUri = useAnalysisStore(
    (state) => state.imageUri
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessage = ANALYSIS_MESSAGES[statusIndex];

  const addScan =
    useHistoryStore(
      (state) => state.addScan
    );

  const handleAnalyze = async () => {
    if (!imageUri) return;
    if (isAnalyzing) return;

    setIsAnalyzing(true);

    try {
      // Call FastAPI
      // const result = await apiService.scanImage({ uri: imageUri });

      // Mock result for demonstration
      const result: ScanResult = {
        id: Date.now().toString(),
        imageUri,
        detectedAllergens: [
            {
                id: "1",
                name: "Peanut",
                severity: "high",
                description: "",
            },
        ],
        risk: "warning",
        confidence: 94,
        timestamp: new Date().toISOString(),
        productName: "Unknown Product",
    };

      // Save to history
      addScan(result);      

      // Navigate to results
      router.push({
        pathname: "/scanner/result",
        params: {
          result: JSON.stringify(result),
        },
      });
    } catch (error) {
      Alert.alert(
        "Analysis Failed",
        "Please try again."
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
        prev < ANALYSIS_MESSAGES.length - 1 ? prev + 1 : prev
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

      <PreviewImage imageUri={imageUri} isAnalyzing={isAnalyzing} statusMessage={statusMessage} />

      <PreviewActions
        isAnalyzing={isAnalyzing}
        onRetake={() => router.back()}
        onAnalyze={() =>
          handleAnalyze()
        }
      />
    </Screen>
  );
}