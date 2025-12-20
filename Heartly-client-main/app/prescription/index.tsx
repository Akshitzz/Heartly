import { useRouter } from 'expo-router';
import {
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Info,
    Pill,
    Plus,
    Search,
    SlidersHorizontal
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrescriptionScreen = () => {
    const [activeTab, setActiveTab] = useState('Active');
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#101922]">
            <StatusBar barStyle="light-content" />

            {/* Top Navigation Bar */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-[#101922]">
                <TouchableOpacity
                    className="h-10 w-10 items-center justify-center rounded-full active:bg-slate-800"
                    onPress={() => router.back()}
                >
                    <ChevronLeft color="#94a3b8" size={24} />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-white flex-1 text-center">
                    My Prescriptions
                </Text>
                <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full active:bg-slate-800">
                    <SlidersHorizontal color="#94a3b8" size={22} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="px-4 py-2">
                <View className="flex-row items-center bg-[#1C252E] rounded-xl px-4 shadow-sm border border-white/10">
                    <Search color="#94a3b8" size={20} />
                    <TextInput
                        placeholder="Search medications..."
                        placeholderTextColor="#94a3b8"
                        className="flex-1 h-12 ml-2 text-base text-white"
                    />
                </View>
            </View>

            {/* Segmented Control / Tabs */}
            <View className="px-4 py-4">
                <View className="flex-row h-12 w-full rounded-xl bg-[#1C252E] p-1">
                    <TouchableOpacity
                        onPress={() => setActiveTab('Active')}
                        className={`flex-1 flex-row items-center justify-center rounded-lg ${activeTab === 'Active' ? 'bg-[#137fec] shadow-sm' : ''}`}
                    >
                        <Text className={`font-medium text-sm ${activeTab === 'Active' ? 'text-white' : 'text-slate-500'}`}>
                            Active
                        </Text>
                        <View className="ml-2 h-5 w-5 items-center justify-center rounded-full bg-white/20">
                            <Text className="text-[10px] font-bold text-white">3</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setActiveTab('History')}
                        className={`flex-1 items-center justify-center rounded-lg ${activeTab === 'History' ? 'bg-[#137fec] shadow-sm' : ''}`}
                    >
                        <Text className={`font-medium text-sm ${activeTab === 'History' ? 'text-white' : 'text-slate-500'}`}>
                            History
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Scrollable List Content */}
            <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>

                {/* Schedule Section */}
                {activeTab === 'Active' && (
                    <View className="mb-6">
                        <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                            Today's Schedule
                        </Text>
                        <View className="bg-[#1C252E] rounded-2xl p-4 border border-white/5 space-y-4">
                            <ScheduleItem
                                time="08:00 AM"
                                medicine="Lisinopril"
                                dosage="10mg"
                                status="taken"
                            />
                            <ScheduleItem
                                time="02:00 PM"
                                medicine="Amoxicillin"
                                dosage="500mg"
                                status="pending"
                                isNext
                            />
                            <ScheduleItem
                                time="08:00 PM"
                                medicine="Amoxicillin"
                                dosage="500mg"
                                status="pending"
                            />
                        </View>
                    </View>
                )}

                {/* Prescriptions List */}
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                    All Prescriptions
                </Text>

                <PrescriptionItem
                    name="Amoxicillin"
                    dosage="500mg • Twice daily"
                    date="Oct 24, 2023"
                    status="Refill Ready"
                    statusType="emerald"
                />
                <PrescriptionItem
                    name="Lisinopril"
                    dosage="10mg • Once daily"
                    date="Nov 01, 2023"
                    status="Active"
                    statusType="blue"
                />
                <PrescriptionItem
                    name="Albuterol Inhaler"
                    dosage="90mcg • As needed"
                    date="Sep 15, 2023"
                    status="Low Supply"
                    statusType="amber"
                />

                {/* Info Card */}
                <View className="mt-4 rounded-xl bg-[#137fec]/10 p-4 border border-[#137fec]/20 flex-row mb-20">
                    <Info color="#137fec" size={20} className="mt-0.5" />
                    <View className="ml-3 flex-1">
                        <Text className="text-sm font-bold text-white mb-1">Upcoming Refill</Text>
                        <Text className="text-xs text-slate-300 leading-relaxed">
                            Your Amoxicillin prescription is eligible for a refill. You can request it directly from the details page.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity
                className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-[#137fec] shadow-lg shadow-blue-500/40 active:scale-95"
            >
                <Plus color="white" size={28} />
            </TouchableOpacity>

        </SafeAreaView>
    );
};

// Sub-components
const ScheduleItem = ({ time, medicine, dosage, status, isNext }: any) => {
    const isTaken = status === 'taken';
    return (
        <View className={`flex-row items-center ${isNext ? 'bg-[#137fec]/10 -mx-2 px-2 py-2 rounded-xl border border-[#137fec]/20' : ''}`}>
            <View className="w-16">
                <Text className={`text-xs font-bold ${isNext ? 'text-[#137fec]' : 'text-slate-400'}`}>{time}</Text>
            </View>
            <View className="flex-1 flex-row items-center">
                <View className={`h-8 w-8 items-center justify-center rounded-full mr-3 ${isTaken ? 'bg-green-500/20' : 'bg-slate-700'}`}>
                    {isTaken ? <CheckCircle2 size={16} color="#4ade80" /> : <Pill size={16} color="#94a3b8" />}
                </View>
                <View>
                    <Text className={`font-bold ${isTaken ? 'text-slate-400 line-through' : 'text-white'}`}>{medicine}</Text>
                    <Text className="text-[10px] text-slate-500">{dosage}</Text>
                </View>
            </View>
            {isNext && (
                <View className="bg-[#137fec] px-2 py-1 rounded-md">
                    <Text className="text-[10px] font-bold text-white">Next</Text>
                </View>
            )}
        </View>
    )
}

const PrescriptionItem = ({ name, dosage, date, status, statusType }: any) => {
    const colors: any = {
        emerald: "bg-emerald-900/40 text-emerald-400",
        blue: "bg-blue-900/40 text-blue-300",
        amber: "bg-amber-900/40 text-amber-400",
    };

    return (
        <TouchableOpacity className="flex-row items-center justify-between rounded-2xl bg-[#1C252E] p-4 mb-3 shadow-sm border border-white/5 active:scale-[0.98]">
            <View className="flex-row items-start flex-1">
                <View className="h-12 w-12 items-center justify-center rounded-full bg-blue-900/30">
                    <Pill color="#137fec" size={24} />
                </View>
                <View className="ml-4 flex-1">
                    <View className="flex-row items-center">
                        <Text className="text-base font-bold text-white mr-2">{name}</Text>
                        <View className={`px-2 py-0.5 rounded-full ${colors[statusType].split(' ').slice(0, 1).join(' ')}`}>
                            <Text className={`text-[9px] font-bold uppercase tracking-wider ${colors[statusType].split(' ').slice(1).join(' ')}`}>
                                {status}
                            </Text>
                        </View>
                    </View>
                    <Text className="text-sm text-slate-400 mt-0.5">{dosage}</Text>
                    <Text className="text-[10px] text-slate-500 mt-1">Prescribed: {date}</Text>
                </View>
            </View>
            <ChevronRight color="#94a3b8" size={20} />
        </TouchableOpacity>
    );
};

export default PrescriptionScreen;
