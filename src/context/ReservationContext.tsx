import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type PaymentMethod = 'credit_card' | 'debit_card' | 'troy' | 'bkm_express_paycell' | 'cash' | null;

export type TableArea = 'window' | 'garden' | 'indoor' | 'outdoor';
export type ReservationStatus = 'pending' | 'completed' | 'not_completed' | 'cancelled';

export interface ReservationState {
  cafeId: string | null;
  partySize: number | null;
  durationMinutes: number | null;
  tableId: string | null;
  tableLabel: string | null;
  tableArea: TableArea | null;
  notes: string;
  totalPrice: number | null;
  paymentMethod: PaymentMethod;
  cardLast4: string | null;
  reservationCode: string | null;
  transactionId: string | null;
  createdAt: string | null; // ISO string
  status: ReservationStatus;
}

export interface ReservationRecord extends ReservationState {
  id: string;
}

const STORAGE_KEY = 'cafehub-reservation';
const HISTORY_KEY = 'cafehub-reservation-history';

const defaultState: ReservationState = {
  cafeId: null,
  partySize: null,
  durationMinutes: null,
  tableId: null,
  tableLabel: null,
  tableArea: null,
  notes: '',
  totalPrice: null,
  paymentMethod: null,
  cardLast4: null,
  reservationCode: null,
  transactionId: null,
  createdAt: null,
  status: 'pending'
};

interface ReservationContextValue {
  state: ReservationState;
  reservations: ReservationRecord[];
  setDetails: (partial: Partial<ReservationState>) => void;
  addReservation: (record: ReservationRecord) => void;
  markReservationCompletedForTable: (cafeId: string, tableLabel: string) => void;
  updateReservationStatus: (id: string, status: ReservationStatus) => void;
  reset: (cafeId?: string | null) => void;
}

const ReservationContext = createContext<ReservationContextValue | undefined>(undefined);

const loadInitialState = (): ReservationState => {
  if (typeof window === 'undefined') return defaultState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as ReservationState;
    return { ...defaultState, ...parsed, status: parsed.status ?? 'pending' };
  } catch {
    return defaultState;
  }
};

const loadHistory = (): ReservationRecord[] => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ReservationRecord[];
    // Normalise status and sort newest first by createdAt
    return parsed
      .map((r) => ({
        ...r,
        status: r.status ?? 'pending'
      }))
      .filter((r) => !!r.createdAt)
      .sort(
        (a, b) =>
          new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
      );
  } catch {
    return [];
  }
};

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ReservationState>(() => loadInitialState());
  const [reservations, setReservations] = useState<ReservationRecord[]>(() => loadHistory());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  useEffect(() => {
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(reservations));
    } catch {
      // ignore storage errors
    }
  }, [reservations]);

  const setDetails = (partial: Partial<ReservationState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  };

  const addReservation = (record: ReservationRecord) => {
    setReservations((prev) => {
      const normalised: ReservationRecord = {
        ...record,
        status: record.status ?? 'pending'
      };

      const next = [
        normalised,
        ...prev.filter((r) => r.id !== normalised.id) // avoid simple duplicates
      ];

      return next
        .filter((r) => !!r.createdAt)
        .sort(
          (a, b) =>
            new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
        )
        .slice(0, 50); // keep last 50 to avoid unbounded growth
    });
  };

  const markReservationCompletedForTable = (cafeId: string, tableLabel: string) => {
    setReservations((prev) => {
      const idx = prev.findIndex(
        (r) =>
          r.cafeId === cafeId &&
          r.tableLabel === tableLabel &&
          r.status !== 'completed'
      );
      if (idx === -1) return prev;

      const next = [...prev];
      next[idx] = { ...next[idx], status: 'completed' };
      return next;
    });
  };

  const updateReservationStatus = (id: string, status: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const reset = (cafeId?: string | null) => {
    setState({
      ...defaultState,
      cafeId: cafeId ?? null
    });
  };

  const value = useMemo(
    () => ({
      state,
      reservations,
      setDetails,
      addReservation,
      markReservationCompletedForTable,
      updateReservationStatus,
      reset
    }),
    [state, reservations]
  );

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>;
};

export const useReservation = (): ReservationContextValue => {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return ctx;
};

