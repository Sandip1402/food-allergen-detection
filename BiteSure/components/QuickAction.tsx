import { Pressable, Text, View } from "react-native";

interface Props {
  icon: React.ReactNode;
  title: string;
}

export default function QuickAction({
  icon,
  title,
}: Props) {
  return (
    <Pressable
      className="bg-white rounded-2xl p-5 items-center justify-center flex-1 mx-2 shadow-sm"
    >
      <View className="w-16 h-16 rounded-full bg-blue-50 items-center justify-center">
          {icon}
      </View>

      <Text className="mt-3 font-medium text-slate-700">
        {title}
      </Text>
    </Pressable>
  );
}