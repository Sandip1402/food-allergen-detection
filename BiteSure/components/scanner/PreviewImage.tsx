import { Image, View } from "react-native";
import { useState } from "react";
import ScanOverlay from "@/components/scanner/ScanOverlay";


interface PreviewImageProps {
  imageUri: string;
  isAnalyzing: boolean;
  statusMessage: string;
}

export default function PreviewImage({
  imageUri,
  isAnalyzing,
  statusMessage,
}: PreviewImageProps) {

  const [imageHeight, setImageHeight] = useState(0);

  return (
    <View className="mx-5 mt-6 rounded-3xl bg-card p-4 shadow-lg"
      onLayout={(e) =>
        setImageHeight(e.nativeEvent.layout.height)
      }
      style={{
        overflow: "hidden",
        borderRadius: 24,
      }}
    >

      <Image
        source={{ uri: imageUri }}
        resizeMode="contain"
        className="w-full rounded-2xl"
        style={{
          aspectRatio: 3 / 4,
        }}
      />

      <ScanOverlay
        visible={isAnalyzing}
        message={statusMessage}
        height={imageHeight}
      />
    </View>
  );
}