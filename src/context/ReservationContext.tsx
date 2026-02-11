import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type PaymentMethod = 'credit_card' | 'apple_google_pay' | 'debit_card' | null;

export type TableArea = 'window' | 'garden' | 'indoor' | 'outdoor';

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
}

const STORAGE_KEY = 'cafehub-reservation';

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
  createdAt: null
};

interface ReservationContextValue {
  state: ReservationState;
  setDetails: (partial: Partial<ReservationState>) => void;
  reset: (cafeId?: string | null) => void;
}

const ReservationContext = createContext<ReservationContextValue | undefined>(undefined);

const loadInitialState = (): ReservationState => {
  if (typeof window === 'undefined') return defaultState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as ReservationState;
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
};

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ReservationState>(() => loadInitialState());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  const setDetails = (partial: Partial<ReservationState>) => {
    setState((prev) => ({ ...prev, ...partial }));
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
      setDetails,
      reset
    }),
    [state]
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

