export type ProcessedTableShape = 'circle' | 'square' | 'rectangle' | 'booth' | 'barstool';

export type ProcessedTableArea =
  | 'indoor'
  | 'window'
  | 'garden'
  | 'outdoor'
  | 'bar'
  | 'terrace'
  | 'communal';

export type ProcessedElementType =
  | 'wall'
  | 'window'
  | 'door'
  | 'bar'
  | 'counter'
  | 'restroom'
  | 'plant'
  | 'roaster';

export interface ProcessedTable {
  id: string;
  tableNumber: string | number;
  position: {
    x: number;
    y: number;
  };
  shape: ProcessedTableShape;
  capacity: number;
  rotation?: number;
  area: ProcessedTableArea;
  /**
   * Human‑readable label for UI (e.g. localized area name).
   */
  areaLabel: string;
  /**
   * Simple availability status for mock data.
   * In a real system this would come from live availability.
   */
  status: 'available' | 'occupied';
}

export interface ProcessedElement {
  type: ProcessedElementType;
  path: { x: number; y: number }[];
  label?: string;
}

export interface ProcessedFloorPlan {
  gridSize: {
    cols: number;
    rows: number;
  };
  tables: ProcessedTable[];
  elements: ProcessedElement[];
}

