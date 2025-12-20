import { DOCTORS } from '@/constants/doctors';
import { HOSPITALS } from '@/constants/hospitals';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    CalendarDays,
    CircleArrowRight,
    FlaskConical,
    Globe,
    Heart,
    HeartPulse,
    MapPin,
    Navigation,
    Phone,
    Share2,
    ShieldPlus,
    Star,
    Syringe
} from 'lucide-react-native';
import React from 'react';
import {
    ImageBackground,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HospitalDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const hospital = HOSPITALS.find(h => h.id === id);

    if (!hospital) {
        return (
            <View className="flex-1 bg-[#101922] items-center justify-center">
                <Text className="text-white text-lg font-bold">Hospital not found</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4 bg-[#137fec] px-4 py-2 rounded-lg">
                    <Text className="text-white font-bold">Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#101922]" edges={['top']}>
            {/* Sticky Header */}
            <View className="flex-row items-center px-4 py-3 justify-between border-b border-white/5 bg-[#101922]">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="size-12 items-center justify-center rounded-full bg-white/5"
                >
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>
                <View className="items-center flex-1 mx-2">
                    <Text className="text-white text-lg font-bold text-center" numberOfLines={1}>{hospital.name}</Text>
                    <Text className="text-xs text-slate-400 text-center" numberOfLines={1}>{hospital.location}</Text>
                </View>
                <TouchableOpacity className="size-10 items-center justify-center rounded-full bg-white/5">
                    <Heart color="#94a3b8" size={22} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
                {/* Hero Image Section */}
                <View className="px-4 mt-4">
                    <ImageBackground
                        source={{ uri: hospital.image || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600' }}
                        className="h-64 w-full rounded-3xl overflow-hidden justify-end"
                        imageStyle={{ borderRadius: 24 }}
                    >
                        {/* Gradient Overlay mimic */}
                        <View className="absolute inset-0 bg-black/40" />

                        <View className="p-4">
                            <View className="flex-row mb-2">
                                <View className={`${hospital.statusColor || 'bg-green-500'} px-3 py-1.5 rounded-full`}>
                                    <Text className="text-white text-xs font-bold">{hospital.status}</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center gap-2 mb-1">
                                <View className="bg-yellow-400 px-2 py-0.5 rounded flex-row items-center gap-1">
                                    <Star color="black" size={12} fill="black" />
                                    <Text className="text-black text-xs font-bold">{hospital.rating}</Text>
                                </View>
                                <Text className="text-white/90 text-xs">({hospital.reviews} reviews)</Text>
                            </View>

                            <View className="flex-row items-center gap-1">
                                <MapPin color="white" size={14} opacity={0.8} />
                                <Text className="text-white/80 text-sm" numberOfLines={1}>{hospital.location}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                {/* Quick Actions */}
                <View className="flex-row justify-between px-4 mt-8">
                    {[
                        { icon: Phone, label: 'Call' },
                        { icon: Navigation, label: 'Map' },
                        { icon: Globe, label: 'Web' },
                        { icon: Share2, label: 'Share' }
                    ].map((item, index) => (
                        <TouchableOpacity key={index} className="items-center gap-2">
                            <View className="size-14 rounded-2xl bg-[#1b2633] border border-white/5 items-center justify-center">
                                <item.icon color="#137fec" size={24} />
                            </View>
                            <Text className="text-xs font-medium text-slate-400">{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* About Section */}
                <View className="px-4 mt-8">
                    <Text className="text-white text-lg font-bold mb-3">About</Text>
                    <Text className="text-slate-400 text-sm leading-6">
                        The {hospital.name} provides comprehensive healthcare services tailored for students and faculty. We are equipped with state-of-the-art facilities... <Text className="text-[#137fec] font-medium">Read more</Text>
                    </Text>
                </View>

                {/* Services Grid */}
                <View className="px-4 mt-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-white text-lg font-bold">Services</Text>
                        <TouchableOpacity><Text className="text-[#137fec] text-sm font-medium">See All</Text></TouchableOpacity>
                    </View>
                    <View className="flex-row flex-wrap gap-3">
                        <ServiceCard icon={HeartPulse} label="Cardiology" sub="3 Specialists" color="text-red-400" bg="bg-red-500/10" />
                        <ServiceCard icon={ShieldPlus} label="Dental" sub="2 Specialists" color="text-blue-400" bg="bg-blue-500/10" />
                        <ServiceCard icon={Syringe} label="Pharmacy" sub="24/7 Open" color="text-green-400" bg="bg-green-500/10" />
                        <ServiceCard icon={FlaskConical} label="Lab Test" sub="Results in 24h" color="text-purple-400" bg="bg-purple-500/10" />
                    </View>
                </View>

                {/* Top Specialists */}
                <View className="px-4 mt-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-white text-lg font-bold">Top Specialists</Text>
                        <TouchableOpacity><Text className="text-[#137fec] text-sm font-medium">View All</Text></TouchableOpacity>
                    </View>

                    {DOCTORS.filter(d => d.hospitalId === id).map(doctor => (
                        <SpecialistCard
                            key={doctor.id}
                            doctor={doctor}
                            onPress={() => router.push({ pathname: '/doctor/[id]', params: { id: doctor.id } })}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Floating Bottom Action Bar */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#101922]/95 border-t border-white/5 flex-row gap-3" style={{ paddingBottom: Platform.OS === 'ios' ? 24 : 16 }}>
                <TouchableOpacity
                    onPress={() => router.push('/emergency/booking')}
                    className="flex-1 flex-row items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl py-4">
                    <Text className="text-red-500 font-bold text-base">Emergency</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-[2] flex-row items-center justify-center gap-2 bg-[#137fec] rounded-xl py-4 shadow-lg shadow-blue-500/40">
                    <Text className="text-white font-bold text-base">Book Appointment</Text>
                    <CircleArrowRight color="white" size={20} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Sub-components for cleaner code
const ServiceCard = ({ icon: Icon, label, sub, color, bg }: { icon: any, label: string, sub: string, color: string, bg: string }) => (
    <View className={`w-[48%] flex-row items-center gap-3 p-3.5 rounded-2xl bg-[#1b2633] border border-white/5 shadow-sm`}>
        <View className={`size-10 rounded-xl ${bg} items-center justify-center`}>
            <Icon size={20} className={color} color="currentColor" />
        </View>
        <View>
            <Text className="text-sm font-bold text-white">{label}</Text>
            <Text className="text-[11px] text-slate-500">{sub}</Text>
        </View>
    </View>
);

const SpecialistCard = ({ doctor, onPress }: { doctor: any, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} className="flex-row items-center gap-4 p-4 rounded-2xl bg-[#1b2633] border border-white/5 mb-3">
        <View className="size-16 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center">
            <Text className="text-white font-bold">{doctor.initials}</Text>
        </View>
        <View className="flex-1">
            <Text className="text-base font-bold text-white">{doctor.name}</Text>
            <Text className="text-sm text-[#137fec] font-medium">{doctor.role}</Text>
            <View className="flex-row items-center gap-1 mt-1">
                <Star color="#facc15" size={14} fill="#facc15" />
                <Text className="text-xs text-slate-400">{doctor.rating} ({doctor.reviews})</Text>
            </View>
        </View>
        <TouchableOpacity className="size-10 rounded-full bg-white/5 items-center justify-center">
            <CalendarDays color="white" size={18} />
        </TouchableOpacity>
    </TouchableOpacity>
);
