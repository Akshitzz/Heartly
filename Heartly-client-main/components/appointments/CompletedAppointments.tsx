import {
    CalendarCheck,
    Search
} from 'lucide-react-native';
import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useRouter } from 'expo-router';

// Reusable Card Component
const AppointmentCard = ({
    name,
    specialty,
    date,
    image,
    initials,
    initialsBg,
    initialsText,
    initialsBorder
}: any) => {
    const router = useRouter();
    return (
        <View className="bg-[#1e2832] rounded-3xl p-4 border border-slate-800 mb-5 shadow-sm">
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row gap-3">
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            className="size-12 rounded-full border border-slate-700"
                        />
                    ) : (
                        <View className={`size-12 rounded-full border items-center justify-center ${initialsBg} ${initialsBorder}`}>
                            <Text className={`font-bold text-lg ${initialsText}`}>{initials}</Text>
                        </View>
                    )}
                    <View>
                        <Text className="text-white font-bold text-base">{name}</Text>
                        <Text className="text-slate-400 text-sm mt-0.5">{specialty}</Text>
                    </View>
                </View>

                <View className="bg-green-500/10 border border-green-500/30 px-2.5 py-1 rounded-lg">
                    <Text className="text-green-400 text-[10px] font-bold uppercase">Completed</Text>
                </View>
            </View>

            <View className="flex-row items-center mb-5 px-1">
                <CalendarCheck color="#9dabb9" size={18} />
                <Text className="text-slate-200 text-sm font-medium ml-2">{date}</Text>
            </View>

            <View className="flex-row gap-3">
                <TouchableOpacity
                    className="flex-1 h-11 items-center justify-center rounded-xl border border-slate-700 active:bg-slate-700"
                    onPress={() => router.push('/prescription' as any)}
                >
                    <Text className="text-white text-sm font-medium">View Prescription</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 h-11 items-center justify-center rounded-xl bg-[#137fec] shadow-lg shadow-blue-500/20 active:opacity-80"
                >
                    <Text className="text-white text-sm font-bold">Re-book</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export function CompletedAppointments() {
    return (
        <View className="flex-1 bg-[#101922]">
            <ScrollView
                className="flex-1 px-4"
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Search Bar */}
                <View className="relative mb-6">
                    <View className="absolute left-4 top-1/2 -mt-2.5 z-10">
                        <Search color="#9dabb9" size={20} />
                    </View>
                    <TextInput
                        placeholder="Search doctor, specialty, or date"
                        placeholderTextColor="#9dabb9"
                        className="w-full bg-[#1e2832] text-white rounded-2xl px-11 py-3.5 border border-slate-700 text-sm"
                    />
                </View>

                {/* Section: This Month */}
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4 px-1">
                    This Month
                </Text>

                <AppointmentCard
                    name="Dr. Sarah Jenkins"
                    specialty="General Practitioner"
                    date="Oct 24, 2023 • 10:30 AM"
                    image="https://i.pravatar.cc/150?u=sarah"
                />

                <AppointmentCard
                    name="Dr. Michael Chen"
                    specialty="Dermatologist"
                    date="Oct 12, 2023 • 2:00 PM"
                    initials="MC"
                    initialsBg="bg-indigo-900/40"
                    initialsText="text-indigo-300"
                    initialsBorder="border-indigo-800"
                />

                {/* Section: September */}
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-4 mb-4 px-1">
                    September 2023
                </Text>

                <AppointmentCard
                    name="Dr. Emily White"
                    specialty="Cardiologist"
                    date="Sep 28, 2023 • 09:15 AM"
                    initials="EW"
                    initialsBg="bg-orange-900/40"
                    initialsText="text-orange-300"
                    initialsBorder="border-orange-800"
                />

                <AppointmentCard
                    name="Dr. James Wilson"
                    specialty="Psychiatrist"
                    date="Sep 05, 2023 • 4:45 PM"
                    initials="JW"
                    initialsBg="bg-teal-900/40"
                    initialsText="text-teal-300"
                    initialsBorder="border-teal-800"
                />
            </ScrollView>
        </View>
    );
}
