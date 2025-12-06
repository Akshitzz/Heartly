import axios from "axios"
import * as SecureStore from "expo-secure-store"

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;
const api = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    },
    timeout:1000

});

api.interceptors.request.use(async(config)=>{
    const token = await SecureStore.getItemAsync("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`

    }
    return config;
})


export default api ;