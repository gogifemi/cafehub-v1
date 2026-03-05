import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction
} from 'react';

export interface SessionCartItem {
  id: string;
  menuItemId: string;
  name: string;
  nameEn: string;
  price: number;
  quantity: number;
  notes?: string;
  // Future-proof: allow arbitrary option payloads
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>;
}

export interface TableSession {
  cafeId: string;
  cafeName: string;
  tableId: string;
  tableNumber: string | number;
  tableArea?: string;
  scannedAt: Date;
  expiresAt: Date;
  isActive: boolean;
  cart: SessionCartItem[];
  orderId?: string;
  specialInstructions?: string;
}

interface TableSessionContextType {
  session: TableSession | null;
  setSession: Dispatch<SetStateAction<TableSession | null>>;
  clearSession: () => void;
  isValid: boolean;
  addToCart: (item: Omit<SessionCartItem, 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateItemNotes: (itemId: string, notes: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
}

const STORAGE_KEY = 'cafehub-table-session';

const TableSessionContext = createContext<TableSessionContextType | undefined>(undefined);

export const TableSessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<TableSession | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved) as {
        cafeId: string;
        cafeName: string;
        tableId: string;
        tableNumber: string | number;
        tableArea?: string;
        scannedAt: string;
        expiresAt: string;
        isActive: boolean;
        cart?: SessionCartItem[];
        orderId?: string;
        specialInstructions?: string;
      };
      const expiresAt = new Date(parsed.expiresAt);

      if (expiresAt > new Date()) {
        const restored: TableSession = {
          cafeId: parsed.cafeId,
          cafeName: parsed.cafeName,
          tableId: parsed.tableId,
          tableNumber: parsed.tableNumber,
          tableArea: parsed.tableArea,
          scannedAt: new Date(parsed.scannedAt),
          expiresAt,
          isActive: parsed.isActive,
          cart: Array.isArray(parsed.cart) ? parsed.cart : [],
          orderId: parsed.orderId,
          specialInstructions: parsed.specialInstructions
        };

        setSession(restored);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse table session', error);
    }
  }, []);

  useEffect(() => {
    try {
      if (session) {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...session,
            scannedAt: session.scannedAt.toISOString(),
            expiresAt: session.expiresAt.toISOString()
          })
        );
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }, [session]);

  const clearSession = () => {
    setSession(null);
  };

  const isValid = session ? session.expiresAt > new Date() && session.isActive : false;

  const addToCart = (item: Omit<SessionCartItem, 'id'>) => {
    const newItem: SessionCartItem = {
      ...item,
      id: `${item.menuItemId}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    };
    setSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cart: [...prev.cart, newItem]
      };
    });
  };

  const removeFromCart = (itemId: string) => {
    setSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cart: prev.cart.filter((item) => item.id !== itemId)
      };
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cart: prev.cart.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      };
    });
  };

  const updateItemNotes = (itemId: string, notes: string) => {
    setSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cart: prev.cart.map((item) =>
          item.id === itemId ? { ...item, notes } : item
        )
      };
    });
  };

  const clearCart = () => {
    setSession((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cart: []
      };
    });
  };

  const cartTotal =
    session?.cart.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;

  const cartItemCount =
    session?.cart.reduce((count, item) => count + item.quantity, 0) ?? 0;

  return (
    <TableSessionContext.Provider
      value={{
        session,
        setSession,
        clearSession,
        isValid,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemNotes,
        clearCart,
        cartTotal,
        cartItemCount
      }}
    >
      {children}
    </TableSessionContext.Provider>
  );
};

export const useTableSession = () => {
  const context = useContext(TableSessionContext);
  if (context === undefined) {
    throw new Error('useTableSession must be used within TableSessionProvider');
  }
  return context;
};

