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

      <View className="flex gap-2">
        <TouchableOpacity
        className="bg-[#ff4d6d] p-4 rounded-lg items-center"
        onPress={handleLogin}>
        <Text className="text-white">Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-[#ff4d6d] pb-2 rounded-lg items-center"
        onPress={()=>router.push("/register")}>
          <Text className="text-center text-gray-300 mt-2">
            Don't have an account? {" "}
        <Text className="text-white">Register</Text>
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
