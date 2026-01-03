import { router } from 'expo-router';
import { ArrowRight, Eye, Lock, Mail, Siren } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [loginMethod, setLoginMethod] = useState('Email');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#101922]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">

          {/* Top Bar with Logo */}
          <View className="flex-row items-center justify-center pt-10 pb-12 gap-3">
            <View className="w-10 h-10 items-center justify-center rounded-xl bg-[#137fec]/20">
              <Image source={require('../../assets/images/mainlogo.jpeg')} className="w-12 h-12 px-2 rounded-full" />
            </View>
            <Text className="text-xl font-bold tracking-tight text-white">Heartly</Text>
          </View>

          {/* Headline & Subhead */}
          <View className="items-center pb-12">
            <Text className="text-[28px] font-bold leading-tight text-center text-white tracking-tight">
              Welcome Back
            </Text>
            <Text className="mt-2 text-base text-center text-slate-400">
              Your campus health companion
            </Text>
          </View>

          {/* Segmented Control (Tabs) */}
          {/* <View className="flex-row h-12 w-full items-center justify-center rounded-xl bg-[#283039] p-1 mb-6">
            <TouchableOpacity
              onPress={() => setLoginMethod('Email')}
              className={`flex-1 h-full items-center justify-center rounded-lg bg-[#101922]`}
            >
              <Text className={`font-medium text-[#137fec]`}>Email</Text>
            </TouchableOpacity> */}
          {/* <TouchableOpacity
              onPress={() => setLoginMethod('Phone')}
              className={`flex-1 h-full items-center justify-center rounded-lg ${loginMethod === 'Phone' ? 'bg-[#101922]' : ''}`}
            >
              <Text className={`font-medium text-[#137fec]`}>Phone / OTP</Text>
            </TouchableOpacity> */}
          {/* </View> */}

          {/* Login Form */}
          <View className="gap-5">
            {/* Email Input */}
            <View className="gap-2">
              <Text className="text-sm font-medium text-slate-300">Email Address</Text>
              <View className="relative flex-row items-center h-14 px-4 bg-[#1c242d] border border-slate-700 rounded-xl">
                <Mail color="#64748b" size={20} className="mr-3" />
                <TextInput
                  className="flex-1 text-white text-base"
                  placeholder="test@gmail.com"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="gap-2">
              <Text className="text-sm font-medium text-slate-300">Password</Text>
              <View className="relative flex-row items-center h-14 px-4 bg-[#1c242d] border border-slate-700 rounded-xl">
                <Lock color="#64748b" size={20} className="mr-3" />
                <TextInput
                  className="flex-1 text-white text-base"
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Eye color="#64748b" size={20} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="items-end">
              <Text className="text-sm font-medium text-[#137fec]">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Primary Action Button */}
            <TouchableOpacity
              onPress={() => router.push('/(tabs)')}
              className="w-full h-14 bg-[#137fec] rounded-xl flex-row items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
              <Text className="text-white font-bold text-base">Log In</Text>
              <ArrowRight color="white" size={20} />
            </TouchableOpacity>
          </View>

          {/* Biometric */}
          {/* <View className="mt-8 flex-col items-center gap-6">
            <View className="flex-row items-center w-full">
              <View className="flex-1 h-[1px] bg-slate-800" />
              <Text className="px-4 text-[10px] font-bold text-slate-500 uppercase">Or login with</Text>
              <View className="flex-1 h-[1px] bg-slate-800" />
            </View>

            <TouchableOpacity className="items-center gap-2">
              <View className="h-16 w-16 rounded-2xl bg-[#283039] items-center justify-center border border-slate-700">
                <ScanFace color="white" size={32} />
              </View>
              <Text className="text-xs font-medium text-slate-400">Face ID</Text>
            </TouchableOpacity>
          </View> */}

          {/* Bottom Actions */}
          <View className="mt-auto pt-10 pb-6 items-center gap-4">
            <TouchableOpacity>
              <Text className="text-sm text-slate-400">
                Don't have an account? <Text onPress={() => router.push('/(auth)/register')} className="font-bold text-[#137fec]">Register</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10">
              <Siren color="#ef4444" size={18} />
              <Text className="text-sm font-bold text-red-500">Emergency? Call Campus Security</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}