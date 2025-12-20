import {
    Clock,
    MapPin,
    Plus,
    Stethoscope,
    Video
} from 'lucide-react-native';
import React from 'react';
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const CATEGORIES = ['All', 'General', 'Dental', 'Vision', 'Psychiatry'];

export default function AppointmentCard({
    name,
    specialty,
    time,
    type,
    icon,
    avatar,
    customIcon,
    iconBg,
    primaryAction,
    secondaryAction,
    showOnlineStatus,
    fullWidthButton
}: any) {
    return (
        <View className="bg-[#1e2832] rounded-2xl border border-slate-800 overflow-hidden mb-4 shadow-sm">
            <View className="p-4 flex-row">
                <View className="shrink-0 mr-4">
                    {avatar ? (
                        <View className="relative">
                            <Image source={{ uri: avatar }} className="size-16 rounded-2xl" />
                            {showOnlineStatus && (
                                <View className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-[#1e2832]" />
                            )}
                        </View>
                    ) : (
                        <View className={`size-16 rounded-2xl items-center justify-center ${iconBg}`}>
                            {customIcon}
                        </View>
                    )}
                </View>

                <View className="flex-1 justify-center">
                    <View className="flex-row justify-between items-start">
                        <View className="flex-1 mr-2">
                            <Text className="text-white text-base font-bold leading-tight">{name}</Text>
                            <Text className="text-slate-400 text-sm font-medium mt-1">{specialty}</Text>
                        </View>
                        <View className="bg-[#137fec]/10 px-2.5 py-1 rounded-lg">
                            <Text className="text-[#137fec] text-xs font-bold">{time}</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center mt-3">
                        {icon}
                        <Text className="text-slate-400 text-xs font-medium ml-2">{type}</Text>
                    </View>
                </View>
            </View>

            <View className="h-[1px] bg-slate-800 w-full" />

            <View className="flex-row bg-slate-900/30 p-1">
                {!fullWidthButton && (
                    <>
                        <TouchableOpacity className="flex-1 py-3 items-center">
                            <Text className="text-slate-400 text-sm font-medium">{secondaryAction}</Text>
                        </TouchableOpacity>
                        <View className="w-[1px] h-4 bg-slate-800 self-center" />
                    </>
                )}
                <TouchableOpacity className="flex-1 py-3 items-center">
                    <Text className={`text-sm font-bold ${primaryAction === 'Join Call' ? 'text-[#137fec]' : 'text-white'}`}>
                        {primaryAction}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export function UpcomingAppointments() {
    return (
        <View className="flex-1 bg-[#101922]">
            {/* Categories Horizontal Scroll */}
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                    className="flex-row"
                >
                    {CATEGORIES.map((cat, index) => (
                        <TouchableOpacity
                            key={cat}
                            className={`mr-3 px-5 py-2.5 rounded-full border ${index === 0
                                    ? 'bg-[#137fec] border-[#137fec] shadow-lg shadow-blue-500/20'
                                    : 'bg-[#1e2832] border-slate-800'
                                }`}
                        >
                            <Text
                                className={`text-sm font-bold ${index === 0 ? 'text-white' : 'text-slate-400'
                                    }`}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView
                className="flex-1 px-4"
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Today Section */}
                <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-4 mb-3">
                    Today
                </Text>
                <AppointmentCard
                    name="Dr. Sarah Jenkins"
                    specialty="General Practitioner"
                    time="2:30 PM"
                    type="Video Consultation"
                    icon={<Video size={16} color="#94a3b8" />}
                    avatar="https://i.pravatar.cc/150?u=sarah"
                    primaryAction="Join Call"
                    secondaryAction="Reschedule"
                    showOnlineStatus
                />

                {/* Tomorrow Section */}
                <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-6 mb-3">
                    Tomorrow, Oct 25
                </Text>
                <AppointmentCard
                    name="Campus Dental Clinic"
                    specialty="Routine Checkup"
                    time="10:00 AM"
                    type="Building B, Room 204"
                    icon={<MapPin size={16} color="#94a3b8" />}
                    customIcon={<Stethoscope size={32} color="#a855f7" />}
                    iconBg="bg-purple-900/30"
                    primaryAction="Details"
                    secondaryAction="Cancel"
                />

                {/* Next Week Section */}
                <Text className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-6 mb-3">
                    Next Week
                </Text>
                <AppointmentCard
                    name="Dr. Mark Chen"
                    specialty="Dermatologist"
                    time="Nov 02"
                    type="11:15 AM"
                    icon={<Clock size={16} color="#94a3b8" />}
                    avatar="https://i.pravatar.cc/150?u=mark"
                    primaryAction="View Summary"
                    fullWidthButton
                />
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity
                activeOpacity={0.8}
                className="absolute bottom-8 right-6 size-14 bg-[#137fec] rounded-full items-center justify-center shadow-xl shadow-blue-500/40"
            >
                <Plus color="white" size={32} />
            </TouchableOpacity>
        </View>
    );
}
