import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ScanCard() {
  return (
    <Pressable
      className="mx-6 mt-8 rounded-3xl bg-blue-600 p-6 active:opacity-90"
    >
      <View className="flex-row items-center justify-between">

        <View className="flex-1">

          <Text className="text-white text-2xl font-bold">
            Scan Ingredients
          </Text>

          <Text className="text-blue-100 mt-2">
            Capture a food label and instantly detect allergens.
          </Text>

        </View>

        <MaterialCommunityIcons
          name="line-scan"
          size={70}
          color="white"
        />

      </View>
    </Pressable>
  );
}