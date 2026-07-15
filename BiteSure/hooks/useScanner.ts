import { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import { useAnalysisStore } from "@/store/analysisStore";

export default function useScanner() {
    const cameraRef = useRef<CameraView>(null);

    const [permission, requestPermission] = useCameraPermissions();

    const [flash, setFlash] = useState<"off" | "on">("off");

    const setImage = useAnalysisStore((state) => state.setImage);

    const toggleFlash = () => {
        setFlash((prev) => (prev === "off" ? "on" : "off"));
    };

    const takePhoto = async () => {
        if (!cameraRef.current) return;

        const photo = await cameraRef.current.takePictureAsync({
            quality: 0.9,
            skipProcessing: false,
        });

        if (!photo?.uri) return;

        setImage(photo.uri);

        router.push("/scanner/preview");
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 0.9,
        });

        if (result.canceled) return;

        const uri = result.assets[0]?.uri;

        if (!uri) return;

        setImage(uri);

        router.push("/scanner/preview");
    };

    return {
        permission,
        requestPermission,

        cameraRef,

        flash,
        toggleFlash,

        takePhoto,
        pickImage,
    };
}