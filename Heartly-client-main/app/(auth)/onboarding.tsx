import { router } from 'expo-router';
import { ArrowLeft, Camera, ChevronRight, Contact, Heart, Lock, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileSetupScreen() {
    const [step, setStep] = useState(1);

    // Step 1 State
    const [gender, setGender] = useState('female');

    // Step 2 State
    const [bloodType, setBloodType] = useState('A+');

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        else router.replace('/(tabs)');
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
        else router.back();
    };

    const renderStep1 = () => (
        <View className="gap-5 pb-40">
            {/* Name Input */}
            <View className="gap-1.5">
                <Text className="text-sm font-medium text-gray-300">Full Name</Text>
                <View className="flex-row items-center h-14 px-4 bg-[#1b2633] border border-gray-700 rounded-xl">
                    <TextInput
                        className="flex-1 text-white text-base"
                        placeholder="e.g. Sarah Jenkins"
                        placeholderTextColor="#4b5563"
                    />
                </View>
            </View>

            {/* Student ID & DOB Row */}
            <View className="flex-row gap-4">
                <View className="flex-1 gap-1.5">
                    <Text className="text-sm font-medium text-gray-300">Student ID</Text>
                    <TextInput
                        className="h-14 px-4 bg-[#1b2633] border border-gray-700 rounded-xl text-white"
                        placeholder="12345678"
                        placeholderTextColor="#4b5563"
                        keyboardType="number-pad"
                    />
                </View>
                <View className="flex-1 gap-1.5">
                    <Text className="text-sm font-medium text-gray-300">Date of Birth</Text>
                    <View className="h-14 px-4 bg-[#1b2633] border border-gray-700 rounded-xl justify-center">
                        <Text className="text-gray-500">MM/DD/YYYY</Text>
                    </View>
                </View>
            </View>

            {/* Gender Selection */}
            <View className="gap-2">
                <Text className="text-sm font-medium text-gray-300">Gender</Text>
                <View className="flex-row gap-3">
                    {['Female', 'Male', 'Other'].map((item: string) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setGender(item.toLowerCase())}
                            className={`flex-1 items-center justify-center rounded-xl border py-3.5 ${gender === item.toLowerCase()
                                ? 'border-[#137fec] bg-[#137fec]/10'
                                : 'border-gray-700 bg-[#1b2633]'
                                }`}
                        >
                            <Text className={`text-sm font-medium ${gender === item.toLowerCase() ? 'text-[#137fec]' : 'text-gray-300'
                                }`}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Phone Input */}
            <View className="gap-1.5">
                <Text className="text-sm font-medium text-gray-300">Phone Number</Text>
                <View className="flex-row items-center h-14 px-4 bg-[#1b2633] border border-gray-700 rounded-xl">
                    <Text className="text-gray-500 mr-2">+1</Text>
                    <TextInput
                        className="flex-1 text-white text-base"
                        placeholder="(555) 123-4567"
                        placeholderTextColor="#4b5563"
                        keyboardType="phone-pad"
                    />
                </View>
            </View>
        </View>
    );

    const renderStep2 = () => (
        <View className="gap-5 pb-40">
            {/* Weight & Height Row */}
            <View className="flex-row gap-4">
                <View className="flex-1 gap-1.5">
                    <Text className="text-sm font-medium text-gray-300">Weight (kg)</Text>
                    <TextInput
                        className="h-14 px-4 bg-[#1b2633] border border-gray-700 rounded-xl text-white"
                        placeholder="65"
                        placeholderTextColor="#4b5563"
                        keyboardType="numeric"
                    />
                </View>
                <View className="flex-1 gap-1.5">
                    <Text className="text-sm font-medium text-gray-300">Height (cm)</Text>
                    <TextInput
                        className="h-14 px-4 bg-[#1b2633] border border-gray-700 rounded-xl text-white"
                        placeholder="170"
                        placeholderTextColor="#4b5563"
                        keyboardType="numeric"
                    />
                </View>
            </View>

            {/* Blood Type */}
            <View className="gap-2">
                <Text className="text-sm font-medium text-gray-300">Blood Type</Text>
                <View className="flex-row flex-wrap gap-3">
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type: string) => (
                        <TouchableOpacity
                            key={type}
                            onPress={() => setBloodType(type)}
                            className={`w-[22%] items-center justify-center rounded-xl border py-3 ${bloodType === type
                                ? 'border-[#137fec] bg-[#137fec]/10'
                                : 'border-gray-700 bg-[#1b2633]'
                                }`}
                        >
                            <Text className={`text-sm font-medium ${bloodType === type ? 'text-[#137fec]' : 'text-gray-300'
                                }`}>
                                {type}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Allergies / Medical Conditions */}
            <View className="gap-1.5">
                <Text className="text-sm font-medium text-gray-300">Allergies & Conditions</Text>
                <View className="flex-row items-start h-32 p-4 bg-[#1b2633] border border-gray-700 rounded-xl">
                    <TextInput
                        className="flex-1 text-white text-base leading-5"
                        placeholder="List any allergies (e.g. Peanuts, Penicillin) or chronic conditions..."
                        placeholderTextColor="#4b5563"
                        multiline
                        textAlignVertical="top"
                    />
                </View>
            </View>
        </View>
    );

    const renderStep3 = () => (
        <View className="gap-5 pb-40">
            <View className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-2">
                <Text className="text-red-400 text-sm">
                    This contact will be notified in case of an emergency triggering the SOS alert.
                </Text>
            </View>

            {/* Contact Name */}
            <View className="gap-1.5">
                <Text className="text-sm font-medium text-gray-300">Contact Name</Text>
                <View className="flex-row items-center h-14 px-4 bg-[#1b2633] border border-gray-700 rounded-xl">
                    <User color="#64748b" size={20} className="mr-3" />
                    <TextInput
                        className="flex-1 text-white text-base"
                        placeholder="e.g. John Doe (Father)"
                        placeholderTextColor="#4b5563"
                    />
                </View>
            </View>

            {/* Relationship */}
            <View className="gap-1.5">
                <Text className="text-sm font-medium text-gray-300">Relationship</Text>
                <View className="flex-row items-center h-14 px-4 bg-[#1b2633] border border-gray-700 rounded-xl">
                    <Heart color="#64748b" size={20} className="mr-3" />
                    <TextInput
                        className="flex-1 text-white text-base"
                        placeholder="e.g. Parent, Sibling, Spouse"
                        placeholderTextColor="#4b5563"
                    />
                </View>
            </View>

            {/* Phone Number */}
            <View className="gap-1.5">
                <Text className="text-sm font-medium text-gray-300">Emergency Phone</Text>
                <View className="flex-row items-center h-14 px-4 bg-[#1b2633] border border-gray-700 rounded-xl">
                    <Contact color="#64748b" size={20} className="mr-3" />
                    <Text className="text-gray-500 mr-2">+1</Text>
                    <TextInput
                        className="flex-1 text-white text-base"
                        placeholder="(555) 999-9999"
                        placeholderTextColor="#4b5563"
                        keyboardType="phone-pad"
                    />
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-[#101922]">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/5">
                <TouchableOpacity onPress={prevStep} className="size-12 items-center justify-center rounded-full hover:bg-white/10">
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold flex-1 text-center pr-12">
                    {step === 1 ? 'Profile Setup' : step === 2 ? 'Health Stats' : 'Emergency Contact'}
                </Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">

                    {/* Progress Indicators */}
                    <View className="flex-row items-center justify-center gap-2 py-6">
                        <View className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-[#137fec]' : 'bg-[#3b4754]'}`} />
                        <View className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-[#137fec]' : 'bg-[#3b4754]'}`} />
                        <View className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-[#137fec]' : 'bg-[#3b4754]'}`} />
                    </View>

                    {/* Headline */}
                    <View className="mb-8">
                        <Text className="text-white text-[32px] font-bold leading-tight">
                            {step === 1 ? "Let's get you set up" : step === 2 ? "Your Health Profile" : "In Case of Emergency"}
                        </Text>
                        <Text className="text-[#9dabb9] text-sm mt-2 font-normal">
                            {step === 1
                                ? "Help us tailor your healthcare experience. Your data is encrypted and private."
                                : step === 2
                                    ? "This helps our AI provide better health insights for you."
                                    : "We need this to ensure your safety during critical situations."}
                        </Text>
                    </View>

                    {/* Step Content */}
                    {step === 1 && (
                        <View className="items-center justify-center mb-8">
                            <View className="relative">
                                <View className="h-32 w-32 rounded-full border-4 border-[#1b2633] bg-[#1c242d] items-center justify-center overflow-hidden">
                                    <User color="#3b4754" size={60} />
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    className="absolute bottom-0 right-0 bg-[#137fec] rounded-full p-2 border-[3px] border-[#101922] shadow-md"
                                >
                                    <Camera color="white" size={20} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity>
                                <Text className="mt-3 text-[#137fec] font-medium text-sm">Upload Photo</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}

                </ScrollView>
            </KeyboardAvoidingView>

            {/* Sticky Footer */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#101922]/95 border-t border-white/5">
                <View className="flex-row items-center justify-center gap-1.5 mb-4 opacity-70">
                    <Lock color="#22c55e" size={14} />
                    <Text className="text-xs text-gray-400">Your health data is secure & encrypted</Text>
                </View>

                <View className="gap-3">
                    <TouchableOpacity
                        onPress={nextStep}
                        activeOpacity={0.8}
                        className="w-full rounded-xl bg-[#137fec] px-4 py-4 shadow-lg shadow-blue-500/20 flex-row items-center justify-center gap-2"
                    >
                        <Text className="text-base font-bold text-white text-center">
                            {step === 3 ? 'Complete Setup' : 'Next Step'}
                        </Text>
                        <ChevronRight color="white" size={20} />
                    </TouchableOpacity>

                    {step === 1 && (
                        <TouchableOpacity className="w-full py-2">
                            <Text className="text-center text-sm font-medium text-gray-400">Skip for now</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}