import { ArrowRight, ChevronLeft, Lock, Mail, Phone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';
import { Image } from 'react-native';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-[#101922]">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">

                    {/* Back Button & Logo */}
                    <View className="flex-row items-center justify-between pt-6 pb-6">
                        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full bg-slate-800">
                            <ChevronLeft color="white" size={24} />
                        </TouchableOpacity>
                        <View className="flex-row items-center gap-2">
                            <View className="w-8 h-8 items-center justify-center rounded-lg bg-[#137fec]/20">
                                <Image source={require('../../assets/images/mainlogo.jpeg')} className="w-12 h-12 px-2  rounded-full" />
                            </View>
                            <Text className="text-lg font-bold text-white">Heartly</Text>
                        </View>
                        <View className="w-10" />
                    </View>

                    {/* Headline */}
                    <View className="pb-8">
                        <Text className="text-3xl font-bold text-white tracking-tight">
                            Create Account
                        </Text>
                        <Text className="mt-2 text-base text-slate-400">
                            Join your campus health community today.
                        </Text>
                    </View>

                    {/* Registration Form */}
                    <View className="gap-5">

                        {/* Full Name */}
                        <View className="gap-2">
                            <Text className="text-sm font-medium text-slate-300">Full Name</Text>
                            <View className="flex-row items-center h-14 px-4 bg-[#1c242d] border border-slate-700 rounded-xl">
                                <User color="#64748b" size={20} className="mr-3" />
                                <TextInput
                                    className="flex-1 text-white text-base"
                                    placeholder="Enter Full Name"
                                    placeholderTextColor="#94a3b8"
                                />
                            </View>
                        </View>

                        {/* University Email */}
                        <View className="gap-2">
                            <Text className="text-sm font-medium text-slate-300">University Email</Text>
                            <View className="flex-row items-center h-14 px-4 bg-[#1c242d] border border-slate-700 rounded-xl">
                                <Mail color="#64748b" size={20} className="mr-3" />
                                <TextInput
                                    className="flex-1 text-white text-base"
                                    placeholder="test@gmail.com"
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        {/* Phone Number */}
                        <View className="gap-2">
                            <Text className="text-sm font-medium text-slate-300">Phone Number</Text>
                            <View className="flex-row items-center h-14 px-4 bg-[#1c242d] border border-slate-700 rounded-xl">
                                <Phone color="#64748b" size={20} className="mr-3" />
                                <TextInput
                                    className="flex-1 text-white text-base"
                                    placeholder="+91 "
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                        {/* Password */}
                        <View className="gap-2">
                            <Text className="text-sm font-medium text-slate-300">Create Password</Text>
                            <View className="flex-row items-center h-14 px-4 bg-[#1c242d] border border-slate-700 rounded-xl">
                                <Lock color="#64748b" size={20} className="mr-3" />
                                <TextInput
                                    className="flex-1 text-white text-base"
                                    placeholder="••••••••"
                                    placeholderTextColor="#94a3b8"
                                    secureTextEntry={!showPassword}
                                />
                            </View>
                        </View>

                        {/* Terms of Service */}
                        <Text className="text-xs text-slate-500 leading-5">
                            By registering, you agree to our
                            <Text className="text-[#137fec]" onPress={() => router.push('/profile/legal?tab=terms')}> Terms of Service </Text>
                            and
                            <Text className="text-[#137fec]" onPress={() => router.push('/profile/legal?tab=privacy')}> Privacy Policy</Text>.
                        </Text>

                        {/* Register Button */}
                        <TouchableOpacity onPress={() => router.push('/(auth)/onboarding')} className="w-full h-14 bg-[#137fec] rounded-xl flex-row items-center justify-center gap-2 mt-2 shadow-lg shadow-blue-500/20">
                            <Text className="text-white font-bold text-base">Create Account</Text>
                            <ArrowRight color="white" size={20} />
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View className="mt-auto pt-10 pb-8 items-center">
                        <TouchableOpacity onPress={() => router.push('/(auth)/auth')}>
                            <Text className="text-sm text-slate-400">
                                Already have an account? <Text className="font-bold text-[#137fec]">Log In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}