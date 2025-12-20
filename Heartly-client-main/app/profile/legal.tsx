import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    AlertCircle,
    ArrowLeft,
    CalendarX,
    CheckCircle2,
    ChevronDown,
    GraduationCap,
    History,
    Lock,
    Search,
    ShieldCheck,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const LegalScreen = () => {
    const { tab } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState((tab as string) || 'terms');
    const [expandedIndex, setExpandedIndex] = useState(0);
    const router = useRouter();

    const toggleAccordion = (index: number) => {
        setExpandedIndex(expandedIndex === index ? -1 : index);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#f6f7f8] dark:bg-[#101922]">
            <StatusBar barStyle="light-content" />

            {/* Header Section */}
            <View className="bg-white/90 dark:bg-[#101922]/90 border-b border-slate-200 dark:border-slate-800">
                <View className="flex-row items-center px-4 py-3">
                    <TouchableOpacity
                        className="w-10 h-10 items-center justify-center rounded-full active:bg-slate-200 dark:active:bg-slate-800"
                        onPress={() => router.back()}
                    >
                        <ArrowLeft color="#1e293b" size={24} className="dark:text-white" />
                    </TouchableOpacity>
                    <Text className="text-slate-900 dark:text-white text-lg font-bold flex-1 text-center pr-10">
                        Legal
                    </Text>
                </View>

                {/* Segmented Buttons */}
                <View className="px-4 pb-3">
                    <View className="flex-row h-10 w-full bg-slate-200 dark:bg-[#283039] rounded-lg p-1">
                        <TouchableOpacity
                            onPress={() => setActiveTab('terms')}
                            className={`flex-1 items-center justify-center rounded-md ${activeTab === 'terms' ? 'bg-white dark:bg-[#111418] shadow-sm' : ''}`}
                        >
                            <Text className={`text-sm font-medium ${activeTab === 'terms' ? 'text-[#137fec]' : 'text-slate-500 dark:text-[#9dabb9]'}`}>
                                Terms of Service
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActiveTab('privacy')}
                            className={`flex-1 items-center justify-center rounded-md ${activeTab === 'privacy' ? 'bg-white dark:bg-[#111418] shadow-sm' : ''}`}
                        >
                            <Text className={`text-sm font-medium ${activeTab === 'privacy' ? 'text-[#137fec]' : 'text-slate-500 dark:text-[#9dabb9]'}`}>
                                Privacy Policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 180 }}>
                {/* Search Bar */}
                <View className="px-4 py-4">
                    <View className="flex-row items-center h-12 bg-white dark:bg-[#283039] rounded-xl px-4 border border-slate-200 dark:border-transparent shadow-sm">
                        <Search color="#94a3b8" size={20} />
                        <TextInput
                            placeholder="Search keywords like 'refund'..."
                            placeholderTextColor="#94a3b8"
                            className="flex-1 ml-2 text-base text-slate-900 dark:text-white"
                        />
                    </View>
                </View>

                {/* Last Updated Badge */}
                <View className="items-center mb-4">
                    <View className="flex-row items-center bg-[#137fec]/10 px-3 py-1.5 rounded-full">
                        <History color="#137fec" size={14} className="mr-1" />
                        <Text className="text-[#137fec] text-xs font-medium">Last updated: Oct 24, 2023</Text>
                    </View>
                </View>

                {/* Legal Sections (Accordions) */}
                <View className="px-4 gap-y-4">
                    <AccordionItem
                        index={0}
                        expanded={expandedIndex === 0}
                        onPress={() => toggleAccordion(0)}
                        icon={<GraduationCap color="#137fec" size={18} />}
                        title="1. Eligibility & Student ID"
                        content="To use the Student Health Services, you must be a currently enrolled student. Verification requires a valid Student ID number. We reserve the right to suspend accounts that fail periodic eligibility checks."
                    />
                    <AccordionItem
                        index={1}
                        expanded={expandedIndex === 1}
                        onPress={() => toggleAccordion(1)}
                        icon={<CalendarX color="#137fec" size={18} />}
                        title="2. Appointment Cancellations"
                        content="Cancellations must be made at least 24 hours in advance. Failure to do so may result in a temporary hold on booking future appointments or a nominal fee charged to your student account."
                    />
                    <AccordionItem
                        index={2}
                        expanded={expandedIndex === 2}
                        onPress={() => toggleAccordion(2)}
                        icon={<AlertCircle color="#ef4444" size={18} />}
                        title="3. Emergency Disclaimer"
                        content="IF YOU HAVE A MEDICAL EMERGENCY, CALL 911 IMMEDIATELY. This app is not for emergency care. The chat and appointment features are for non-urgent student health matters only."
                        isEmergency
                    />
                    <AccordionItem
                        index={3}
                        expanded={expandedIndex === 3}
                        onPress={() => toggleAccordion(3)}
                        icon={<ShieldCheck color="#137fec" size={18} />}
                        title="4. User Conduct & Safety"
                        content="Users agree to treat all healthcare providers and staff with respect. Harassment, abuse, or inappropriate behavior on the platform will result in immediate termination."
                    />
                    <AccordionItem
                        index={4}
                        expanded={expandedIndex === 4}
                        onPress={() => toggleAccordion(4)}
                        icon={<Lock color="#137fec" size={18} />}
                        title="5. Data Privacy (HIPAA)"
                        content="Your health data is protected under HIPAA and FERPA regulations. We do not sell your personal data. We only share necessary info with authorized labs and pharmacies."
                    />

                    <View className="items-center mt-4">
                        <Text className="text-slate-400 dark:text-[#9dabb9] text-xs text-center leading-5 px-6">
                            By using this app, you acknowledge that you have read and understood our Terms of Service and Privacy Policy.
                        </Text>
                        <TouchableOpacity className="mt-2">
                            <Text className="text-[#137fec] text-sm font-medium">Contact Legal Support</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Footer */}
            <View className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-[#101922]/95 border-t border-slate-100 dark:border-slate-800">
                <TouchableOpacity
                    className="w-full h-14 bg-[#137fec] rounded-full flex-row items-center justify-center shadow-lg active:scale-[0.98]"
                    style={{ shadowColor: '#137fec', shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 }}
                    onPress={() => router.back()}
                >
                    <Text className="text-white text-base font-bold mr-2">Accept Terms</Text>
                    <CheckCircle2 color="white" size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-full mt-3 h-10 items-center justify-center"
                    onPress={() => router.back()}
                >
                    <Text className="text-slate-500 dark:text-[#9dabb9] text-sm font-medium">Decline</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const AccordionItem = ({ title, content, icon, expanded, onPress, isEmergency }: any) => (
    <View className="rounded-2xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#111418] overflow-hidden shadow-sm">
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-row items-center justify-between p-4"
        >
            <View className="flex-row items-center flex-1">
                <View className="w-8 h-8 rounded-full bg-[#137fec]/10 items-center justify-center">
                    {icon}
                </View>
                <Text className="ml-3 text-slate-900 dark:text-white text-base font-medium">{title}</Text>
            </View>
            <View style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}>
                <ChevronDown color="#94a3b8" size={20} />
            </View>
        </TouchableOpacity>

        {expanded && (
            <View className="px-4 pb-4">
                <View className="h-[1px] bg-slate-100 dark:bg-[#283039] mb-4" />
                <Text className={`text-sm leading-6 ${isEmergency ? 'text-slate-600 dark:text-[#9dabb9]' : 'text-slate-600 dark:text-[#9dabb9]'}`}>
                    {isEmergency ? (
                        <Text>
                            <Text className="font-bold text-red-500">IF YOU HAVE A MEDICAL EMERGENCY, CALL 911 IMMEDIATELY. </Text>
                            {content.replace('IF YOU HAVE A MEDICAL EMERGENCY, CALL 911 IMMEDIATELY. ', '')}
                        </Text>
                    ) : content}
                </Text>
            </View>
        )}
    </View>
);

export default LegalScreen;
