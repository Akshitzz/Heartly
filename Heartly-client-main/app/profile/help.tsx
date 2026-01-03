import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    FileText,
    Mail,
    MessageCircle,
    MinusCircle,
    Play,
    PlusCircle,
    Search,
    Stethoscope
} from 'lucide-react-native';
import React from 'react';
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FAQ_DATA: Record<string, { question: string; answer: string }[]> = {
    'Top Questions': [
        {
            question: 'How do I reschedule an appointment?',
            answer: 'To reschedule, go to the Appointments tab, select the upcoming appointment you wish to change, and tap "Reschedule". You can choose a new date and time from the available slots.'
        },
        {
            question: 'Where can I find my lab results?',
            answer: 'Your lab results are available in your Profile under "Lab Results". You will receive a notification when new results are ready.'
        },
        {
            question: 'How do I refill a prescription?',
            answer: 'Navigate to Profile > Active Prescriptions. Select the medication you need and tap "Request Refill". Your doctor will review the request within 24 hours.'
        },
    ],
    'Appointments': [
        {
            question: 'How do I book a new appointment?',
            answer: 'Go to the Home tab and tap on "Find Care" or select a doctor from the list. Choose a suitable time slot and confirm your booking.'
        },
        {
            question: 'What is the cancellation policy?',
            answer: 'You can cancel up to 2 hours before your appointment time without any penalty. Late cancellations may incur a fee.'
        },
        {
            question: 'Can I book a virtual consultation?',
            answer: 'Yes, look for the video icon next to the doctor\'s name. These doctors offer remote consultations via the app.'
        }
    ],
    'Prescriptions': [
        {
            question: 'How long does a refill take?',
            answer: 'Most refill requests are approved within 24 hours. Your pharmacy will notify you when it is ready for pickup.'
        },
        {
            question: 'Can I change my preferred pharmacy?',
            answer: 'Yes, go to Profile > Settings > Pharmacy Details to update your preferred pharmacy location.'
        }
    ],
    'Insurance': [
        {
            question: 'Is my university insurance accepted?',
            answer: 'Yes, we accept all major university insurance plans. You can verify your coverage details in Profile > Insurance Card.'
        },
        {
            question: 'How do I add a new insurance card?',
            answer: 'Go to Profile > Insurance Card and tap the "Add New Card" button. You can scan your card or enter details manually.'
        }
    ]
};

