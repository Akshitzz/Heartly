import {
    Ambulance,
    ArrowLeft,
    BriefcaseMedical,
    MessageSquare,
    Phone,
    PhoneIncoming,
    Share2,
    Star,
    Wind,
    XCircle
} from 'lucide-react-native';
import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// import { MotiView } from 'moti';
import { View as RNView } from 'react-native';
const MotiView = ({ from, animate, transition, delay, ...props }: any) => <RNView {...props} />;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const TIP_CARDS = [
    {
        id: 1,
        title: 'Prepare Info',
        text: 'Have your ID and insurance card ready.',
        icon: BriefcaseMedical,
    },
    {
        id: 2,
        title: 'Stay Calm',
        text: 'Sit down and take slow, deep breaths.',
        icon: Wind,
    },
    {
        id: 3,
        title: 'Keep Line Open',
        text: 'The driver may try to call you.',
        icon: PhoneIncoming,
    },
];

export default function EmergencyTrackingScreen() {
    return (
        <View className="flex-1 bg-[#101922]">
            {/* Map Section */}
            <View style={{ height: SCREEN_HEIGHT * 0.45 }} className="relative bg-slate-800">
                {/* Simulated Map Background */}
                <Image
                    source={{ uri: 'https://placeholder.pics/svg/800' }}
                    className="w-full h-full opacity-60"
                    resizeMode="cover"
                />

                {/* Back Button */}
                <SafeAreaView className="absolute top-4 left-6">
                    <TouchableOpacity className="bg-[#1e2832] p-2.5 rounded-full shadow-xl">
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                </SafeAreaView>

                {/* User Location Marker */}
                <View className="absolute top-1/2 left-1/2 -ml-2 -mt-2">
                    <View className="w-4 h-4 bg-[#137fec] rounded-full border-2 border-white shadow-lg" />
                </View>

                {/* Ambulance Marker with Pulse */}
                <View className="absolute top-[35%] right-[25%] items-center">
                    <View className="relative size-12 items-center justify-center">
                        {/* Ping Animation */}
                        <MotiView
                            from={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ loop: true, duration: 2000, type: 'timing' }}
                            className="absolute inset-0 bg-[#137fec] rounded-full"
                        />
                        <View className="size-10 bg-[#1e2832] rounded-full items-center justify-center border-2 border-[#137fec] shadow-2xl z-10">
                            <Ambulance color="#137fec" size={20} />
                        </View>
                    </View>
                    <View className="bg-[#1e2832] px-2 py-1 rounded shadow-md mt-1 border border-[#137fec]/30">
                        <Text className="text-[10px] font-bold text-[#137fec]">5 min</Text>
                    </View>
                </View>
            </View>

            {/* Bottom Sheet / Control Panel */}
            <View className="flex-1 bg-[#101922] rounded-t-[32px] -mt-8 shadow-2xl">
                {/* Drag Handle */}
                <View className="w-full items-center pt-3 pb-1">
                    <View className="w-12 h-1.5 bg-slate-700 rounded-full" />
                </View>

                <ScrollView
                    className="px-6"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                >
                    {/* Status Header */}
                    <View className="mt-4 mb-6">
                        <View className="flex-row items-center mb-2">
                            <View className="size-2 bg-[#137fec] rounded-full mr-2" />
                            <Text className="text-[#137fec] font-bold uppercase tracking-widest text-[10px]">
                                Dispatch Confirmed
                            </Text>
                        </View>
                        <Text className="text-white text-3xl font-bold leading-tight">
                            Ambulance is arriving in{"\n"}
                            <Text className="text-[#137fec]">5 minutes</Text>
                        </Text>
                        <Text className="text-slate-400 text-sm mt-2">
                            Destination: <Text className="text-slate-200 font-medium">Student Dorm B, Main Entrance</Text>
                        </Text>
                    </View>

                    {/* Driver Card */}
                    <View className="bg-[#1e2832] rounded-2xl p-4 border border-slate-800 flex-row items-center mb-6">
                        <View className="relative">
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/150?u=9' }}
                                className="w-14 h-14 rounded-full border-2 border-[#137fec]/20"
                            />
                            <View className="absolute -bottom-1 -right-1 bg-green-500 size-4 rounded-full border-2 border-[#1e2832]" />
                        </View>

                        <View className="flex-1 ml-4">
                            <Text className="text-white font-bold text-lg">Dr. Marcus Ray</Text>
                            <Text className="text-slate-500 text-xs">Paramedic • City Hospital</Text>
                            <View className="flex-row items-center mt-1 space-x-2">
                                <View className="bg-slate-700 px-2 py-0.5 rounded">
                                    <Text className="text-slate-300 text-[10px] font-bold">UNIT 402</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Star size={12} color="#facc15" fill="#facc15" />
                                    <Text className="text-yellow-500 text-xs font-bold ml-1">4.9</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity className="bg-[#137fec]/10 p-3 rounded-full">
                            <MessageSquare color="#137fec" size={20} />
                        </TouchableOpacity>
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row gap-3 mb-8">
                        <TouchableOpacity
                            className="flex-1 bg-[#137fec] rounded-2xl flex-row items-center justify-center space-x-2 py-4 shadow-lg shadow-[#137fec]/30"
                            activeOpacity={0.8}
                        >
                            <Phone color="white" size={20} />
                            <Text className="text-white font-bold text-base">Call Driver</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-slate-800 w-16 rounded-2xl items-center justify-center border border-slate-700">
                            <Share2 color="#94a3b8" size={20} />
                        </TouchableOpacity>
                    </View>

                    {/* Safety Tips */}
                    <View className="mb-6">
                        <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                            While you wait
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                            {TIP_CARDS.map((tip) => (
                                <View
                                    key={tip.id}
                                    className="bg-[#137fec]/5 border border-[#137fec]/10 rounded-2xl p-4 mr-3 w-56 flex-row"
                                >
                                    <tip.icon color="#137fec" size={24} />
                                    <View className="ml-3 flex-1">
                                        <Text className="text-slate-200 font-bold text-sm">{tip.title}</Text>
                                        <Text className="text-slate-500 text-xs mt-1 leading-4">{tip.text}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Footer / Cancel */}
                    <TouchableOpacity className="flex-row items-center justify-center py-4 opacity-60">
                        <XCircle color="#ef4444" size={16} />
                        <Text className="text-[#ef4444] text-sm font-bold ml-2">Cancel Request</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}
