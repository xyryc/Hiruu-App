import ScreenHeader from '@/components/header/ScreenHeader';
import StatusBadge from '@/components/ui/badges/StatusBadge';
import { EvilIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OverTimeRequest = () => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [selectedTab, setSelectedTab] = useState('Send Request');
    const [filter, setFilter] = useState<string>('all');
    const filterOptions = ['All', 'Accepted', 'Rejected', 'Pending'];
    const [searchQuery, setSearchQuery] = useState('');

    // Expanded requests array with type (send/receive)
    const requests = [
        {
            name: "Housekeeping Staff",
            date: "12 Jun, 2025",
            start: "9:00 PM",
            end: "12:00 PM",
            reason: "Helped close the store",
            hotel: "Hotel Paradise",
            status: "Accepted",
            type: "send", // 'send' means Send Request
        },
        {
            name: "Housekeeping Staff",
            date: "12 Jun, 2025",
            start: "9:00 PM",
            end: "12:00 PM",
            reason: "Extended work due to staff shortage",
            hotel: "Space Hotel",
            status: "Rejected",
            type: "send", // 'receive' means Received
        },
        {
            name: "Inventory Associate",
            date: "12 Jun, 2025",
            start: "9:00 PM",
            end: "12:00 PM",
            reason: "Completed closing tasks",
            hotel: "Hotel Paradise",
            status: "Accepted",
            type: "send",
        },
        {
            name: "Security Guard",
            date: "13 Jun, 2025",
            start: "10:00 PM",
            end: "1:00 AM",
            reason: "Extra shift due to safety concerns",
            hotel: "City View Hotel",
            status: "Pending",
            type: "receive",
        },
        {
            name: "Chef",
            date: "14 Jun, 2025",
            start: "8:00 PM",
            end: "11:00 PM",
            reason: "Overtime to prepare extra meals",
            hotel: "Gourmet Inn",
            status: "Accepted",
            type: "send",
        },
        {
            name: "Waiter",
            date: "15 Jun, 2025",
            start: "7:00 PM",
            end: "10:00 PM",
            reason: "Assisted during peak hours",
            hotel: "Blue Lagoon",
            status: "Pending",
            type: "receive",
        },
        {
            name: "Receptionist",
            date: "16 Jun, 2025",
            start: "9:00 PM",
            end: "12:00 AM",
            reason: "Handled emergency customer requests",
            hotel: "Skyline Resort",
            status: "Pending",
            type: "receive",
        }
    ];

    const filteredRequests = requests.filter(request => {
        const matchesStatus = filter === 'all' || request.status.toLowerCase() === filter;
        const matchesType = selectedTab === 'Send Request' ? request.type === 'send' : request.type === 'receive';
        const matchesSearch = request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.hotel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.reason.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesType && matchesSearch;
    });

    const getFilterCount = (filter: string) => {
        if (filter === 'all') return requests.length;
        return requests.filter(request => request.status.toLowerCase() === filter).length;
    };

    const renderItem = ({ item }: any) => (
        <View key={item.date} className="mx-5 border border-[#EEEEEE] mb-3 rounded-3xl p-4">
            {/* Name */}
            <Text className="font-proximanova-bold text-base text-primary dark:text-dark-primary">
                {item.name}
            </Text>

            {/* Date */}
            <View className='flex-row justify-between'>
                <Text className="text-primary dark:text-dark-primary">Date:</Text>
                <Text className="text-primary dark:text-dark-primary">{item.date}</Text>
            </View>

            {/* Overtime Start */}
            <View className='flex-row justify-between'>
                <Text className="text-primary dark:text-dark-primary">Overtime Start:</Text>
                <Text className="text-primary dark:text-dark-primary">{item.start}</Text>
            </View>

            {/* Overtime End */}
            <View className='flex-row justify-between'>
                <Text className="text-primary dark:text-dark-primary">Overtime End:</Text>
                <Text className="text-primary dark:text-dark-primary">{item.end}</Text>
            </View>

            {/* Reason */}
            <View className='flex-row justify-between'>
                <Text className="text-primary dark:text-dark-primary">Reason:</Text>
                <Text className="text-primary dark:text-dark-primary">{item.reason}</Text>
            </View>

            {/* Hotel */}
            <View className='flex-row justify-between'>
                <Text className="text-primary dark:text-dark-primary">Hotel:</Text>
                <Text className="text-primary dark:text-dark-primary">{item.hotel}</Text>
            </View>

            {/* Divider */}
            <View className='border-dashed border-b-2 my-4'></View>

            {/* Status & Actions */}
            <View className='flex-row justify-between'>
                <View className='flex-row gap-4'>
                    {/* Hotel Image */}
                    <Image
                        source={require('@/assets/images/hapinessBar.png')}
                        contentFit='contain'
                        style={{ height: 30, width: 30 }}
                    />
                    <Text className="mt-2 text-primary dark:text-dark-primary">{item.hotel}</Text>
                </View>
                <View>
                    {/* Conditional Rendering of Accept/Reject Buttons */}
                    {item.status === 'Pending' ? (
                        <View className='flex-row gap-2'>
                            <TouchableOpacity>
                                <View className='bg-[#F34F4F] px-3 py-2 rounded-3xl'>
                                    <Text className='text-white'>Reject</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View className='bg-[#11293A] px-3 py-2 rounded-3xl'>
                                    <Text className='text-white'>Accept</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <StatusBadge status={item.status} />
                    )}
                </View>
            </View>
        </View>
    );
    return (
        <SafeAreaView className="flex-1 bg-[#E5F4FD] dark:bg-dark-background" edges={["top", "left", "right"]}>
            {/* Header */}
            <ScreenHeader
                className="mx-5 rounded-3xl"
                onPressBack={() => router.back()}
                title="Overtime Request"
                titleClass="text-primary dark:text-dark-primary"
                iconColor={isDark ? '#fff' : '#111'}
                components={<></>}
            />

            {/* Tabs */}
            <View className="flex-row mx-5 mt-4 dark:bg-dark-background">
                {['Send Request', 'Received'].map(tab => (
                    <TouchableOpacity
                        className={`w-1/2 ${selectedTab === tab ? 'border-b-2 border-[#11293A] pb-5' : ''}`}
                        key={tab}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text className={`text-center dark:text-dark-primary ${selectedTab === tab ? 'font-proximanova-semibold' : 'font-proximanova-regular'}`}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View className=' flex-1 bg-white dark:bg-dark-background'>
                {/* Search Bar */}
                <View className="flex-row items-center border border-b mt-5 rounded-xl pl-3 p-1 border-[#EEEEEE] mx-5">
                    <EvilIcons name="search" size={24} color="black" />
                    <TextInput
                        placeholder="Search here..."
                        className="flex-1 text-gray-600 p-2"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Filter Buttons */}
                <View>
                    <FlatList
                        data={filterOptions}
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 16, marginVertical: 15 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => setFilter(item.toLowerCase())}
                                className={`py-2 px-4 border-1 border-[#EEEEEE] text-white rounded-full ${filter == item.toLowerCase() ? ' bg-[#11293A]' : ''}`}
                            >
                                <Text className={`text-center ${filter == item.toLowerCase() ? 'text-white dark:text-dark-primary' : 'dark:text-dark-primary text-primary'}`}>{item} ( {getFilterCount(item.toLowerCase())} )</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* FlatList to display requests */}
                <FlatList
                    data={filteredRequests}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.date + index}  // Use unique key (e.g., date + index)
                    contentContainerStyle={{ paddingBottom: 20 }}  // Ensure there's space at the bottom for scrolling
                />
            </View>
        </SafeAreaView>
    );
};

export default OverTimeRequest;
