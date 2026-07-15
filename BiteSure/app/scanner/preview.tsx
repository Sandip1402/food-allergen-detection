import { router } from "expo-router";

import Screen from "@/components/common/Screen";
import TopBar from "@/components/scanner/TopBar";

import PreviewImage from "@/components/scanner/PreviewImage";
import PreviewActions from "@/components/scanner/PreviewActions";

import { useAnalysisStore } from "@/store/analysisStore";

export default function PreviewScreen() {
  const imageUri = useAnalysisStore(
    (state) => state.imageUri
  );

  if (!imageUri) {
    router.replace("/scanner");
    return null;
  }

  return (
    <Screen>
      <TopBar title="Review Scan" />

      <PreviewImage uri={imageUri} />

      <PreviewActions
        onRetake={() => router.back()}
        onAnalyze={() =>
          router.replace("/scanner/loading")
        }
      />
    </Screen>
  );
}