import { useRouter } from 'expo-router';
import {
    Calendar,
    Camera,
    ChevronRight,
    Lock,
    Plus,
    X
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProfileScreen = () => {
    const [bloodType, setBloodType] = useState('O+');
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#f6f7f8] dark:bg-[#101922]">
            <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'} />

            {/* Top App Bar */}
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#101922]/90 backdrop-blur-md">
                <TouchableOpacity className="w-20" onPress={() => router.back()}>
                    <Text className="text-[#137fec] text-base font-normal">Cancel</Text>
                </TouchableOpacity>
                <Text className="text-slate-900 dark:text-white text-lg font-bold flex-1 text-center">
                    Edit Profile
                </Text>
                <TouchableOpacity className="w-20 items-end" onPress={() => router.back()}>
                    <Text className="text-[#137fec] text-base font-bold">Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="max-w-md mx-auto w-full pb-12">

                    {/* Profile Header */}
                    <View className="items-center pt-8 pb-6 px-4">
                        <View className="relative">
                            <Image
                                source={{ uri: 'https://i.pravatar.cc/150?u=jane' }}
                                className="w-28 h-28 rounded-full border-4 border-white dark:border-[#1c242d]"
                            />
                            <TouchableOpacity
                                className="absolute bottom-0 right-0 bg-[#137fec] rounded-full p-2 border-4 border-[#f6f7f8] dark:border-[#101922]"
                                activeOpacity={0.8}
                            >
                                <Camera color="white" size={18} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity className="mt-4">
                            <Text className="text-[#137fec] text-base font-medium">Change Profile Photo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Section 1: Personal Details */}
                    <SectionHeader title="Personal Details" />
                    <View className="mx-4 bg-white dark:bg-[#1c242d] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/50">
                        <InputField label="First Name" value="Jane" />
                        <InputField label="Last Name" value="Doe" />
                        <View className="px-4 py-3 bg-slate-50 dark:bg-slate-800/30">
                            <View className="flex-row items-center mb-1">
                                <Text className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Student ID</Text>
                                <Lock color="#94a3b8" size={12} className="ml-1" />
                            </View>
                            <Text className="text-base text-slate-500 dark:text-slate-400">STU-2024-8892</Text>
                        </View>
                    </View>

                    {/* Section 2: Contact Info */}
                    <SectionHeader title="Contact Info" />
                    <View className="mx-4 bg-white dark:bg-[#1c242d] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/50">
                        <InputField label="Mobile Number" value="+1 (555) 123-4567" keyboardType="phone-pad" />
                        <InputField label="University Email" value="jane.doe@university.edu" keyboardType="email-address" />
                        <TouchableOpacity className="flex-row items-center justify-between px-4 py-3 active:bg-slate-50 dark:active:bg-slate-800/50">
                            <View>
                                <Text className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Campus Residence</Text>
                                <Text className="text-base text-slate-900 dark:text-white">North Hall, Room 304</Text>
                            </View>
                            <ChevronRight color="#94a3b8" size={20} />
                        </TouchableOpacity>
                    </View>

                    {/* Section 3: Health Profile */}
                    <SectionHeader title="Health Profile" />
                    <View className="mx-4 bg-white dark:bg-[#1c242d] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/50">
                        <TouchableOpacity className="flex-row items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700/50">
                            <View>
                                <Text className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Date of Birth</Text>
                                <Text className="text-base text-slate-900 dark:text-white">Mar 15, 2002</Text>
                            </View>
                            <Calendar color="#94a3b8" size={20} />
                        </TouchableOpacity>

                        <View className="px-4 py-3 border-b border-slate-100 dark:border-slate-700/50">
                            <Text className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">Gender Identity</Text>
                            <Text className="text-base text-slate-900 dark:text-white">Female</Text>
                        </View>

                        <View className="px-4 py-3 border-b border-slate-100 dark:border-slate-700/50">
                            <Text className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-2">Blood Type</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                                {['O+', 'A+', 'B+', 'AB+', 'O-', 'A-'].map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        onPress={() => setBloodType(type)}
                                        className={`mr-2 px-5 py-2 rounded-full border ${bloodType === type
                                                ? 'bg-[#137fec] border-[#137fec]'
                                                : 'bg-transparent border-slate-300 dark:border-slate-600'
                                            }`}
                                    >
                                        <Text className={`text-sm font-medium ${bloodType === type ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                            {type}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <View className="px-4 py-3">
                            <Text className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-2">Known Allergies</Text>
                            <View className="flex-row flex-wrap gap-2">
                                <View className="flex-row items-center bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg border border-red-100 dark:border-red-900/30">
                                    <Text className="text-sm font-medium text-red-600 dark:text-red-400 mr-1">Peanuts</Text>
                                    <TouchableOpacity>
                                        <X color="#ef4444" size={14} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity className="flex-row items-center bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <Plus color="#64748b" size={16} />
                                    <Text className="text-sm font-medium text-slate-600 dark:text-slate-300 ml-1">Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Section 4: Emergency Contact */}
                    <SectionHeader title="Emergency Contact" />
                    <View className="mx-4 bg-white dark:bg-[#1c242d] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800/50">
                        <InputField label="Full Name" value="Robert Doe" />
                        <InputField label="Relationship" value="Father" />
                        <InputField label="Mobile Number" value="+1 (555) 987-6543" last keyboardType="phone-pad" />
                    </View>

                    <Text className="text-xs text-slate-400 dark:text-slate-500 mt-6 px-8 text-center leading-5">
                        Your medical information is encrypted and shared only with authorized campus health personnel.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Helper Components
const SectionHeader = ({ title }: any) => (
    <Text className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-[1.5px] mt-6 mb-2 px-5">
        {title}
    </Text>
);

const InputField = ({ label, value, last, keyboardType = 'default' }: any) => (
    <View className={`px-4 py-3 ${!last ? 'border-b border-slate-100 dark:border-slate-700/50' : ''}`}>
        <Text className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1">{label}</Text>
        <TextInput
            defaultValue={value}
            keyboardType={keyboardType}
            className="text-base text-slate-900 dark:text-white p-0"
            placeholderTextColor="#94a3b8"
        />
    </View>
);

export default EditProfileScreen;
