import { View, Text } from "react-native";

export default function SummaryCard() {
  return (
    <View className="mx-6 mt-8 rounded-3xl bg-white p-5">

      <Text className="text-lg font-semibold text-slate-800">
        Today's Summary
      </Text>

      <View className="flex-row justify-between mt-5">

        <View className="items-center flex-1">
          <Text className="text-3xl font-bold text-blue-600">
            24
          </Text>

          <Text className="text-slate-500 mt-1">
            Scans
          </Text>
        </View>

        <View className="items-center flex-1">
          <Text className="text-3xl font-bold text-green-600">
            20
          </Text>

          <Text className="text-slate-500 mt-1">
            Safe
          </Text>
        </View>

        <View className="items-center flex-1">
          <Text className="text-3xl font-bold text-red-500">
            4
          </Text>

          <Text className="text-slate-500 mt-1">
            Unsafe
          </Text>
        </View>

      </View>

    </View>
  );
}