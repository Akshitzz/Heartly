import { useRouter } from 'expo-router';
import {
    Calendar,
    CheckCircle2,
    Copy,
    FileText,
    Info,
    MapPin,
    X,
} from 'lucide-react-native';
// import { MotiView } from 'moti'; // Optional: Use for smooth entry animations
import React from 'react';
import {
    Image, View as RNView, ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const MotiView = ({ from, animate, transition, delay, ...props }: any) => <RNView {...props} />;

export default function BookingSuccessScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#101922]">
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View className="flex-row items-center px-4 py-3 justify-between bg-[#101922]">
                <View className="size-10" />
                <View className="size-10" />
                <TouchableOpacity
                    onPress={() => router.navigate('/(tabs)')}
                    className="size-10 items-center justify-center rounded-full bg-white/5"
                >
                    <X color="#94a3b8" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView
                className="flex-1 px-6"
                contentContainerStyle={{ alignItems: 'center', paddingTop: 20, paddingBottom: 160 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Animated Check Icon */}
                <MotiView
                    from={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', duration: 400 }}
                    className="mb-6 items-center justify-center"
                >
                    <View className="relative size-24 rounded-full bg-green-500/10 items-center justify-center">
                        {/* Pulse Effect */}
                        <MotiView
                            from={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 1.2, opacity: 0 }}
                            transition={{ loop: true, duration: 2000, type: 'timing' }}
                            className="absolute inset-0 rounded-full border-4 border-green-500/20"
                        />
                        <CheckCircle2 size={64} color="#22c55e" fill="#22c55e33" />
                    </View>
                </MotiView>

                {/* Success Text */}
                <MotiView
                    from={{ translateY: 20, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    transition={{ delay: 100 }}
                    className="items-center mb-8"
                >
                    <Text className="text-white text-2xl font-bold mb-2 text-center">
                        Booking Confirmed!
                    </Text>
                    <Text className="text-slate-400 text-sm text-center leading-5 max-w-[280px]">
                        Your appointment has been successfully scheduled. A confirmation email has been sent to you.
                    </Text>
                </MotiView>

                {/* Reference Number Card */}
                <MotiView
                    from={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 200 }}
                    className="w-full bg-[#1c2127] rounded-2xl border border-dashed border-slate-700 p-5 mb-6 items-center"
                >
                    <Text className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                        Booking Reference
                    </Text>
                    <View className="flex-row items-center gap-2">
                        <Text className="text-2xl font-mono font-bold text-[#137fec] tracking-[4px]">
                            #BK-8293
                        </Text>
                        <TouchableOpacity className="p-1">
                            <Copy color="#64748b" size={18} />
                        </TouchableOpacity>
                    </View>
                </MotiView>

                {/* Appointment Summary Card */}
                <MotiView
                    from={{ translateY: 20, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    transition={{ delay: 300 }}
                    className="w-full bg-[#1c2127] rounded-3xl border border-white/5 overflow-hidden shadow-sm"
                >
                    {/* Doctor Info */}
                    <View className="p-4 flex-row items-center gap-4 border-b border-white/5">
                        <View className="size-12 rounded-full bg-slate-700 overflow-hidden">
                            <Image
                                source={{ uri: 'https://placeholder.pics/svg/100' }}
                                className="w-full h-full"
                            />
                        </View>
                        <View>
                            <Text className="text-white font-bold text-base">Dr. Sarah Johnson</Text>
                            <Text className="text-[#137fec] text-sm font-medium">General Practitioner</Text>
                        </View>
                    </View>

                    {/* Details List */}
                    <View className="p-5 gap-y-5">
                        <DetailItem
                            icon={Calendar}
                            title="Monday, Oct 24, 2023"
                            subTitle="10:00 AM - 10:30 AM"
                        />
                        <DetailItem
                            icon={MapPin}
                            title="Campus Health Center"
                            subTitle="Room 302, Building A"
                        />
                        <DetailItem
                            icon={FileText}
                            title="Reason for Visit"
                            subTitle="Annual Checkup"
                        />
                    </View>
                </MotiView>

                {/* Arrival Hint */}
                <View className="mt-6 flex-row items-center gap-3 p-4 bg-yellow-500/10 rounded-2xl w-full">
                    <Info color="#eab308" size={18} />
                    <Text className="text-xs text-yellow-500/90 flex-1 leading-4">
                        Please arrive 15 minutes early to complete any necessary paperwork.
                    </Text>
                </View>
            </ScrollView>

            {/* Fixed Action Buttons */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#101922] border-t border-white/10 shadow-2xl">
                <View className="gap-3">
                    <TouchableOpacity
                        onPress={() => router.push('/appointment/details')}
                        className="w-full bg-[#137fec] h-14 rounded-2xl items-center justify-center shadow-lg shadow-[#137fec]/30"
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-bold text-base">View Appointment Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.navigate('/(tabs)')}
                        className="w-full bg-transparent h-12 rounded-2xl items-center justify-center border border-white/10"
                    >
                        <Text className="text-white font-medium text-sm">Return to Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

// Sub-component for clarity
const DetailItem = ({ icon: Icon, title, subTitle }: any) => (
    <View className="flex-row items-start gap-3">
        <View className="size-9 rounded-xl bg-[#137fec]/10 items-center justify-center">
            <Icon color="#137fec" size={18} />
        </View>
        <View className="flex-1">
            <Text className="text-white text-sm font-medium">{title}</Text>
            <Text className="text-slate-500 text-xs mt-0.5">{subTitle}</Text>
        </View>
    </View>
);
