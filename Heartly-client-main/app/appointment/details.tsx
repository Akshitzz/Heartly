import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    Info,
    MapPin,
    MessageCircle,
    MoreVertical,
    Navigation,
} from 'lucide-react-native';
import React from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppointmentSummaryScreen() {
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
                <Text className="text-white text-lg font-bold">Appointment Details</Text>
                <TouchableOpacity className="size-10 items-center justify-center rounded-full bg-white/5">
                    <MoreVertical color="white" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView
                className="flex-1 px-4"
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Confirmed Status Tag */}
                <View className="flex-row items-center self-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
                    <CheckCircle2 size={18} color="#4ade80" fill="#4ade8033" />
                    <Text className="text-green-400 font-bold text-sm ml-2">Confirmed</Text>
                </View>

                {/* Doctor Card */}
                <View className="flex-row items-center bg-[#1c2127] rounded-3xl p-4 border border-white/5 shadow-sm mb-6">
                    <View className="relative">
                        <View className="size-16 rounded-full bg-slate-700 border-2 border-white/10 overflow-hidden">
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/150?u=sarah' }}
                                className="w-full h-full"
                            />
                        </View>
                        <View className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-2 border-[#1c2127]" />
                    </View>

                    <View className="flex-1 ml-4">
                        <Text className="text-white font-bold text-lg">Dr. Sarah Bennett</Text>
                        <Text className="text-slate-400 text-sm">General Practitioner</Text>
                        <View className="flex-row items-center gap-1 mt-1">
                            <Text className="text-yellow-500 text-xs">★</Text>
                            <Text className="text-slate-400 text-xs font-medium">4.9 (120 reviews)</Text>
                        </View>
                    </View>

                    <TouchableOpacity className="size-10 rounded-full bg-[#137fec]/10 items-center justify-center">
                        <MessageCircle color="#137fec" size={20} />
                    </TouchableOpacity>
                </View>

                {/* Quick Info Grid */}
                <View className="flex-row gap-3 mb-6">
                    <View className="flex-1 bg-[#1c2127] p-4 rounded-2xl border border-white/5 items-center">
                        <View className="size-10 rounded-full bg-[#137fec]/10 items-center justify-center mb-2">
                            <Calendar color="#137fec" size={20} />
                        </View>
                        <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Date</Text>
                        <Text className="text-white font-bold text-sm mt-0.5">Wed, Oct 24</Text>
                    </View>

                    <View className="flex-1 bg-[#1c2127] p-4 rounded-2xl border border-white/5 items-center">
                        <View className="size-10 rounded-full bg-orange-500/10 items-center justify-center mb-2">
                            <Clock color="#f97316" size={20} />
                        </View>
                        <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Time</Text>
                        <Text className="text-white font-bold text-sm mt-0.5">10:00 AM</Text>
                    </View>
                </View>

                {/* Location Section */}
                <View className="mb-6">
                    <Text className="text-slate-400 text-sm font-bold px-1 mb-3">Location</Text>
                    <View className="bg-[#1c2127] rounded-3xl overflow-hidden border border-white/5 shadow-sm">
                        <ImageBackground
                            source={{ uri: 'https://placeholder.pics/svg/400x200' }}
                            className="h-32 w-full items-center justify-center"
                        >
                            <MapPin color="#ef4444" size={32} fill="#ef444433" />
                        </ImageBackground>
                        <View className="p-4 flex-row items-start justify-between">
                            <View className="flex-1">
                                <Text className="text-white font-bold text-sm">University Health Center</Text>
                                <Text className="text-slate-400 text-xs mt-1 leading-5">
                                    Building B, Room 304{'\n'}123 Campus Drive, West Wing
                                </Text>
                            </View>
                            <TouchableOpacity className="size-10 rounded-full bg-[#283039] items-center justify-center shadow-lg">
                                <Navigation color="white" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Visit Details */}
                <View className="mb-6">
                    <Text className="text-slate-400 text-sm font-bold px-1 mb-3">Visit Details</Text>
                    <View className="bg-[#1c2127] rounded-3xl p-4 border border-white/5">
                        <DetailRow label="Type" value="In-person Visit" />
                        <DetailRow label="Reason" value="High Fever & Cough" />
                        <DetailRow label="Cost" value="$0.00 (Insurance)" isGreen />
                    </View>
                </View>

                {/* Info Banner */}
                <View className="flex-row items-start bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
                    <Info color="#60a5fa" size={18} />
                    <Text className="text-blue-200 text-[11px] leading-4 flex-1 ml-3">
                        Please arrive 15 minutes early to complete any necessary paperwork. Bring your student ID.
                    </Text>
                </View>
            </ScrollView>

            {/* Footer Actions */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#101922] border-t border-white/10 shadow-2xl flex-row gap-3">
                <TouchableOpacity
                    className="flex-1 bg-[#283039] border border-white/5 h-14 rounded-2xl items-center justify-center"
                >
                    <Text className="text-white font-bold text-sm">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 bg-[#137fec] h-14 rounded-2xl items-center justify-center shadow-lg shadow-[#137fec]/30"
                    onPress={() => {
                        // Handle reschedule or navigation
                    }}
                >
                    <Text className="text-white font-bold text-sm">Reschedule</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

interface DetailRowProps {
    label: string;
    value: string;
    isGreen?: boolean;
}

// Sub-component for list rows
const DetailRow = ({ label, value, isGreen }: DetailRowProps) => (
    <View className="flex-row justify-between items-center py-3 border-b border-white/5 last:border-0">
        <Text className="text-sm text-slate-500">{label}</Text>
        <Text className={`text-sm font-medium ${isGreen ? 'text-green-400' : 'text-white'}`}>
            {value}
        </Text>
    </View>
);
