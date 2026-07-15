import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { Pressable, Text, View} from "react-native";
import { useTheme } from "@/hooks/useTheme";

const tabs = [
  {
    route: "index",
    title: "Home",
    icon: "home-outline",
    active: "home",
  },
  {
    route: "history",
    title: "History",
    icon: "history",
    active: "history",
  },
  {
    route: "profile",
    title: "You",
    icon: "account-outline",
    active: "account",
  },
  {
    route: "settings",
    title: "Settings",
    icon: "cog-outline",
    active: "cog",
  },
] as const;

export default function CustomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {

  const { colors } = useTheme();

  return (
    <View
      style={{
        height: 88,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}
    >
      {/* Floating Scan Button */}
      <Pressable
        onPress={() => router.push("/scanner")}
        style={{
          position: "absolute",
          alignSelf: "center",
          top: -28,

          width: 64,
          height: 64,

          borderRadius: 32,

          backgroundColor: colors.primary,

          justifyContent: "center",
          alignItems: "center",

          shadowColor: "#000",
          shadowOpacity: 0.18,
          shadowRadius: 10,
          shadowOffset: {
            width: 0,
            height: 5,
          },

          elevation: 8,
        }}
      >
        <MaterialCommunityIcons
          name="line-scan"
          size={30}
          color="white"
        />
      </Pressable>

      <View
        style={{
          flexDirection: "row",
          height: "100%",
          alignItems: "center",
        }}
      >
        {tabs.map((tab, index) => {
          const focused = state.index === index;

          // Leave center gap
          const leftSide = index < 2;

          return (
            <View
              key={tab.route}
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={() => navigation.navigate(tab.route)}
                style={{
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={
                    focused
                      ? (tab.active as any)
                      : (tab.icon as any)
                  }
                  size={24}
                  color={
                    focused
                      ? colors.primary
                      : colors.icon
                  }
                />

                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 11,
                    color: focused
                      ? colors.primary
                      : colors.icon,
                  }}
                >
                  {tab.title}
                </Text>
              </Pressable>

              {leftSide && (
                <View
                  style={{
                    width: 64,
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}