import {
    Brain,
    CalendarPlus,
    CalendarX,
    Droplets,
    Plus,
} from 'lucide-react-native';
import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// Sub-component for Cancelled Cards
const CancelledCard = ({ name, specialty, date, reason, image, icon, iconBg, buttonText }: any) => (
    <View className="bg-[#1e2832] rounded-3xl border border-slate-800 overflow-hidden mb-4 shadow-sm">
        <View className="p-4">
            {/* Top Row: Profile & Badge */}
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center flex-1">
                    {image ? (
                        <Image source={{ uri: image }} className="size-12 rounded-full border border-slate-700" />
                    ) : (
                        <View className={`size-12 rounded-full items-center justify-center ${iconBg}`}>
                            {icon}
                        </View>
                    )}
                    <View className="ml-3 flex-1">
                        <Text className="text-white font-bold text-base leading-tight">{name}</Text>
                        <Text className="text-slate-400 text-sm mt-0.5">{specialty}</Text>
                    </View>
                </View>
                <View className="bg-red-950 px-2.5 py-1 rounded-full border border-red-900/50">
                    <Text className="text-red-300 text-[10px] font-bold uppercase tracking-wider">Cancelled</Text>
                </View>
            </View>

            {/* Date Row */}
            <View className="flex-row items-center mb-4">
                <CalendarX color="#94a3b8" size={18} />
                <Text className="text-slate-400 text-sm font-medium ml-2 line-through">{date}</Text>
            </View>

            {/* Reason Box */}
            <View className="bg-[#101922] p-3 rounded-xl border border-slate-800/50">
                <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                    Reason for cancellation
                </Text>
                <Text className="text-slate-200 text-sm leading-5">
                    {reason}
                </Text>
            </View>
        </View>

        {/* Bottom Action Area */}
        <View className="border-t border-slate-800 p-3 bg-white/[0.02]">
            <TouchableOpacity
                className="w-full flex-row items-center justify-center bg-[#1e2832] border border-slate-700 h-11 rounded-xl active:bg-slate-700"
            >
                <CalendarPlus color="#137fec" size={18} />
                <Text className="text-[#137fec] font-bold text-sm ml-2">{buttonText}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

export function CancelledAppointments() {
    return (
        <View className="flex-1 bg-[#101922]">

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Card 1: Dr. Sarah Jenkins */}
                <CancelledCard
                    name="Dr. Sarah Jenkins"
                    specialty="General Practitioner"
                    date="Oct 24 • 10:30 AM"
                    reason="Provider unavailable due to emergency surgery. Rescheduling priority given."
                    image="https://i.pravatar.cc/150?u=sarah"
                    buttonText="Re-book with Dr. Jenkins"
                />

                {/* Card 2: Student Counseling */}
                <CancelledCard
                    name="Student Counseling"
                    specialty="Mental Health Services"
                    date="Oct 18 • 2:00 PM"
                    reason="Cancelled by student via app."
                    icon={<Brain size={24} color="#d8b4fe" />}
                    iconBg="bg-purple-900/30"
                    buttonText="Find New Time"
                />

                {/* Card 3: Lab Test */}
                <CancelledCard
                    name="Lab Test: Blood Panel"
                    specialty="Campus Clinic Lab A"
                    date="Sep 30 • 9:15 AM"
                    reason="Lab equipment maintenance scheduled for this day."
                    icon={<Droplets size={24} color="#fdba74" />}
                    iconBg="bg-orange-900/30"
                    buttonText="Re-book Lab Test"
                />

                {/* Archive Note */}
                <View className="px-2 mt-4 items-center">
                    <Text className="text-slate-500 text-xs text-center leading-5">
                        Appointments cancelled more than 90 days ago are archived and not shown here.
                    </Text>
                </View>
            </ScrollView>

            {/* Sticky Bottom Button */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#101922]/90 border-t border-slate-800">
                <TouchableOpacity
                    activeOpacity={0.8}
                    className="bg-[#137fec] h-14 rounded-2xl flex-row items-center justify-center shadow-xl shadow-blue-900/40"
                >
                    <Plus color="white" size={20} />
                    <Text className="text-white font-bold text-base ml-2">Book New Appointment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
