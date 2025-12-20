export interface DoctorItem {
    id: string;
    name: string;
    role: string;
    rating: string;
    reviews: string;
    experience: string;
    patients: string;
    about: string;
    hospitalId: string;
    image?: string;
    initials: string;
}

export const DOCTORS: DoctorItem[] = [
    {
        id: '1',
        name: 'Dr. Sarah Jenkins',
        role: 'Senior Cardiologist',
        rating: '4.8',
        reviews: '120',
        experience: '8 yrs',
        patients: '500+',
        about: 'Dr. Sarah Jenkins is a highly skilled Senior Cardiologist with over 8 years of experience in student healthcare. She specializes in preventive medicine and cardiac health.',
        hospitalId: '1',
        initials: 'SJ'
    },
    {
        id: '2',
        name: 'Dr. Mike Ross',
        role: 'Neurologist',
        rating: '4.7',
        reviews: '89',
        experience: '5 yrs',
        patients: '300+',
        about: 'Dr. Mike Ross is a dedicated Neurologist focusing on neurological disorders and student mental health.',
        hospitalId: '1',
        initials: 'MR'
    },
    {
        id: '3',
        name: 'Dr. Emily Chen',
        role: 'Pediatrician',
        rating: '4.9',
        reviews: '210',
        experience: '10 yrs',
        patients: '1000+',
        about: 'Dr. Emily Chen loves treating children and has been a pediatrician for a decade.',
        hospitalId: '2',
        initials: 'EC'
    }
];
