import { useEffect } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";

export default function SplashScreen() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/(auth)/auth");
    }, 2000);
  }, []);
  return (
    <View className="flex-1 bg-black items-center justify-center gap-1">
      <Text className="text-[32px] font-bold text-white">❤️ Heartly</Text>
      <Text className="text-2xl font-medium text-white">
        Your health is more important to us
      </Text>
    </View>
  );
}