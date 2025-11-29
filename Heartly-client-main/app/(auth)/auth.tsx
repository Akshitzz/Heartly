import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const handleLogin = () => {
    // ✅ later you'll add real auth here
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 p-5 justify-center">
      <Text className="text-2xl font-bold mb-8 text-white">Login to Heartly</Text>
      {/*  handle form data */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#fff"
        className="border border-white p-3 mb-4 rounded-lg text-white"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#fff"
        className="border border-white p-3 mb-4 rounded-lg text-white"
      />

      <TouchableOpacity
        className="bg-[#ff4d6d] p-4 rounded-lg items-center"
        onPress={handleLogin}>
        <Text className="text-white">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
