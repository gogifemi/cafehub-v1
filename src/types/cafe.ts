export type CafeCategory = 'work' | 'social' | 'quick-bite' | 'specialty' | 'bakery';

export interface Cafe {
  id: string;
  name: string;
  rating: number; // 0-5
  ratingCount: number;
  priceLevel: '$' | '$$' | '$$$';
  address: string;
  city: string;
  distanceMinutesWalk: number;
  isOpenNow: boolean;
  tags: string[];
  category: CafeCategory;
}

