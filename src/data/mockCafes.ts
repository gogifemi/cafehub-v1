import type { Cafe } from '../types/cafe';

export const mockCafesTr: Cafe[] = [
  {
    id: '1',
    name: 'Demli & Köpüklü',
    rating: 4.8,
    ratingCount: 234,
    priceLevel: '$$',
    address: 'İstiklal Cd. No:120',
    city: 'Istanbul',
    distanceMinutesWalk: 6,
    isOpenNow: true,
    tags: ['Özel kahve', 'Wi‑Fi', 'Sessiz', 'Prizler'],
    category: 'work'
  },
  {
    id: '2',
    name: 'Üçüncü Dalga Hikâyeleri',
    rating: 4.6,
    ratingCount: 181,
    priceLevel: '$$',
    address: 'Moda Cd. No:18',
    city: 'Istanbul',
    distanceMinutesWalk: 12,
    isOpenNow: true,
    tags: ['Third wave', 'Pastalar', 'Evcil hayvan dostu'],
    category: 'specialty'
  },
  {
    id: '3',
    name: 'Erken Kuş Kavurucu',
    rating: 4.9,
    ratingCount: 96,
    priceLevel: '$$$',
    address: 'Tunalı Hilmi Cd. No:45',
    city: 'Ankara',
    distanceMinutesWalk: 5,
    isOpenNow: false,
    tags: ['Kavurucu', 'Brunch', 'Teras'],
    category: 'social'
  },
  {
    id: '4',
    name: 'Köşe Espresso Bar',
    rating: 4.3,
    ratingCount: 320,
    priceLevel: '$',
    address: 'Alsancak Kordonboyu',
    city: 'Izmir',
    distanceMinutesWalk: 3,
    isOpenNow: true,
    tags: ['Al-götür', 'Açık hava'],
    category: 'quick-bite'
  },
  {
    id: '5',
    name: 'Gece Fırını & Kahve',
    rating: 4.7,
    ratingCount: 142,
    priceLevel: '$$',
    address: 'Beşiktaş Çarşı',
    city: 'Istanbul',
    distanceMinutesWalk: 9,
    isOpenNow: true,
    tags: ['Fırın', 'Geç saat', 'Tatlılar'],
    category: 'bakery'
  }
];

export const mockCafesEn: Cafe[] = [
  {
    id: '1',
    name: 'Brew & Bloom',
    rating: 4.8,
    ratingCount: 234,
    priceLevel: '$$',
    address: 'Istiklal St. No:120',
    city: 'Istanbul',
    distanceMinutesWalk: 6,
    isOpenNow: true,
    tags: ['Specialty coffee', 'Wi‑Fi', 'Quiet', 'Outlets'],
    category: 'work'
  },
  {
    id: '2',
    name: 'Third Wave Stories',
    rating: 4.6,
    ratingCount: 181,
    priceLevel: '$$',
    address: 'Moda St. No:18',
    city: 'Istanbul',
    distanceMinutesWalk: 12,
    isOpenNow: true,
    tags: ['Third wave', 'Pastries', 'Pet friendly'],
    category: 'specialty'
  },
  {
    id: '3',
    name: 'Early Bird Roasters',
    rating: 4.9,
    ratingCount: 96,
    priceLevel: '$$$',
    address: 'Tunali Hilmi St. No:45',
    city: 'Ankara',
    distanceMinutesWalk: 5,
    isOpenNow: false,
    tags: ['Roastery', 'Brunch', 'Terrace'],
    category: 'social'
  },
  {
    id: '4',
    name: 'Corner Espresso Bar',
    rating: 4.3,
    ratingCount: 320,
    priceLevel: '$',
    address: 'Alsancak Seafront',
    city: 'Izmir',
    distanceMinutesWalk: 3,
    isOpenNow: true,
    tags: ['Grab & go', 'Outdoor'],
    category: 'quick-bite'
  },
  {
    id: '5',
    name: 'Midnight Bakery & Coffee',
    rating: 4.7,
    ratingCount: 142,
    priceLevel: '$$',
    address: 'Besiktas Market',
    city: 'Istanbul',
    distanceMinutesWalk: 9,
    isOpenNow: true,
    tags: ['Bakery', 'Late night', 'Desserts'],
    category: 'bakery'
  }
];

export const getMockCafesForLanguage = (language: string): Cafe[] => {
  const base = (language || 'tr').split('-')[0];

  if (base === 'en') {
    return mockCafesEn;
  }

  // For Turkish and all other languages, default to Turkish data
  return mockCafesTr;
};


