import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    CalendarClock,
    CreditCard,
    FileText,
    Info,
    MapPin,
    ShieldCheck,
    Star
} from 'lucide-react-native';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BookingConfirmationScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#101922]">
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View className="flex-row items-center px-4 py-3 justify-between bg-[#101922] border-b border-white/5">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="size-10 items-center justify-center rounded-full bg-white/5"
                >
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold">Review Booking</Text>
                <View className="size-10" />
            </View>

            <ScrollView
                className="flex-1 px-4"
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 160 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Progress Indicator */}
                <View className="flex-row justify-center items-center gap-2 mb-6">
                    <View className="h-1 w-8 bg-[#137fec] rounded-full" />
                    <View className="h-1 w-8 bg-[#137fec] rounded-full" />
                    <View className="h-1 w-8 bg-[#137fec]/30 rounded-full" />
                </View>

                {/* Doctor Summary Card */}
                <View className="flex-row items-center bg-[#1c2127] rounded-2xl p-4 border border-white/5 shadow-sm mb-5">
                    <View className="relative">
                        <View className="size-16 rounded-full bg-slate-700 border-2 border-[#137fec]/10 overflow-hidden">
                            {/* Replace with actual source={{uri: '...'}} */}
                            <View className="flex-1 items-center justify-center bg-slate-600">
                                <Text className="text-white text-xs">SJ</Text>
                            </View>
                        </View>
                        <View className="absolute bottom-0 right-0 size-4 bg-green-500 border-2 border-[#1c2127] rounded-full" />
                    </View>

                    <View className="flex-1 ml-4">
                        <Text className="text-white font-bold text-lg leading-tight">Dr. Sarah Jenkins</Text>
                        <Text className="text-slate-400 text-sm">General Practitioner</Text>
                        <View className="flex-row items-center gap-1 mt-1">
                            <Star size={12} color="#facc15" fill="#facc15" />
                            <Text className="text-slate-400 text-xs font-medium">4.9 (124 reviews)</Text>
                        </View>
                    </View>

                    <TouchableOpacity className="size-8 items-center justify-center rounded-full bg-white/5">
                        <Info color="#137fec" size={18} />
                    </TouchableOpacity>
                </View>

                {/* Appointment Details */}
                <View className="space-y-3 mb-5">
                    <Text className="text-slate-400 text-sm font-bold px-1 opacity-90 uppercase tracking-wider">Appointment Details</Text>
                    <View className="bg-[#1c2127] rounded-2xl border border-white/5 overflow-hidden">
                        {/* Date Time Row */}
                        <View className="flex-row items-start p-4 border-b border-white/5">
                            <View className="p-2.5 bg-[#137fec]/10 rounded-xl mr-4">
                                <CalendarClock color="#137fec" size={22} />
                            </View>
                            <View className="flex-1">
                                <View className="flex-row justify-between items-start">
                                    <View>
                                        <Text className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-0.5">Date & Time</Text>
                                        <Text className="text-white font-semibold text-base">Wed, Oct 24, 2023</Text>
                                        <Text className="text-slate-400 text-sm">09:30 AM - 10:00 AM</Text>
                                    </View>
                                    <TouchableOpacity><Text className="text-[#137fec] text-sm font-medium">Edit</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Location Row */}
                        <View className="flex-row items-start p-4">
                            <View className="p-2.5 bg-purple-500/10 rounded-xl mr-4">
                                <MapPin color="#a855f7" size={22} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-0.5">Location</Text>
                                <Text className="text-white font-semibold text-base">Campus Health Center</Text>
                                <Text className="text-slate-400 text-sm">Building A, Room 302</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Reason for Visit */}
                <View className="space-y-3 mb-5">
                    <Text className="text-slate-400 text-sm font-bold px-1 opacity-90 uppercase tracking-wider">Reason for Visit</Text>
                    <View className="bg-[#1c2127] rounded-2xl p-4 border border-white/5 flex-row">
                        <FileText color="#64748b" size={18} className="mt-0.5" />
                        <Text className="flex-1 ml-3 text-slate-300 text-sm leading-6">
                            "I've been experiencing persistent headaches and mild fever for the past two days. Need a general checkup."
                        </Text>
                    </View>
                </View>

                {/* Payment Summary */}
                <View className="space-y-3 mb-5">
                    <Text className="text-slate-400 text-sm font-bold px-1 opacity-90 uppercase tracking-wider">Payment Summary</Text>
                    <View className="bg-[#1c2127] rounded-2xl p-5 border border-white/5">
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-slate-400 text-sm">Consultation Fee</Text>
                            <Text className="text-white font-medium text-sm">$45.00</Text>
                        </View>
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-slate-400 text-sm">Service Fee</Text>
                            <Text className="text-white font-medium text-sm">$2.00</Text>
                        </View>
                        <View className="flex-row justify-between mb-3">
                            <View className="flex-row items-center gap-1">
                                <ShieldCheck color="#4ade80" size={14} />
                                <Text className="text-green-400 text-sm">Student Insurance</Text>
                            </View>
                            <Text className="text-green-400 font-medium text-sm">-$40.00</Text>
                        </View>
                        <View className="h-px bg-white/5 w-full my-2" />
                        <View className="flex-row justify-between items-end mt-1">
                            <Text className="text-white font-medium">Total Amount</Text>
                            <Text className="text-[#137fec] font-bold text-2xl">$7.00</Text>
                        </View>
                    </View>
                </View>

                {/* Payment Method */}
                <View className="flex-row items-center justify-between bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4 mb-10">
                    <View className="flex-row items-center gap-3">
                        <View className="size-10 bg-[#1c2127] rounded-lg items-center justify-center border border-white/5">
                            <CreditCard color="#94a3b8" size={20} />
                        </View>
                        <View>
                            <Text className="text-white text-sm font-semibold">Student Card •••• 4242</Text>
                            <Text className="text-slate-500 text-[10px]">Expires 12/25</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text className="text-[#137fec] text-xs font-bold uppercase">Change</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Footer Button */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#101922] border-t border-white/10 shadow-2xl">
                <View className="flex-row items-center gap-2 mb-4 justify-center">
                    <Info color="#64748b" size={14} />
                    <Text className="text-[11px] text-slate-500">Free cancellation up to 4 hours before appointment.</Text>
                </View>

                <TouchableOpacity
                    onPress={() => router.push('/appointment/success')}
                    className="w-full bg-[#137fec] h-16 rounded-2xl flex-row items-center justify-between px-6 shadow-lg shadow-[#137fec]/30"
                    activeOpacity={0.9}
                >
                    <Text className="text-white text-lg font-bold">Confirm Booking</Text>
                    <View className="flex-row items-center bg-white/20 rounded-xl px-4 py-2">
                        <Text className="text-white text-xs font-medium mr-2">Pay</Text>
                        <Text className="text-white text-lg font-bold">$7.00</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
