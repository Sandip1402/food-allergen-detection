import PermissionView from "@/components/scanner/PermissionView";
import ScannerCamera from "@/components/scanner/ScannerCamera";

import useScanner from "@/hooks/useScanner";

export default function ScannerScreen() {
  const {
    permission,
    requestPermission,
  } = useScanner();

  const scanner = useScanner();

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <PermissionView
        onGrantPermission={requestPermission}
      />
    );
  }

  return <ScannerCamera
            cameraRef={scanner.cameraRef}
            flash={scanner.flash}
            toggleFlash={scanner.toggleFlash}
            takePhoto={scanner.takePhoto}
            pickImage={scanner.pickImage}
        />;
}