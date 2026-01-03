import { useRouter } from 'expo-router';
import {
    AlertCircle,
    ArrowUp,
    Beaker,
    Bell,
    Calendar,
    ChevronRight,
    Contact2,
    CreditCard,
    Droplet,
    Edit2,
    HelpCircle,
    History,
    IdCard,
    Lock,
    LogOut,
    Pill,
    Scale,
    Settings,
    ShieldCheck
} from 'lucide-react-native';
import React from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
    const router = useRouter();
    return (
        <SafeAreaView className="flex-1 bg-[#101922]">
            <StatusBar barStyle="light-content" />

            {/* Top App Bar */}
            <View className="flex-row items-center justify-between px-4 py-3">
                <View className="w-8" />
                <Text className="text-lg font-bold text-white flex-1 text-center">
                    Profile
                </Text>
                <TouchableOpacity
                    className="w-8 items-center justify-center"
                    onPress={() => router.push('/profile/settings')}
                >
                    <Settings color="#137fec" size={24} />
                </TouchableOpacity>
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Profile Header */}
                <View className="items-center py-6">
                    <View className="relative">
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?u=alex' }}
                            className="h-32 w-32 rounded-full border-2 border-slate-800"
                        />
                        <TouchableOpacity
                            className="absolute bottom-0 right-0 bg-[#137fec] rounded-full p-2 border-4 border-[#101922]"
                            onPress={() => router.push('/profile/edit')}
                        >
                            <Edit2 color="white" size={16} />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-[22px] font-bold text-white mt-4">
                        Alex Johnson
                    </Text>
                    <Text className="text-[#9dabb9] text-base mt-1">
                        ID: STU-99283 | Biology Major
                    </Text>
                </View>

                {/* Vitals Stats (Horizontal Scroll) */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="pl-4 mb-6"
                >
                    <VitalCard icon={<Droplet color="#ef4444" size={20} />} label="Blood Type" value="O+" />
                    <VitalCard icon={<ArrowUp color="#137fec" size={20} />} label="Height" value="175cm" />
                    <VitalCard icon={<Scale color="#137fec" size={20} />} label="Weight" value="70kg" />
                    <VitalCard icon={<AlertCircle color="#f97316" size={20} />} label="Allergies" value="None" />
                    <View className="w-4" />
                </ScrollView>

                {/* At a Glance Section */}
                <View className="px-4 mb-4">
                    <Text className="text-lg font-bold text-white mb-3">At a Glance</Text>

                    {/* Next Appointment Card */}
                    <View className="flex-row bg-[#1c2127] rounded-2xl p-4 shadow-sm border dark:border-transparent">
                        <View className="flex-1 justify-center">
                            <View className="flex-row items-center mb-1">
                                <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                                <Text className="text-[#9dabb9] text-[10px] font-bold uppercase">Next Appointment</Text>
                            </View>
                            <Text className="text-white text-lg font-bold">Dr. Smith (General)</Text>
                            <View className="flex-row items-center mt-1">
                                <Calendar color="#137fec" size={16} />
                                <Text className="text-[#137fec] text-sm font-medium ml-1">Tomorrow, 10:00 AM</Text>
                            </View>
                        </View>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/150?u=drsmith' }}
                            className="w-20 h-20 rounded-xl"
                        />
                    </View>
                </View>

                {/* List Links */}
                <View className="px-4 gap-3">
                    <ListButton
                        icon={<Pill color="#137fec" />}
                        label="Active Prescriptions"
                        sub="Refills available"
                        badge="2 Active"
                    />
                    <ListButton
                        icon={<Beaker color="#a855f7" />}
                        label="Lab Results"
                        sub="Updated yesterday"
                        indicator
                    />
                </View>

                {/* Quick Actions Grid */}
                <View className="px-4 mt-8">
                    <Text className="text-lg font-bold text-white mb-3">Quick Actions</Text>
                    <View className="flex-row flex-wrap justify-between">
                        <ActionGridItem icon={<IdCard color="#137fec" size={30} />} label="Insurance Card" />
                        <ActionGridItem
                            icon={<Contact2 color="#dc2626" size={30} />}
                            label="Emergency Info"
                            emergency
                            onPress={() => router.push('/emergency/booking')}
                        />
                        <ActionGridItem icon={<History color="#137fec" size={30} />} label="Medical History" />
                        <ActionGridItem icon={<CreditCard color="#137fec" size={30} />} label="Payments" />
                    </View>
                </View>

                {/* Settings List */}
                <View className="px-4 mt-8">
                    <Text className="text-lg font-bold text-white mb-3">Settings</Text>
                    <View className="bg-[#1c2127] rounded-2xl overflow-hidden border border-slate-800">
                        <SettingsItem icon={<Bell color="#637588" size={20} />} label="Notifications" />
                        <SettingsItem
                            icon={<HelpCircle color="#637588" size={20} />}
                            label="Help & Support"
                            onPress={() => router.push('/profile/help')}
                        />
                        <SettingsItem icon={<Lock color="#637588" size={20} />} label="Privacy & Security" />
                        <SettingsItem
                            icon={<ShieldCheck color="#637588" size={20} />}
                            label="Terms & Policies"
                            onPress={() => router.push('/profile/legal')}
                        />
                        <SettingsItem icon={<LogOut color="#ef4444" size={20} />} label="Log Out" last danger />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Sub-components
const VitalCard = ({ icon, label, value }: any) => (
    <View className="bg-[#1c2127] border border-slate-200 dark:border-slate-700 rounded-2xl p-4 mr-3 min-w-[130px]">
        <View className="flex-row items-center mb-2">
            {icon}
            <Text className="text-[#9dabb9] text-xs font-medium ml-2">{label}</Text>
        </View>
        <Text className="text-lg font-bold text-white">{value}</Text>
    </View>
);

const ListButton = ({ icon, label, sub, badge, indicator }: any) => (
    <TouchableOpacity className="flex-row items-center justify-between bg-[#1c2127] p-4 rounded-2xl border border-transparent">
        <View className="flex-row items-center">
            <View className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center">
                {icon}
            </View>
            <View className="ml-3">
                <Text className="text-white font-semibold">{label}</Text>
                <Text className="text-[#9dabb9] text-[10px]">{sub}</Text>
            </View>
        </View>
        <View className="flex-row items-center">
            {badge && (
                <View className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-md mr-2">
                    <Text className="text-[#137fec] text-[10px] font-bold">{badge}</Text>
                </View>
            )}
            {indicator && <View className="h-2 w-2 rounded-full bg-red-500 mr-2" />}
            <ChevronRight color="#9dabb9" size={20} />
        </View>
    </TouchableOpacity>
);

const ActionGridItem = ({ icon, label, emergency, onPress }: any) => (
    <TouchableOpacity
        className={`w-[48%] items-center justify-center p-5 mb-3 rounded-2xl border ${emergency
            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50'
            : 'bg-[#1c2127] border-slate-800'
            }`}
        onPress={onPress}
    >
        {icon}
        <Text className={`text-sm font-medium mt-2 ${emergency ? 'text-red-700 dark:text-red-100' : 'text-white'}`}>
            {label}
        </Text>
    </TouchableOpacity>
);

const SettingsItem = ({ icon, label, last, danger, onPress }: any) => (
    <TouchableOpacity
        className={`flex-row items-center justify-between p-4 ${!last ? 'border-b border-slate-800' : ''}`}
        onPress={onPress}
    >
        <View className="flex-row items-center">
            {icon}
            <Text className={`ml-3 font-medium ${danger ? 'text-red-500' : 'text-white'}`}>{label}</Text>
        </View>
        {!danger && <ChevronRight color="#9dabb9" size={20} />}
    </TouchableOpacity>
);

export default ProfileScreen;
