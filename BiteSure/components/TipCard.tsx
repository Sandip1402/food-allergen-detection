import { View, Text } from "react-native";

export default function TipCard() {
  return (
    <View className="mx-6 mt-8 rounded-3xl bg-cyan-50 p-5">

      <Text className="text-cyan-700 font-semibold">
        Today's Tip
      </Text>

      <Text className="mt-2 text-slate-600 leading-6">
        Some products labelled as "Dairy Free" may still
        be manufactured in facilities handling milk.
        Always check the allergen warning.
      </Text>

    </View>
  );
}