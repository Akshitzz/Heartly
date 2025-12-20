import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Beaker,
    Calendar,
    ChevronRight,
    HelpCircle,
    Languages,
    Lock,
    Moon,
    PhoneCall,
    Pill,
    ScanFace,
    ShieldCheck,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
    // State for toggles
    const [appointments, setAppointments] = useState(true);
    const [refills, setRefills] = useState(true);
    const [labResults, setLabResults] = useState(false);
    const [faceId, setFaceId] = useState(true);
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#f6f7f8] dark:bg-[#101922]">
            <StatusBar barStyle="light-content" />

            {/* Top Navigation */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800/50 bg-white/90 dark:bg-[#101922]/90 backdrop-blur-md">
                <TouchableOpacity className="w-12 h-12 items-center justify-center" onPress={() => router.back()}>
                    <ArrowLeft color="#1e293b" size={24} className="dark:text-white" />
                </TouchableOpacity>
                <Text className="text-slate-900 dark:text-white text-lg font-bold flex-1 text-center">
                    Settings
                </Text>
                <TouchableOpacity className="w-12 items-end justify-center" onPress={() => router.back()}>
                    <Text className="text-[#137fec] text-base font-bold">Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View className="p-4">
                    <View className="items-center bg-white dark:bg-[#1C252E] rounded-2xl p-6 shadow-sm">
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?u=alex' }}
                            className="h-24 w-24 rounded-full border-2 border-[#137fec]/20"
                        />
                        <View className="items-center mt-3">
                            <Text className="text-slate-900 dark:text-white text-[22px] font-bold">Alex Johnson</Text>
                            <Text className="text-slate-500 dark:text-slate-400 text-sm mt-1">Student ID: 4829103</Text>
                            <TouchableOpacity className="mt-2" onPress={() => router.push('/profile/edit')}>
                                <Text className="text-[#137fec] text-sm font-medium">Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Notifications Section */}
                <SectionHeader title="Notifications" />
                <View className="mx-4 bg-white dark:bg-[#1C252E] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-transparent">
                    <SettingToggle
                        icon={<Calendar size={20} color="white" />}
                        iconBg="bg-blue-500"
                        label="Appointment Reminders"
                        value={appointments}
                        onValueChange={setAppointments}
                    />
                    <SettingToggle
                        icon={<Pill size={20} color="white" />}
                        iconBg="bg-teal-500"
                        label="Prescription Refills"
                        value={refills}
                        onValueChange={setRefills}
                    />
                    <SettingToggle
                        icon={<Beaker size={20} color="white" />}
                        iconBg="bg-purple-500"
                        label="Lab Results Ready"
                        value={labResults}
                        onValueChange={setLabResults}
                        last
                    />
                </View>

                {/* Security & Privacy Section */}
                <SectionHeader title="Security & Privacy" />
                <View className="mx-4 bg-white dark:bg-[#1C252E] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-transparent">
                    <SettingLink
                        icon={<Lock size={20} color="white" />}
                        iconBg="bg-orange-500"
                        label="Change Password"
                    />
                    <SettingToggle
                        icon={<ScanFace size={20} color="white" />}
                        iconBg="bg-green-500"
                        label="Face ID Login"
                        value={faceId}
                        onValueChange={setFaceId}
                    />
                    <SettingLink
                        icon={<ShieldCheck size={20} color="white" />}
                        iconBg="bg-indigo-500"
                        label="Two-Factor Authentication"
                        last
                    />
                </View>

                {/* Preferences Section */}
                <SectionHeader title="Preferences" />
                <View className="mx-4 bg-white dark:bg-[#1C252E] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-transparent">
                    <SettingLink
                        icon={<Languages size={20} color="white" />}
                        iconBg="bg-sky-500"
                        label="Language"
                        value="English"
                    />
                    <SettingLink
                        icon={<Moon size={20} color="white" />}
                        iconBg="bg-gray-600"
                        label="Appearance"
                        value="Dark"
                        last
                    />
                </View>

                {/* Support Section */}
                <SectionHeader title="Support & Emergency" />
                <View className="mx-4 bg-white dark:bg-[#1C252E] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-transparent">
                    <SettingLink
                        icon={<PhoneCall size={20} color="white" />}
                        iconBg="bg-red-500"
                        label="Emergency Contacts"
                    />
                    <SettingLink
                        icon={<HelpCircle size={20} color="white" />}
                        iconBg="bg-blue-400"
                        label="Help Center"
                        onPress={() => router.push('/profile/help')}
                        last
                    />
                </View>

                {/* Footer Actions */}
                <View className="px-4 py-8 items-center">
                    <TouchableOpacity
                        className="w-full rounded-2xl bg-white dark:bg-[#1C252E] h-14 items-center justify-center shadow-sm border border-red-100 dark:border-transparent active:scale-[0.98]"
                    >
                        <Text className="text-red-500 font-bold text-base">Log Out</Text>
                    </TouchableOpacity>
                    <Text className="text-slate-400 dark:text-slate-600 text-xs mt-6">
                        Version 2.4.0 (Build 302)
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Sub-components
const SectionHeader = ({ title }: any) => (
    <Text className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[1.5px] mt-6 mb-2 px-6">
        {title}
    </Text>
);

const SettingToggle = ({ icon, iconBg, label, value, onValueChange, last }: any) => (
    <View className={`flex-row items-center justify-between px-4 py-4 ${!last ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
        <View className="flex-row items-center flex-1 pr-4">
            <View className={`${iconBg} w-9 h-9 items-center justify-center rounded-xl`}>
                {icon}
            </View>
            <Text className="text-slate-900 dark:text-white text-base font-medium ml-3 flex-1" numberOfLines={1}>
                {label}
            </Text>
        </View>
        <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: '#cbd5e1', true: '#137fec' }}
            thumbColor={Platform.OS === 'ios' ? undefined : '#ffffff'}
        />
    </View>
);

const SettingLink = ({ icon, iconBg, label, value, last, onPress }: any) => (
    <TouchableOpacity
        className={`flex-row items-center justify-between px-4 py-4 active:bg-gray-50 dark:active:bg-white/5 ${!last ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
        onPress={onPress}
    >
        <View className="flex-row items-center flex-1 pr-4">
            <View className={`${iconBg} w-9 h-9 items-center justify-center rounded-xl`}>
                {icon}
            </View>
            <Text className="text-slate-900 dark:text-white text-base font-medium ml-3 flex-1" numberOfLines={1}>
                {label}
            </Text>
        </View>
        <View className="flex-row items-center">
            {value && <Text className="text-slate-500 dark:text-slate-400 text-sm mr-2">{value}</Text>}
            <ChevronRight color="#94a3b8" size={20} />
        </View>
    </TouchableOpacity>
);

export default SettingsScreen;
