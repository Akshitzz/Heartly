import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    CloudSun,
    Moon,
    Star,
    Sun,
    Video
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DAYS = [
    { day: 'Mon', date: '12', active: true },
    { day: 'Tue', date: '13', active: false },
    { day: 'Wed', date: '14', active: false },
    { day: 'Thu', date: '15', active: false },
    { day: 'Fri', date: '16', disabled: true },
];

const TIME_SLOTS = {
    Morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    Afternoon: ['01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'],
    Evening: ['05:00 PM', '05:30 PM', '06:00 PM'],
};

const BOOKED_SLOTS = ['10:30 AM', '03:30 PM', '06:00 PM'];

export default function SlotSelectionScreen() {
    const [selectedTime, setSelectedTime] = useState('10:00 AM');
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
                <Text className="text-white text-lg font-bold">Select Time Slot</Text>
                <View className="size-10" />
            </View>

            <ScrollView
                className="flex-1 px-4"
                contentContainerStyle={{ paddingBottom: 160 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Doctor Summary Card */}
                <View className="flex-row items-center bg-[#1c2127] rounded-2xl p-4 mt-4 border border-white/5 shadow-sm">
                    <View className="relative">
                        <View className="size-16 rounded-full bg-slate-700 border-2 border-[#137fec]/20 overflow-hidden">
                            {/* Replace with actual Image component */}
                            <View className="flex-1 items-center justify-center bg-slate-600">
                                <Text className="text-white text-xs">Profile</Text>
                            </View>
                        </View>
                        <View className="absolute bottom-0 right-0 size-4 bg-green-500 border-2 border-[#1c2127] rounded-full" />
                    </View>

                    <View className="flex-1 ml-4">
                        <Text className="text-white font-bold text-base">Dr. Emily Chen</Text>
                        <Text className="text-slate-400 text-sm">General Physician</Text>
                        <View className="flex-row items-center gap-1 mt-1">
                            <Star size={12} color="#eab308" fill="#eab308" />
                            <Text className="text-white text-xs font-medium">4.8 (124 reviews)</Text>
                        </View>
                    </View>

                    <TouchableOpacity className="size-10 items-center justify-center rounded-full bg-[#137fec]/10">
                        <Video color="#137fec" size={20} />
                    </TouchableOpacity>
                </View>

                {/* Date Selector */}
                <View className="mt-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-white text-base font-bold">October 2023</Text>
                        <View className="flex-row gap-2">
                            <TouchableOpacity className="size-8 items-center justify-center rounded-full bg-white/5">
                                <ChevronLeft color="white" size={18} />
                            </TouchableOpacity>
                            <TouchableOpacity className="size-8 items-center justify-center rounded-full bg-white/5">
                                <ChevronRight color="white" size={18} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                        {DAYS.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                disabled={item.disabled}
                                className={`items-center justify-center w-[72px] h-20 rounded-2xl mr-3 ${item.active ? 'bg-[#137fec] shadow-lg shadow-[#137fec]/30' : 'bg-[#1c2127] border border-white/5'
                                    } ${item.disabled ? 'opacity-40' : 'opacity-100'}`}
                            >
                                <Text className={`text-xs font-medium mb-1 ${item.active ? 'text-white/80' : 'text-slate-400'}`}>{item.day}</Text>
                                <Text className={`text-xl font-bold ${item.active ? 'text-white' : 'text-white'}`}>{item.date}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Time Slots Groups */}
                <View className="mt-8 space-y-6">
                    <TimeSection
                        title="Morning"
                        icon={Sun}
                        iconColor="#fb923c"
                        slots={TIME_SLOTS.Morning}
                        selected={selectedTime}
                        setSelected={setSelectedTime}
                    />
                    <TimeSection
                        title="Afternoon"
                        icon={CloudSun}
                        iconColor="#60a5fa"
                        slots={TIME_SLOTS.Afternoon}
                        selected={selectedTime}
                        setSelected={setSelectedTime}
                    />
                    <TimeSection
                        title="Evening"
                        icon={Moon}
                        iconColor="#818cf8"
                        slots={TIME_SLOTS.Evening}
                        selected={selectedTime}
                        setSelected={setSelectedTime}
                    />
                </View>
            </ScrollView>

            {/* Fixed Footer */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#101922] border-t border-white/10 shadow-2xl">
                <View className="flex-row justify-between items-center mb-4 px-1">
                    <View>
                        <Text className="text-xs text-slate-500">Total Amount</Text>
                        <Text className="text-xl font-bold text-white">$45.00</Text>
                    </View>
                    <View className="items-end">
                        <Text className="text-xs text-slate-500">Selected</Text>
                        <Text className="text-sm font-semibold text-[#137fec]">Mon, 12 Oct • {selectedTime}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => router.push('/appointment/confirm')}
                    className="w-full bg-[#137fec] py-4 rounded-2xl flex-row items-center justify-center shadow-lg shadow-[#137fec]/40">
                    <Text className="text-white font-bold text-base mr-2">Book Appointment</Text>
                    <ArrowRight color="white" size={20} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Sub-component for time sections
const TimeSection = ({ title, icon: Icon, iconColor, slots, selected, setSelected }: any) => (
    <View className="mb-6">
        <View className="flex-row items-center gap-2 mb-3">
            <Icon size={18} color={iconColor} />
            <Text className="text-sm font-semibold text-slate-400">{title}</Text>
        </View>
        <View className="flex-row flex-wrap justify-start">
            {slots.map((time: any, index: any) => {
                const isSelected = selected === time;
                const isBooked = BOOKED_SLOTS.includes(time);

                return (
                    <TouchableOpacity
                        key={index}
                        disabled={isBooked}
                        onPress={() => setSelected(time)}
                        className={`w-[30%] py-3 rounded-xl mb-3 mr-[3%] items-center border ${isBooked ? 'bg-[#283039] border-transparent opacity-50' :
                            isSelected ? 'bg-[#137fec]/20 border-[#137fec]' : 'bg-[#1c2127] border-white/5'
                            }`}
                    >
                        <Text className={`text-xs font-medium ${isBooked ? 'text-slate-500 line-through' :
                            isSelected ? 'text-[#137fec] font-bold' : 'text-slate-300'
                            }`}>
                            {time}
                        </Text>
                        {isSelected && <View className="absolute top-0 right-0 size-2 bg-[#137fec] rounded-bl-lg" />}
                    </TouchableOpacity>
                );
            })}
        </View>
    </View>
);
