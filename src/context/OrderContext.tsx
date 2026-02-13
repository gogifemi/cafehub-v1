import React, { createContext, useContext, useCallback, useMemo, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export type OrderStatus =
  | 'idle'
  | 'received'
  | 'preparing'
  | 'ready'
  | 'delivered'
  | 'cancelled';

export interface PlacedOrder {
  orderId: string;
  tableNumber: string;
  items: CartItem[];
  status: OrderStatus;
  specialInstructions: string;
  subtotal: number;
  serviceFee: number;
  total: number;
  createdAt: string;
}

interface OrderState {
  cafeId: string | null;
  tableId: string | null;
  tableNumber: string;
  cartItems: CartItem[];
  orderId: string | null;
  placedOrder: PlacedOrder | null;
  orderStatus: OrderStatus;
  specialInstructions: string;
  serviceFeeRate: number;
  paymentMethod: string | null;
}

interface OrderContextValue extends OrderState {
  addToCart: (item: { name: string; price: number }, quantity: number, itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setTable: (cafeId: string, tableNumber: string, tableId?: string) => void;
  setSpecialInstructions: (notes: string) => void;
  placeOrder: () => PlacedOrder | null;
  updateOrderStatus: (status: OrderStatus) => void;
  cancelOrder: () => void;
  setPaymentMethod: (method: string | null) => void;
  resetOrder: () => void;
}

const defaultState: OrderState = {
  cafeId: null,
  tableId: null,
  tableNumber: '',
  cartItems: [],
  orderId: null,
  placedOrder: null,
  orderStatus: 'idle',
  specialInstructions: '',
  serviceFeeRate: 0.1,
  paymentMethod: null
};

const OrderContext = createContext<OrderContextValue | undefined>(undefined);

function generateOrderId(): string {
  return String(1000 + Math.floor(Math.random() * 9000));
}

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<OrderState>(defaultState);

  const addToCart = useCallback(
    (item: { name: string; price: number }, quantity: number, itemId: string) => {
      setState((prev) => {
        const existing = prev.cartItems.find((c) => c.id === itemId);
        const newItems = existing
          ? prev.cartItems.map((c) =>
              c.id === itemId ? { ...c, quantity: c.quantity + quantity } : c
            )
          : [
              ...prev.cartItems,
              { id: itemId, name: item.name, price: item.price, quantity }
            ];
        return { ...prev, cartItems: newItems };
      });
    },
    []
  );

  const removeFromCart = useCallback((itemId: string) => {
    setState((prev) => ({
      ...prev,
      cartItems: prev.cartItems.filter((c) => c.id !== itemId)
    }));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setState((prev) => ({
        ...prev,
        cartItems: prev.cartItems.filter((c) => c.id !== itemId)
      }));
      return;
    }
    setState((prev) => ({
      ...prev,
      cartItems: prev.cartItems.map((c) =>
        c.id === itemId ? { ...c, quantity } : c
      )
    }));
  }, []);

  const clearCart = useCallback(() => {
    setState((prev) => ({ ...prev, cartItems: [] }));
  }, []);

  const setTable = useCallback((cafeId: string, tableNumber: string, tableId?: string) => {
    setState((prev) => ({
      ...prev,
      cafeId,
      tableId: tableId ?? null,
      tableNumber
    }));
  }, []);

  const setSpecialInstructions = useCallback((notes: string) => {
    setState((prev) => ({ ...prev, specialInstructions: notes }));
  }, []);

  const placeOrder = useCallback((): PlacedOrder | null => {
    let order: PlacedOrder | null = null;
    setState((prev) => {
      if (prev.cartItems.length === 0) return prev;
      const subtotal = prev.cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
      const serviceFee = Math.round(subtotal * prev.serviceFeeRate);
      const total = subtotal + serviceFee;
      order = {
        orderId: generateOrderId(),
        tableNumber: prev.tableNumber,
        items: [...prev.cartItems],
        status: 'received',
        specialInstructions: prev.specialInstructions,
        subtotal,
        serviceFee,
        total,
        createdAt: new Date().toISOString()
      };
      return {
        ...prev,
        cartItems: [],
        orderId: order.orderId,
        placedOrder: order,
        orderStatus: 'received'
      };
    });
    return order;
  }, []);

  const updateOrderStatus = useCallback((status: OrderStatus) => {
    setState((prev) => ({
      ...prev,
      orderStatus: status,
      placedOrder: prev.placedOrder
        ? { ...prev.placedOrder, status }
        : null
    }));
  }, []);

  const cancelOrder = useCallback(() => {
    setState((prev) => ({
      ...prev,
      orderStatus: 'cancelled',
      placedOrder: prev.placedOrder
        ? { ...prev.placedOrder, status: 'cancelled' as OrderStatus }
        : null
    }));
  }, []);

  const setPaymentMethod = useCallback((method: string | null) => {
    setState((prev) => ({ ...prev, paymentMethod: method }));
  }, []);

  const resetOrder = useCallback(() => {
    setState(defaultState);
  }, []);

  const value = useMemo<OrderContextValue>(
    () => ({
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setTable,
      setSpecialInstructions,
      placeOrder,
      updateOrderStatus,
      cancelOrder,
      setPaymentMethod,
      resetOrder
    }),
    [
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setTable,
      setSpecialInstructions,
      placeOrder,
      updateOrderStatus,
      cancelOrder,
      setPaymentMethod,
      resetOrder
    ]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = (): OrderContextValue => {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return ctx;
};
