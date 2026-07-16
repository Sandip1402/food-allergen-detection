import { Pressable, Text, View } from "react-native";

type ModeToggleProps = {
  mode: "food" | "ingredient";
  onChange: (mode: "food" | "ingredient") => void;
};

export default function ModeToggle({
  mode,
  onChange,
}: ModeToggleProps) {
  return (
    <View className="mx-5 mt-5">
      <Text className="mb-3 text-base font-semibold text-foreground">
        Analyze As
      </Text>

      <View className="flex-row rounded-2xl bg-card p-1">

        <Pressable
          onPress={() => onChange("food")}
          className={`flex-1 items-center rounded-xl py-3 ${
            mode === "food"
              ? "bg-primary"
              : "bg-transparent"
          }`}
        >
          <Text
            className={`font-semibold ${
              mode === "food"
                ? "text-sky-500"
                : "bg-transparent"
            }`}
          >
            🍔 Food
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onChange("ingredient")}
          className={`ml-1 flex-1 items-center rounded-xl py-3 ${
            mode === "ingredient"
              ? "bg-primary"
              : "bg-transparent"
          }`}
        >
          <Text
            className={`font-semibold ${
              mode === "ingredient"
                ? "text-sky-500"
                : "text-foreground"
            }`}
          >
            🧾 Ingredients
          </Text>
        </Pressable>

      </View>
    </View>
  );
}