import { Pressable, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import { useTheme } from "@/hooks/useTheme";

interface CaptureButtonProps {
    onPress: () => void;
    disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const OUTER_SIZE = 84;
const INNER_SIZE = 62;
const BORDER_WIDTH = 5;

export default function CaptureButton({
    onPress,
    disabled = false,
}: CaptureButtonProps) {
    const { colors } = useTheme();

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
            disabled={disabled}
            onPressIn={() => {
                scale.value = withSpring(0.9);
            }}
            onPressOut={() => {
                scale.value = withSpring(1);
            }}
            onPress={onPress}
            style={animatedStyle}
        >
            <View
                style={{
                    width: OUTER_SIZE,
                    height: OUTER_SIZE,
                    borderRadius: 42,

                    borderWidth: BORDER_WIDTH,
                    borderColor: colors.primary,

                    justifyContent: "center",
                    alignItems: "center",

                    backgroundColor: "transparent",
                }}
            >
                <View
                    style={{
                        width: INNER_SIZE,
                        height: INNER_SIZE,
                        borderRadius: 31,

                        backgroundColor: "#FFFFFF",
                    }}
                />
            </View>
        </AnimatedPressable>
    );
}