const HelpSupportScreen = () => {
    const router = useRouter();
    const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = React.useState('Top Questions');

    const currentFaqs = FAQ_DATA[selectedCategory] || FAQ_DATA['Top Questions'];

    return (
        <SafeAreaView className="flex-1 bg-[#f6f7f8] dark:bg-[#101922]">
            <StatusBar barStyle="light-content" />

            {/* Top App Bar */}
            <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-slate-800 bg-white/90 dark:bg-[#101922]/90">
                <TouchableOpacity
                    className="w-10 h-10 items-center justify-center rounded-full active:bg-black/5 dark:active:bg-white/5"
                    onPress={() => router.back()}
                >
                    <ArrowLeft color="#111418" size={24} className="dark:text-white" />
                </TouchableOpacity>
                <Text className="text-[#111418] dark:text-white text-lg font-bold flex-1 text-center">
                    Help & Support
                </Text>
                <TouchableOpacity
                    className="bg-red-500/10 px-3 py-1.5 rounded-full"
                    onPress={() => router.push('/emergency/booking')}
                >
                    <Text className="text-red-500 text-sm font-bold">Emergency</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header & Search */}
                <View className="px-4 pt-6 pb-2">
                    <Text className="text-[#111418] dark:text-white text-[28px] font-bold leading-tight mb-4">
                        How can we help?
                    </Text>
                    <View className="flex-row items-center bg-white dark:bg-[#293039] rounded-xl px-4 h-12 shadow-sm">
                        <Search color="#637588" size={20} />
                        <TextInput
                            placeholder="Search for articles, guides..."
                            placeholderTextColor="#637588"
                            className="flex-1 ml-2 text-base text-[#111418] dark:text-white"
                        />
                    </View>
                </View>

                {/* Quick Actions Grid */}
                <View className="pt-5">
                    <Text className="text-[#111418] dark:text-white text-xl font-bold px-4 pb-3">
                        Quick Actions
                    </Text>
                    <View className="flex-row flex-wrap px-4 justify-between">
                        {/* Live Chat */}
                        <TouchableOpacity className="w-[48.5%] aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                            <ImageBackground
                                source={{ uri: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=500' }}
                                className="flex-1 p-4 justify-between"
                            >
                                <LinearGradient
                                    colors={['rgba(19, 127, 236, 0.2)', 'rgba(19, 127, 236, 0.8)']}
                                    className="absolute inset-0"
                                />
                                <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center backdrop-blur-md">
                                    <MessageCircle color="white" size={20} />
                                </View>
                                <View>
                                    <Text className="text-white font-bold text-base">Live Chat</Text>
                                    <Text className="text-white/80 text-xs">Wait time: ~2m</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                        {/* Email */}
                        <TouchableOpacity className="w-[48.5%] aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                            <ImageBackground
                                source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500' }}
                                className="flex-1 p-4 justify-between"
                            >
                                <LinearGradient
                                    colors={['rgba(88, 28, 135, 0.2)', 'rgba(88, 28, 135, 0.8)']}
                                    className="absolute inset-0"
                                />
                                <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center backdrop-blur-md">
                                    <Mail color="white" size={20} />
                                </View>
                                <View>
                                    <Text className="text-white font-bold text-base">Email Support</Text>
                                    <Text className="text-white/80 text-xs">Response in 24h</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                        {/* Nurse Hotline */}
                        <TouchableOpacity className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-3">
                            <ImageBackground
                                source={{ uri: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800' }}
                                className="flex-1 p-4 justify-between"
                            >
                                <LinearGradient
                                    colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.8)']}
                                    className="absolute inset-0"
                                />
                                <View className="flex-row justify-between items-start">
                                    <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center backdrop-blur-md">
                                        <Stethoscope color="white" size={20} />
                                    </View>
                                    <View className="bg-red-500 px-2 py-1 rounded-full">
                                        <Text className="text-white text-[10px] font-bold uppercase">Urgent</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text className="text-white font-bold text-base">24/7 Nurse Hotline</Text>
                                    <Text className="text-white/80 text-xs">Immediate medical advice</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-4 pl-4">
                    {Object.keys(FAQ_DATA).map((cat, i) => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => setSelectedCategory(cat)}
                            className={`mr-3 px-5 py-2 rounded-full border ${selectedCategory === cat ? 'bg-[#137fec] border-[#137fec]' : 'bg-white dark:bg-[#293039] border-gray-200 dark:border-transparent'
                                }`}
                        >
                            <Text className={`text-sm font-medium ${selectedCategory === cat ? 'text-white' : 'text-[#637588] dark:text-[#9dabb9]'}`}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <View className="w-4" />
                </ScrollView>

                {/* FAQ List */}
                <View className="px-4">
                    <Text className="text-[#111418] dark:text-white text-xl font-bold pb-3 pt-4">{selectedCategory}</Text>
                    {currentFaqs.map((item, i) => (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.8}
                            onPress={() => setExpandedFaq(expandedFaq === i ? null : i)}
                            className="bg-white dark:bg-[#293039] rounded-xl mb-2 overflow-hidden"
                        >
                            <View className="flex-row items-center justify-between p-4">
                                <Text className="text-[#111418] dark:text-white font-medium text-sm flex-1 mr-2 leading-snug">
                                    {item.question}
                                </Text>
                                {expandedFaq === i ? (
                                    <MinusCircle color="#137fec" size={20} />
                                ) : (
                                    <PlusCircle color="#9dabb9" size={20} />
                                )}
                            </View>
                            {expandedFaq === i && (
                                <View className="px-4 pb-4">
                                    <Text className="text-[#637588] dark:text-[#9dabb9] text-sm leading-relaxed">
                                        {item.answer}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity className="py-2 mb-6">
                        <Text className="text-[#137fec] font-medium text-sm text-center">View all FAQs</Text>
                    </TouchableOpacity>
                </View>

                {/* Guides & Resources */}
                <View className="pb-32">
                    <Text className="text-[#111418] dark:text-white text-xl font-bold px-4 mb-3">Guides & Resources</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
                        <GuideCard title="How to request a refill" type="Video • 2 min" isVideo />
                        <GuideCard title="App User Guide: Getting Started" type="Article • 5 min read" />
                        <GuideCard title="Understanding Billing" type="Article • 3 min read" />
                        <View className="w-4" />
                    </ScrollView>
                </View>
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity
                className="absolute bottom-6 right-6 w-14 h-14 bg-[#137fec] rounded-full items-center justify-center shadow-lg shadow-black/40 active:scale-95"
                style={{ elevation: 5 }}
            >
                <MessageCircle color="white" size={28} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// Sub-component for Guide Cards
const GuideCard = ({ title, type, isVideo }: any) => (
    <TouchableOpacity className="w-56 mr-3">
        <View className="w-full aspect-video rounded-xl bg-gray-200 dark:bg-gray-800 overflow-hidden items-center justify-center">
            <ImageBackground
                source={{ uri: `https://picsum.photos/seed/${title}/400/225` }}
                className="absolute inset-0"
            />
            <View className="absolute inset-0 bg-black/30" />
            <View className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center">
                {isVideo ? <Play color="white" size={20} fill="white" /> : <FileText color="white" size={20} />}
            </View>
        </View>
        <Text className="text-sm font-bold text-[#111418] dark:text-white mt-2" numberOfLines={2}>{title}</Text>
        <Text className="text-xs text-[#637588] dark:text-[#9dabb9] mt-1">{type}</Text>
    </TouchableOpacity>
);

export default HelpSupportScreen;
