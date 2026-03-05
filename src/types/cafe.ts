import type { ProcessedFloorPlan } from './floorPlan';

export type CafeCategory = 'work' | 'social' | 'quick-bite' | 'specialty' | 'bakery';

export interface Cafe {
  id: string;
  name: string;
  rating: number; // 0-5
  ratingCount: number;
  priceLevel: '$' | '$$' | '$$$';
  address: string;
  city: string;
  /**
   * Optional approximate coordinates used by the map experience
   * to place a marker for the cafe.
   */
  lat?: number;
  lng?: number;
  distanceMinutesWalk: number;
  isOpenNow: boolean;
  tags: string[];
  category: CafeCategory;
  /**
   * Pre‑processed floor plan used by the reservation system.
   * In production this would come from the backend, but for now
   * it is mocked per‑cafe.
   */
  processedFloorPlan: ProcessedFloorPlan;
}

