import { HOSPITALS, HospitalItem } from '@/constants/hospitals';
import { useRouter } from 'expo-router';
import {
  Bell,
  Bus,
  Car,
  ChevronDown,
  Footprints,
  Heart,
  Map as MapIcon,
  MapPin,
  Search,
  SlidersHorizontal,
  Star
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const CATEGORIES = ['All', 'Emergency', 'General', 'Dental', 'Eye Care'];



export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const router = useRouter();

  const renderHospital = ({ item }: { item: HospitalItem }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      className="flex-row gap-3 rounded-2xl bg-[#1b2633] p-3 mb-4 border border-gray-800 shadow-sm"
      onPress={() => router.push({ pathname: '/hospital/[id]', params: { id: item.id } })}
    >
      {/* Image / Placeholder Section */}
      <View className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-800 relative">
        {item.image ? (
          <ImageBackground source={{ uri: item.image }} className="flex-1" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-slate-600 font-bold">MED</Text>
          </View>
        )}
        <View className={`absolute top-2 left-2 ${item.statusColor} px-2 py-0.5 rounded`}>
          <Text className="text-[10px] font-bold text-white">{item.status}</Text>
        </View>
        <TouchableOpacity className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20">
          <Heart color="white" size={16} />
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View className="flex-1 justify-between py-1">
        <View>
          <Text className="font-bold text-white text-base leading-tight">
            {item.name}
          </Text>
          <Text className="text-xs text-slate-400 mt-1" numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        <View className="flex-row items-center flex-wrap gap-x-3 gap-y-1">
          <View className="flex-row items-center gap-1">
            {item.type === 'walk' && <Footprints color="#137fec" size={14} />}
            {item.type === 'car' && <Car color="#94a3b8" size={14} />}
            {item.type === 'bus' && <Bus color="#94a3b8" size={14} />}
            <Text className="text-xs font-semibold text-slate-300">{item.time}</Text>
            <Text className="text-xs text-slate-500">({item.distance})</Text>
          </View>

          <View className="flex-row items-center gap-1 bg-yellow-400/10 px-1.5 py-0.5 rounded">
            <Star color="#facc15" size={12} fill="#facc15" />
            <Text className="text-xs font-bold text-yellow-500">{item.rating}</Text>
            <Text className="text-[10px] text-yellow-500/70">({item.reviews})</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#101922]">
      <StatusBar barStyle="light-content" />

      {/* Header Container */}
      <View className="bg-[#101922] border-b border-white/5 pb-3">
        {/* Top Nav */}
        <View className="flex-row items-center px-4 py-3 justify-between">
          <TouchableOpacity className="size-10 items-center justify-center rounded-full bg-white/5">
            {/* <ArrowLeft color="white" size={24} /> */}
          </TouchableOpacity>
          <View className="items-center">
            <Text className="text-white text-lg font-bold">Find Care</Text>
            <TouchableOpacity className="flex-row items-center gap-1 mt-0.5">
              <MapPin color="#137fec" size={14} />
              <Text className="text-xs font-medium text-[#137fec]">Near University Campus</Text>
              <ChevronDown color="#137fec" size={14} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="size-10 items-center justify-center rounded-full bg-white/5">
            <Bell color="white" size={24} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="px-4 mt-2">
          <View className="flex-row items-center bg-[#1b2633] h-12 px-4 rounded-2xl border border-slate-700">
            <Search color="#64748b" size={20} />
            <TextInput
              className="flex-1 text-white text-sm ml-3"
              placeholder="Doctors, specialties, hospitals..."
              placeholderTextColor="#4b5563"
            />
            <TouchableOpacity className="p-1.5 bg-white/5 rounded-lg">
              <SlidersHorizontal color="#64748b" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Horizontal Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 px-4 gap-2"
          contentContainerStyle={{ paddingRight: 32 }}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full mr-2 ${activeTab === cat ? 'bg-[#137fec]' : 'bg-[#1b2633] border border-slate-700'}`}
            >
              <Text className={`text-sm font-medium ${activeTab === cat ? 'text-white' : 'text-slate-400'}`}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Hospital List */}
      <View className="flex-1 px-4">
        <FlatList
          data={HOSPITALS}
          renderItem={renderHospital}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => (
            <View className="flex-row items-center justify-between py-4">
              <Text className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                Results (12)
              </Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="text-sm font-medium text-[#137fec]">Sort by: Distance</Text>
                <ChevronDown color="#137fec" size={16} />
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Floating Action Button */}
      <View className="absolute bottom-8 left-0 right-0 items-center">
        <TouchableOpacity
          className="flex-row items-center gap-2 bg-white px-6 py-3.5 rounded-full shadow-2xl"
          style={{ elevation: 8 }}
        >
          <MapIcon color="#101922" size={20} />
          <Text className="font-bold text-sm text-[#101922]">Map View</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}