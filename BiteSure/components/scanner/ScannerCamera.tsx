import { CameraView } from "expo-camera";
import { View, StyleSheet } from "react-native";

import CameraOverlay from "./CameraOverlay";
import CaptureButton from "./CaptureButton";
import FlashButton from "./FlashButton";
import GalleryButton from "./GalleryButton";
import TopBar from "./TopBar";
import useScanner from "@/hooks/useScanner";

type ScannerCameraProps = Pick<
  ReturnType<typeof useScanner>,
  "cameraRef" | "flash" | "toggleFlash" | "takePhoto" | "pickImage"
>;

export default function ScannerCamera(
    {
        cameraRef,

        flash,
        toggleFlash,

        takePhoto,
        pickImage
    }: ScannerCameraProps
) {

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                facing="back"
                flash={flash}
            />

            <CameraOverlay />

            <TopBar title="Scan Ingredients" />

            <View style={styles.bottomBar}>
                <GalleryButton onPress={pickImage} />

                <CaptureButton onPress={takePhoto} />

                <FlashButton
                    flash={flash}
                    onPress={toggleFlash}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    bottomBar: {
        position: "absolute",

        left: 0,
        right: 0,
        bottom: 48,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
});