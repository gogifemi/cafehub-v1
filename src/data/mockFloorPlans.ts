import type { TableArea } from '../context/ReservationContext';

export type TableStatus = 'available' | 'occupied';

export interface Table {
  id: string;
  label: string;
  capacity: number;
  area: TableArea;
  status: TableStatus;
}

export interface FloorPlan {
  cafeId: string;
  tables: Table[];
}

// Simple mock floor plan used for all cafes for now.
const baseTables: Table[] = [
  { id: 't1', label: '1', capacity: 2, area: 'window', status: 'available' },
  { id: 't2', label: '2', capacity: 2, area: 'window', status: 'occupied' },
  { id: 't3', label: '3', capacity: 4, area: 'window', status: 'available' },
  { id: 't4', label: '4', capacity: 4, area: 'indoor', status: 'available' },
  { id: 't5', label: '5', capacity: 4, area: 'indoor', status: 'occupied' },
  { id: 't6', label: '6', capacity: 6, area: 'indoor', status: 'available' },
  { id: 't7', label: '7', capacity: 2, area: 'garden', status: 'available' },
  { id: 't8', label: '8', capacity: 2, area: 'garden', status: 'occupied' },
  { id: 't9', label: '9', capacity: 4, area: 'garden', status: 'available' },
  { id: 't10', label: '10', capacity: 6, area: 'garden', status: 'available' },
  { id: 't11', label: '11', capacity: 2, area: 'outdoor', status: 'available' },
  { id: 't12', label: '12', capacity: 4, area: 'outdoor', status: 'occupied' },
  { id: 't13', label: '13', capacity: 6, area: 'outdoor', status: 'available' }
];

export const getFloorPlanForCafe = (cafeId: string): FloorPlan => {
  // For now, all cafes share the same base plan.
  return {
    cafeId,
    tables: baseTables
  };
};

