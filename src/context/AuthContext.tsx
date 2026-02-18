import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from 'react';

export interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface PastOrder {
  id: string;
  cafeId: string;
  cafeName: string;
  cafeImage?: string | null;
  date: string;
  tableNumber: number;
  total: number;
  status: 'completed';
  items: OrderItem[];
  paymentMethod: string;
  cardLast4?: string | null;
  subtotal: number;
  serviceFee: number;
  vat: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  birthDate: string | null;
  memberSince: string;
  favorites: string[];
  orders: PastOrder[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  addFavorite: (cafeId: string) => void;
  removeFavorite: (cafeId: string) => void;
  updateProfile: (data: Partial<Pick<User, 'name' | 'email' | 'phone' | 'birthDate'>>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const MOCK_USER: User = {
  id: 'user-1',
  name: 'Ahmet Yılmaz',
  email: 'ahmet@email.com',
  phone: '0532 123 4567',
  avatar: null,
  birthDate: '1990-05-15',
  memberSince: '2025-01-15',
  favorites: ['coffee-sapiens-moda', 'kronotrop-besiktas', 'fazil-bey-kadikoy'],
  orders: [
    {
      id: 'ord-001',
      cafeId: 'coffee-sapiens-moda',
      cafeName: 'Coffee Sapiens',
      cafeImage: '/placeholders/cafe1.jpg',
      date: '2026-02-10T14:30:00',
      tableNumber: 7,
      total: 245,
      status: 'completed',
      items: [
        { name: 'Türk Kahvesi', quantity: 2, unitPrice: 45 },
        { name: 'Baklava', quantity: 1, unitPrice: 75 },
        { name: 'Su', quantity: 2, unitPrice: 10 }
      ],
      paymentMethod: 'Kredi Kartı',
      cardLast4: '4242',
      subtotal: 220,
      serviceFee: 15,
      vat: 10
    },
    {
      id: 'ord-002',
      cafeId: 'kronotrop-besiktas',
      cafeName: 'Kronotrop',
      cafeImage: '/placeholders/cafe3.jpg',
      date: '2026-02-05T12:00:00',
      tableNumber: 3,
      total: 180,
      status: 'completed',
      items: [
        { name: 'Filtre Kahve', quantity: 2, unitPrice: 45 },
        { name: 'Cheesecake', quantity: 1, unitPrice: 85 }
      ],
      paymentMethod: 'Apple Pay',
      cardLast4: null,
      subtotal: 175,
      serviceFee: 3,
      vat: 2
    },
    {
      id: 'ord-003',
      cafeId: 'fazil-bey-kadikoy',
      cafeName: 'Fazıl Bey',
      cafeImage: '/placeholders/cafe5.jpg',
      date: '2026-01-28T10:00:00',
      tableNumber: 2,
      total: 120,
      status: 'completed',
      items: [
        { name: 'Türk Kahvesi', quantity: 2, unitPrice: 45 },
        { name: 'Su', quantity: 2, unitPrice: 10 }
      ],
      paymentMethod: 'Nakit',
      cardLast4: null,
      subtotal: 110,
      serviceFee: 5,
      vat: 5
    }
  ]
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: MOCK_USER,
    isAuthenticated: true
  });

  const login = useCallback(async (_email: string, _password: string, _remember?: boolean) => {
    await new Promise((r) => setTimeout(r, 300));
    setState({ user: MOCK_USER, isAuthenticated: true });
  }, []);

  const loginWithGoogle = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 300));
    setState({ user: MOCK_USER, isAuthenticated: true });
  }, []);

  const loginWithApple = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 300));
    setState({ user: MOCK_USER, isAuthenticated: true });
  }, []);

  const signup = useCallback(
    async (data: { name: string; email: string; phone?: string; password: string }) => {
      await new Promise((r) => setTimeout(r, 300));
      setState({
        user: {
          ...MOCK_USER,
          name: data.name,
          email: data.email,
          phone: data.phone ?? null
        },
        isAuthenticated: true
      });
    },
    []
  );

  const logout = useCallback(() => {
    setState({ user: null, isAuthenticated: false });
  }, []);

  const addFavorite = useCallback((cafeId: string) => {
    setState((prev) => {
      if (!prev.user || prev.user.favorites.includes(cafeId)) return prev;
      return {
        ...prev,
        user: {
          ...prev.user,
          favorites: [...prev.user.favorites, cafeId]
        }
      };
    });
  }, []);

  const removeFavorite = useCallback((cafeId: string) => {
    setState((prev) => {
      if (!prev.user) return prev;
      return {
        ...prev,
        user: {
          ...prev.user,
          favorites: prev.user.favorites.filter((id) => id !== cafeId)
        }
      };
    });
  }, []);

  const updateProfile = useCallback(
    (data: Partial<Pick<User, 'name' | 'email' | 'phone' | 'birthDate'>>) => {
      setState((prev) => {
        if (!prev.user) return prev;
        return {
          ...prev,
          user: { ...prev.user, ...data }
        };
      });
    },
    []
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      loginWithGoogle,
      loginWithApple,
      signup,
      logout,
      addFavorite,
      removeFavorite,
      updateProfile
    }),
    [
      state,
      login,
      loginWithGoogle,
      loginWithApple,
      signup,
      logout,
      addFavorite,
      removeFavorite,
      updateProfile
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
