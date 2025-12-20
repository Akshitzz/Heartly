import { useRouter } from 'expo-router';
import {
    Accessibility,
    Ambulance,
    ArrowLeft,
    ChevronRight,
    DoorOpen,
    Frown,
    Hospital,
    MapPin,
    Maximize2,
    PencilLine,
    PlusCircle,
    ShieldAlert,
    TriangleAlert,
    Wind,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EMERGENCY_TYPES = [
    { id: 'injury', label: 'Injury', icon: Accessibility },
    { id: 'unconscious', label: 'Unconscious', icon: Frown },
    { id: 'breathing', label: 'Breathing', icon: Wind },
    { id: 'other', label: 'Other', icon: PlusCircle },
];

export default function EmergencyBookingScreen() {
    const [selectedType, setSelectedType] = useState('injury');
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#101922]">
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View className="flex-row items-center px-4 py-3 justify-between bg-[#101922]">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="size-10 items-center justify-center rounded-full bg-white/5"
                >
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold">Emergency Request</Text>
                <View className="size-10" />
            </View>

            <ScrollView
                className="flex-1 px-4"
                contentContainerStyle={{ paddingBottom: 160 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Critical Alert Banner */}
                <View className="mt-4 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex-row items-start overflow-hidden">
                    <View className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                    <TriangleAlert color="#ef4444" size={24} fill="#ef444433" />
                    <View className="flex-1 ml-3">
                        <Text className="text-red-400 font-bold text-sm mb-1">Medical Emergency?</Text>
                        <Text className="text-red-400/80 text-xs leading-5">
                            For life-threatening situations, call 911 immediately.
                        </Text>
                    </View>
                    <TouchableOpacity className="bg-red-600 px-3 py-2 rounded-lg ml-2">
                        <Text className="text-white text-xs font-bold">Call 911</Text>
                    </TouchableOpacity>
                </View>

                {/* Location Section */}
                <View className="mt-6">
                    <View className="flex-row justify-between items-end mb-3">
                        <Text className="text-sm font-medium text-slate-400 ml-1">Where are you?</Text>
                        <TouchableOpacity>
                            <Text className="text-xs text-[#137fec] font-medium">Use current location</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Map Preview */}
                    <View className="relative w-full aspect-[2.2/1] bg-slate-800 rounded-3xl overflow-hidden border border-white/5">
                        <ImageBackground
                            source={{ uri: 'https://placeholder.pics/svg/300' }}
                            className="w-full h-full items-center justify-center"
                            imageStyle={{ opacity: 0.4 }}
                        >
                            <View className="items-center">
                                <MapPin color="#137fec" size={40} fill="#137fec" />
                                <View className="w-4 h-1 bg-black/40 rounded-full mt-[-4px] blur-sm" />
                            </View>
                        </ImageBackground>
                        <TouchableOpacity className="absolute bottom-3 right-3 size-9 bg-[#1c2127] rounded-full items-center justify-center shadow-lg">
                            <Maximize2 color="white" size={18} />
                        </TouchableOpacity>
                    </View>

                    {/* Address Input */}
                    <View className="flex-row items-center mt-3 rounded-2xl bg-[#1c2127] border border-white/10 px-4 py-1">
                        <DoorOpen color="#94a3b8" size={20} />
                        <TextInput
                            className="flex-1 text-white text-base py-4 px-3 font-medium"
                            placeholder="Enter room or building number"
                            placeholderTextColor="#64748b"
                            value="Dorm A, Room 302"
                        />
                        <TouchableOpacity>
                            <PencilLine color="#137fec" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Nature of Emergency */}
                <View className="mt-6">
                    <Text className="text-sm font-medium text-slate-400 ml-1 mb-3">What happened?</Text>
                    <View className="flex-row flex-wrap gap-2">
                        {EMERGENCY_TYPES.map((type) => {
                            const isActive = selectedType === type.id;
                            return (
                                <TouchableOpacity
                                    key={type.id}
                                    onPress={() => setSelectedType(type.id)}
                                    className={`flex-row items-center px-4 h-11 rounded-xl gap-2 ${isActive ? 'bg-[#137fec]' : 'bg-[#283039]'
                                        }`}
                                >
                                    <type.icon color={isActive ? 'white' : '#94a3b8'} size={18} />
                                    <Text className={`text-sm font-medium ${isActive ? 'text-white' : 'text-slate-300'}`}>
                                        {type.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Details Input */}
                <View className="mt-6">
                    <Text className="text-sm font-medium text-slate-400 ml-1 mb-3">Additional Details (Optional)</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        className="w-full bg-[#1c2127] border border-white/10 rounded-2xl p-4 text-white text-base h-24"
                        placeholder="Briefly describe the situation..."
                        placeholderTextColor="#64748b"
                        textAlignVertical="top"
                    />
                </View>

                {/* Quick Contacts */}
                <View className="flex-row gap-3 mt-6">
                    <TouchableOpacity className="flex-1 flex-col items-center justify-center p-4 rounded-2xl bg-[#283039]/50 border border-dashed border-white/10">
                        <ShieldAlert color="#137fec" size={24} className="mb-1" />
                        <Text className="text-xs font-medium text-slate-400">Campus Security</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 flex-col items-center justify-center p-4 rounded-2xl bg-[#283039]/50 border border-dashed border-white/10">
                        <Hospital color="#ef4444" size={24} className="mb-1" />
                        <Text className="text-xs font-medium text-slate-400">Health Center</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Sticky Bottom Action */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#101922] border-t border-white/10 shadow-2xl">
                <TouchableOpacity
                    className="w-full bg-[#137fec] rounded-2xl p-4 flex-row items-center shadow-lg shadow-[#137fec]/40"
                    activeOpacity={0.9}
                    onPress={() => router.push('/emergency/tracking')}
                >
                    {/* Static representation of the pulse animation */}
                    <View className="size-10 bg-white/20 rounded-full items-center justify-center mr-3">
                        <Ambulance color="white" size={24} />
                    </View>
                    <View className="flex-1">
                        <Text className="text-white text-lg font-bold">Request Ambulance</Text>
                        <Text className="text-blue-100/70 text-xs">Send current location details</Text>
                    </View>
                    <ChevronRight color="white" size={24} opacity={0.6} />
                </TouchableOpacity>

                <View className="items-center mt-3">
                    <Text className="text-xs text-slate-500 font-medium">
                        Estimated arrival: <Text className="text-[#137fec] font-bold">5-8 mins</Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
