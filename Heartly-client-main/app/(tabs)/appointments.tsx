import { CancelledAppointments } from '@/components/appointments/CancelledAppointments';
import { CompletedAppointments } from '@/components/appointments/CompletedAppointments';
import { UpcomingAppointments } from '@/components/appointments/UpcomingAppointments';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    CalendarDays,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppointmentsScreen() {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
    const router = useRouter();

    const getTitle = () => {
        switch (activeTab) {
            case 'upcoming': return 'Upcoming Appointments';
            case 'completed': return 'Completed Appointments';
            case 'cancelled': return 'Cancelled Appointments';
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-[#101922]">
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View className="flex-row items-center px-4 py-3 justify-between bg-[#1e2832] border-b border-slate-800">
                <TouchableOpacity
                    className="size-12 items-center justify-center rounded-full active:bg-white/10"
                    onPress={() => router.back()}
                >
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold">{getTitle()}</Text>
                <TouchableOpacity className="size-12 items-center justify-center rounded-full active:bg-white/10">
                    <CalendarDays color="white" size={24} />
                </TouchableOpacity>
            </View>

            {/* Custom Tabs */}
            <View className="flex-row bg-[#1e2832] p-1 mx-4 mt-4 rounded-xl border border-slate-700">
                {(['upcoming', 'completed', 'cancelled'] as const).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        className={`flex-1 py-2 items-center justify-center rounded-lg ${activeTab === tab ? 'bg-[#137fec]' : 'bg-transparent'
                            }`}
                    >
                        <Text className={`text-xs font-bold capitalize ${activeTab === tab ? 'text-white' : 'text-slate-400'
                            }`}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content Area */}
            <View className="flex-1 mt-2">
                {activeTab === 'upcoming' && <UpcomingAppointments />}
                {activeTab === 'completed' && <CompletedAppointments />}
                {activeTab === 'cancelled' && <CancelledAppointments />}
            </View>
        </SafeAreaView>
    );
}
