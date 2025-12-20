export interface HospitalItem {
    id: string;
    name: string;
    location: string;
    time: string;
    distance: string;
    rating: string;
    reviews: string;
    status: string;
    statusColor: string;
    type: string;
    image?: string;
}

export const HOSPITALS: HospitalItem[] = [
    {
        id: '1',
        name: 'University Health Center',
        location: 'Campus Blvd • Student Services',
        time: '5 min',
        distance: '0.2 mi',
        rating: '4.8',
        reviews: '340',
        status: 'OPEN',
        statusColor: 'bg-green-500',
        type: 'walk',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=200'
    },
    {
        id: '2',
        name: 'City General Hospital',
        location: '1200 Main St • Trauma Center',
        time: '12 min',
        distance: '3.5 mi',
        rating: '4.2',
        reviews: '85',
        status: 'EMERGENCY',
        statusColor: 'bg-red-500',
        type: 'car'
    },
    {
        id: '3',
        name: 'Advanced Dental Care',
        location: '45 West Ave • Orthodontics',
        time: '15 min',
        distance: '1.8 mi',
        rating: '4.9',
        reviews: '12',
        status: 'CLOSED',
        statusColor: 'bg-gray-500',
        type: 'bus'
    }
];
