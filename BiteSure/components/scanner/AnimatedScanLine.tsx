import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    cancelAnimation,
    Easing,
} from "react-native-reanimated";

interface AnimatedScanLineProps {
    active: boolean;
    height: number;
}

export default function AnimatedScanLine({
    height,
    active,
}: AnimatedScanLineProps) {
    const translateY = useSharedValue(-40);

    useEffect(() => {
        if (active) {
            translateY.value = withRepeat(
                withTiming(height - 3, {
                    duration: 2200,
                    easing: Easing.linear,
                }),
                -1,
                false
            );
        } else {
            cancelAnimation(translateY);
            translateY.value = -40;
        }
    }, [active, height]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View
            pointerEvents="none"
            style={[styles.scanLine, animatedStyle]}
        />
    );
}

const styles = StyleSheet.create({
    scanLine: {
        position: "absolute",
        left: 0,
        right: 0,
        height: 3,

        backgroundColor: "#3B82F6",

        shadowColor: "#3B82F6",
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 8,
    },
});