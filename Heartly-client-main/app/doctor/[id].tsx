import { DOCTORS } from '@/constants/doctors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    Heart,
    MessageCircle,
    ShieldCheck,
    Star,
    Users
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCHEDULES = [
    { day: 'Mon', date: '12', active: true },
    { day: 'Tue', date: '13', active: false },
    { day: 'Wed', date: '14', active: false },
    { day: 'Thu', date: '15', active: false, disabled: true },
    { day: 'Fri', date: '16', active: false },
];

const TIME_SLOTS = [
    { time: '09:00 AM', status: 'available' },
    { time: '10:00 AM', status: 'selected' },
    { time: '11:00 AM', status: 'available' },
    { time: '01:00 PM', status: 'booked' },
    { time: '02:00 PM', status: 'available' },
    { time: '03:00 PM', status: 'available' },
];

export default function DoctorProfileScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [selectedTime, setSelectedTime] = useState('10:00 AM');

    const doctor = DOCTORS.find(d => d.id === id);

    if (!doctor) {
        return (
            <View className="flex-1 bg-[#101922] items-center justify-center">
                <Text className="text-white text-lg font-bold">Doctor not found</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-[#137fec] px-4 py-2 rounded-lg">
                    <Text className="text-white font-bold">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#101922]" edges={['top']}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View className="flex-row items-center px-4 py-3 justify-between border-b border-white/5 bg-[#101922]">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="size-12 items-center justify-center rounded-full bg-white/5"
                >
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold">Doctor Details</Text>
                <TouchableOpacity className="size-12 items-center justify-center rounded-full bg-white/5">
                    <Heart color="white" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                <View className="px-4 pt-2">

                    {/* Profile Card */}
                    <View className="items-center bg-[#1b2633] rounded-3xl p-6 border border-white/5 mb-6 shadow-sm">
                        <View className="relative mb-4">
                            <View className="h-28 w-28 rounded-full border-4 border-[#101922] bg-slate-700 overflow-hidden">
                                {/* Placeholder Image */}
                                <View className="flex-1 items-center justify-center bg-slate-600">
                                    <Text className="text-white font-bold text-2xl">{doctor.initials}</Text>
                                </View>
                            </View>
                            <View className="absolute bottom-1 right-1 bg-green-500 rounded-full h-5 w-5 border-[3px] border-[#1b2633]" />
                        </View>

                        <Text className="text-white text-xl font-bold mb-1">{doctor.name}</Text>
                        <Text className="text-[#137fec] font-medium text-sm mb-4">{doctor.role}</Text>

                        <View className="flex-row w-full justify-around border-t border-white/5 pt-4">
                            <StatItem icon={Star} value={doctor.rating} label={`${doctor.reviews} Reviews`} color="text-yellow-500" fill />
                            <StatItem icon={ShieldCheck} value={doctor.experience} label="Experience" color="text-blue-500" />
                            <StatItem icon={Users} value={doctor.patients} label="Patients" color="text-purple-500" />
                        </View>
                    </View>

                    {/* About */}
                    <View className="mb-6">
                        <Text className="text-white text-lg font-bold mb-3">About Doctor</Text>
                        <Text className="text-slate-400 text-sm leading-6">
                            {doctor.about}
                            <Text className="text-[#137fec] font-medium"> Read more</Text>
                        </Text>
                    </View>

                    {/* Schedule Scroller */}
                    <View className="mb-6">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-white text-lg font-bold">Schedules</Text>
                            <TouchableOpacity><Text className="text-[#137fec] text-sm font-medium">Oct 2023</Text></TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                            {SCHEDULES.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    disabled={item.disabled}
                                    className={`items-center justify-center w-16 h-20 rounded-2xl mr-3 border ${item.active
                                        ? 'bg-[#137fec] border-[#137fec] shadow-lg shadow-blue-500/20'
                                        : 'bg-[#1b2633] border-white/5'
                                        } ${item.disabled ? 'opacity-40' : 'opacity-100'}`}
                                >
                                    <Text className={`text-xs font-medium mb-1 ${item.active ? 'text-white/80' : 'text-slate-500'}`}>{item.day}</Text>
                                    <Text className={`text-xl font-bold ${item.active ? 'text-white' : 'text-white'}`}>{item.date}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Time Selection */}
                    <View className="mb-6">
                        <Text className="text-white text-lg font-bold mb-4">Choose Time</Text>
                        <View className="flex-row flex-wrap justify-between">
                            {TIME_SLOTS.map((slot, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => slot.status !== 'booked' && setSelectedTime(slot.time)}
                                    className={`w-[31%] py-3.5 rounded-xl mb-3 border items-center ${slot.status === 'booked' ? 'bg-white/5 border-transparent' :
                                        selectedTime === slot.time ? 'bg-[#137fec]/10 border-[#137fec]' : 'bg-[#1b2633] border-white/5'
                                        }`}
                                >
                                    <Text className={`text-xs font-medium ${slot.status === 'booked' ? 'text-slate-600 line-through' :
                                        selectedTime === slot.time ? 'text-[#137fec]' : 'text-slate-300'
                                        }`}>
                                        {slot.time}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Review Card */}
                    <View className="mb-6">
                        <View className="flex-row justify-between items-center mb-3">
                            <Text className="text-white text-lg font-bold">Reviews</Text>
                            <TouchableOpacity><Text className="text-[#137fec] text-sm font-medium">See all</Text></TouchableOpacity>
                        </View>
                        <View className="bg-[#1b2633] p-4 rounded-2xl border border-white/5">
                            <View className="flex-row justify-between items-start mb-2">
                                <View className="flex-row gap-3">
                                    <View className="h-10 w-10 rounded-full bg-slate-700 items-center justify-center">
                                        <Text className="text-white text-xs font-bold">JS</Text>
                                    </View>
                                    <View>
                                        <Text className="text-sm font-semibold text-white">James Smith</Text>
                                        <View className="flex-row">
                                            {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} color="#facc15" fill="#facc15" />)}
                                        </View>
                                    </View>
                                </View>
                                <Text className="text-xs text-slate-500">2 days ago</Text>
                            </View>
                            <Text className="text-slate-400 text-sm">
                                Dr. Jenkins was incredibly patient and explained everything clearly. Highly recommend for students!
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer Action */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#101922]/95 border-t border-white/5 flex-row items-center gap-4" style={{ paddingBottom: Platform.OS === 'ios' ? 24 : 16 }}>
                <TouchableOpacity className="size-14 rounded-2xl bg-blue-500/10 items-center justify-center">
                    <MessageCircle color="#137fec" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => router.push('/appointment/book')}
                    className="flex-1 bg-[#137fec] rounded-2xl py-4 items-center justify-center shadow-lg shadow-blue-500/30">
                    <Text className="text-white font-bold text-base">Book Appointment</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Helper Component for the Stat Rows
const StatItem = ({ icon: Icon, value, label, color, fill }: { icon: any, value: string, label: string, color: string, fill?: boolean }) => (
    <View className="items-center">
        <View className="flex-row items-center gap-1 mb-1">
            <Icon size={18} className={color} color="currentColor" fill={fill ? "currentColor" : "none"} />
            <Text className="font-bold text-white text-base">{value}</Text>
        </View>
        <Text className="text-[10px] text-slate-500 uppercase tracking-tighter">{label}</Text>
    </View>
);
