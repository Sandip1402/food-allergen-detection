import { ReactNode } from "react";
import {
  ScrollView,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";


interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
}

export default function Screen({
  children,
  scroll = false,
  padded = false,
  style,
}: ScreenProps) {
  
  const { colors } = useTheme();

  if (scroll) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <ScrollView
          style={[{ flex: 1 }, style]}
          contentContainerStyle={{
            paddingHorizontal: padded ? 24 : 0,
            paddingBottom: 32,
          }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={[
          {
            flex: 1,
            paddingHorizontal: padded ? 24 : 0,
          },
          style,
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}