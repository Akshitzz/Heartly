import api from "@/lib/api";
import { router } from "expo-router";
import { useState } from "react"
import { View ,Text, TextInput,Alert, TouchableOpacity} from "react-native"
import * as SecureStore from "expo-secure-store"

export default function Register(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phoneno,setPhoneNo]=useState("");
    const [Password,setPassword]=useState("");
    const [loading,setLoading] = useState(false);

const handleRegister=async()=>{
if(!name || !email || !phoneno || Password ){
    Alert.alert("Error","All fields are required");
    return;
}
    try{
        setLoading(true);
        const res = await api.post("/auth/register",{
            name,email,phoneno,Password
        })
       await SecureStore.setItemAsync("token", res.data.token);

    router.replace("/(tabs)");
    }catch(err:any){
             console.log("Register Error:", err.response?.data || err.message);
             Alert.alert(
      "Registration Failed",
      err.response?.data?.message || "Something went wrong"
             );
    }finally{
            setLoading(false);
    }
}

return (
        <View className="flex-1 p-5 justify-center bg-black">
            <Text className="text-2xl font-bold mb-8 text-white">Create a Hearlty Account</Text>
            <TextInput
            placeholder="Full name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#fff"
            className="border border-white  p-3 mb-4 rounded-lg text-white"
            >
            </TextInput>
            <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#fff"
            className="border border-white  p-3 mb-4 rounded-lg text-white"
            >
                </TextInput>
            <TextInput
            placeholder="Phone"
            value={phoneno}
            onChangeText={setPhoneNo}
            placeholderTextColor="#fff"
            className="border border-white  p-3 mb-4 rounded-lg text-white"
            >
                </TextInput>
            <TextInput
            placeholder="Password"
            value={Password}
            onChangeText={setPassword}
            placeholderTextColor="#fff"
            className="border border-white  p-3 mb-4 rounded-lg text-white"
            >
            </TextInput>
                    
                    <Text className="text-white text-lg">
          {loading ? "Creating..." : "Register"}
        </Text>

            <TouchableOpacity onPress={()=>router.push("/auth")}>
                <Text className="text-center text-gray-300 mt-6">Already have an account ?{" "}
                    <Text className="text-[#ff4d6d] font-bold">Login</Text>
                </Text>
            </TouchableOpacity>

        </View>
)

}