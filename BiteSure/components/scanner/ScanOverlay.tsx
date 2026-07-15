import { View, Text } from "react-native";
import { ScanSearch } from "lucide-react-native";
import { useTheme } from "@/hooks/useTheme";
import AnimatedScanLine from "@/components/scanner/AnimatedScanLine";
import { useEffect } from "react";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

interface ScanOverlayProps {
    height: number;
    visible: boolean;
    message?: string;
}

export default function ScanOverlay({
    height,
    visible,
    message = "Detecting ingredients...",
}: ScanOverlayProps) {

    const { colors, typography, spacing } = useTheme();
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    
    useEffect(() => {
        if (visible) {
            scale.value = withRepeat(
                withTiming(1.08, {
                    duration: 900,
                }),
                -1,
                true
            );
        } else {
            scale.value = withTiming(1);
        }
    }, [visible]);
    
    if (!visible) return null;
    
    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,

                backgroundColor: "rgba(15,23,42,0.55)",

                justifyContent: "center",
                alignItems: "center",

                borderRadius: 24,
            }}
        >
            <AnimatedScanLine active={visible} height={height} />

            <Animated.View style={animatedStyle}>
                <ScanSearch
                    size={44}
                    color={colors.buttonPrimaryText}
                />
            </Animated.View>
            <Text
                style={{
                    color: colors.buttonPrimaryText,
                    marginTop: spacing.lg,
                    fontWeight: typography.weight.bold,
                    fontSize: typography.size.subheading,
                }}
            >
                Analyzing...
            </Text>

            <Text
                style={{
                    color: colors.buttonPrimaryText,
                    marginTop: spacing.sm,
                    fontSize: typography.size.body,
                    opacity: 0.9,
                }}
            >
                {message}
            </Text>
        </View>
    );
}