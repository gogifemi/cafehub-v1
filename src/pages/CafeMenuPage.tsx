import { useState, useEffect, type ReactNode } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import {
  menuItems,
  getAllMenuItems,
  CATEGORY_ORDER,
  type MenuCategoryKey,
  type MenuItemWithCategory
} from '../data/mockMenuItems';
import { useOrder } from '../context/OrderContext';
import { CartDrawer } from '../components/order/CartDrawer';
import { useTableSession } from '../context/TableSessionContext';
import {
  CakeSlice,
  Coffee,
  Croissant,
  CupSoda,
  Flame,
  ShoppingCart,
  UtensilsCrossed
} from 'lucide-react';

const CATEGORY_ICONS: Record<MenuCategoryKey, ReactNode> = {
  coffees: <Coffee className="h-3 w-3" />,
  hotDrinks: <Flame className="h-3 w-3" />,
  coldDrinks: <CupSoda className="h-3 w-3" />,
  desserts: <CakeSlice className="h-3 w-3" />,
  breakfast: <Croissant className="h-3 w-3" />,
  meals: <UtensilsCrossed className="h-3 w-3" />
};

type MenuTab = 'all' | MenuCategoryKey;

interface TableState {
  tableLabel: string;
  capacity: number;
  area: string;
}

function getItemId(categoryKey: MenuCategoryKey, name: string): string {
  return `${categoryKey}-${name}`;
}

function getCardImageStyles(
  categoryKey: MenuCategoryKey
): { background: string; icon: ReactNode } {
  switch (categoryKey) {
    case 'coffees':
      return {
        background: 'bg-amber-800/30',
        icon: <Coffee className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />
      };
    case 'hotDrinks':
      return {
        background: 'bg-orange-800/30',
        icon: <Flame className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />
      };
    case 'coldDrinks':
      return {
        background: 'bg-blue-800/30',
        icon: <CupSoda className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />
      };
    case 'desserts':
      return {
        background: 'bg-rose-800/30',
        icon: <CakeSlice className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />
      };
    case 'breakfast':
      return {
        background: 'bg-yellow-800/30',
        icon: <Croissant className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />
      };
    case 'meals':
    default:
      return {
        background: 'bg-emerald-800/30',
        icon: <UtensilsCrossed className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />
      };
  }
}

export const CafeMenuPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<MenuTab>('coffees');
  const [cartOpen, setCartOpen] = useState(false);

  const tableState = location.state as TableState | null;
  const {
    tableNumber,
    setTable,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateItemNotes,
    clearCart,
    serviceFeeRate
  } = useOrder();
  const { session, isValid, setSession } = useTableSession();

  const cafes = getMockCafesForLanguage(i18n.language);
  const cafe = cafes.find((c) => c.id === id);

  useEffect(() => {
    if (!id) return;
    if (tableState?.tableLabel) {
      setTable(id, tableState.tableLabel);
      return;
    }
    if (!tableNumber && session && isValid && session.cafeId === id) {
      setTable(id, String(session.tableNumber));
    }
  }, [id, tableState?.tableLabel, setTable, tableNumber, session, isValid]);

  useEffect(() => {
    if (!id || !session || !isValid || session.cafeId !== id) return;
    if (!cartItems.length && (!session.cart || !session.cart.length)) return;

    const mapped = cartItems.map((item) => ({
      id: item.id,
      menuItemId: item.id,
      name: item.name,
      nameEn: item.name,
      price: item.price,
      quantity: item.quantity,
      notes: item.notes
    }));

    setSession((prev) => {
      if (!prev || prev.cafeId !== id) return prev;
      return {
        ...prev,
        cart: mapped
      };
    });
  }, [id, cartItems, isValid, session, setSession]);

  useEffect(() => {
    if (!id || !session || !isValid || session.cafeId !== id) return;
    if (!session.cart || session.cart.length === 0) return;
    if (cartItems.length > 0) return;

    clearCart();
    session.cart.forEach((item) => {
      const menuItemId = item.menuItemId || item.id;
      addToCart({ name: item.name, price: item.price }, item.quantity, menuItemId);
    });
  }, [id, session, isValid, cartItems.length, clearCart, addToCart]);

  if (!id) return null;

  const hasValidSessionForCafe = isValid && session?.cafeId === id;
  const displayTableNumber =
    tableNumber ||
    tableState?.tableLabel ||
    (hasValidSessionForCafe && session
      ? String(session.tableNumber)
      : '');
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const serviceFee = Math.round(subtotal * serviceFeeRate);
  const total = subtotal + serviceFee;
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const itemsForTab: MenuItemWithCategory[] =
    activeTab === 'all'
      ? getAllMenuItems()
      : menuItems[activeTab].map((item) => ({ ...item, categoryKey: activeTab }));

  const handleViewDetails = (event: React.MouseEvent, item: MenuItemWithCategory) => {
    if ((event.target as HTMLElement).closest('button')) return;

    const itemId = getItemId(item.categoryKey, item.name);
    navigate(`/cafe/${id}/menu/${itemId}`);
  };

  const getQuantity = (categoryKey: MenuCategoryKey, name: string) => {
    const itemId = getItemId(categoryKey, name);
    return cartItems.find((c) => c.id === itemId)?.quantity ?? 0;
  };

  const handleAdd = (item: { name: string; price: number }, categoryKey: MenuCategoryKey) => {
    addToCart(item, 1, getItemId(categoryKey, item.name));
  };

  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
      >
        {t('menu.back')}
      </button>

      {(tableState || hasValidSessionForCafe) && (
        <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent-strong">
          ✓ {t('qrApproval.approved')}
        </div>
      )}

      <header className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-1 flex-col gap-0.5">
          {cafe && <p className="text-sm text-text-muted">{cafe.name}</p>}
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
              {t('menu.title')}
            </h1>
            {displayTableNumber && (
              <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent">
                {t('menu.tableNo')} {displayTableNumber}
              </span>
            )}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative ml-auto rounded-full border border-border-subtle bg-surface p-2 text-text-muted hover:border-accent hover:text-text"
              aria-label={t('order.cart')}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span
                  className="absolute flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-core-white"
                  style={{ right: '-0.5rem', top: '-0.5rem' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Category tabs: All + categories */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
            activeTab === 'all'
              ? 'bg-accent text-core-white'
              : 'border border-border-subtle bg-surface text-text-muted hover:border-accent'
          }`}
        >
          {t('menu.categories.all')}
        </button>
        {CATEGORY_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
              activeTab === key
                ? 'bg-accent text-core-white'
                : 'border border-border-subtle bg-surface text-text-muted hover:border-accent'
            }`}
          >
            <span className="inline-flex items-center gap-1">
              {CATEGORY_ICONS[key]}
              <span>{t(`menu.categories.${key}`)}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Menu items as cards */}
      <div className="rounded-2xl border border-border-subtle bg-surface p-3 sm:p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {itemsForTab.map((item) => {
            const qty = getQuantity(item.categoryKey, item.name);
            const itemId = getItemId(item.categoryKey, item.name);
            const { background, icon } = getCardImageStyles(item.categoryKey);
            return (
              <article
                key={itemId}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-soft text-[11px] shadow-sm transition hover:border-accent hover:shadow-md"
                role="button"
                tabIndex={0}
                onClick={(event) => handleViewDetails(event, item)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleViewDetails(event as unknown as React.MouseEvent, item);
                  }
                }}
              >
                {/* Image / visual area */}
                <div
                  className={`flex h-36 w-full items-center justify-center ${background}`}
                >
                  {icon}
                </div>

                {/* Content – previous text-centric design */}
                <div className="flex flex-1 flex-col gap-2 p-2 sm:p-3">
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex-1 space-y-0.5">
                      <h2 className="truncate text-[11px] font-semibold text-text sm:text-xs">
                        {item.name}
                      </h2>
                      <p className="text-[10px] text-text-muted sm:text-[11px]">
                        {item.description}
                      </p>
                    </div>
                    <span className="ml-1 shrink-0 text-[11px] font-semibold text-accent sm:text-xs">
                      {item.price} TL
                    </span>
                  </div>

                  {item.popular && (
                    <div className="inline-flex items-center gap-1 self-start rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                      <Flame className="h-3 w-3" />
                      <span>Popüler</span>
                    </div>
                  )}

                  <div className="mt-auto pt-1">
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => handleAdd(item, item.categoryKey)}
                        className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-accent bg-accent/10 px-3 py-1.5 text-[11px] font-medium text-accent transition hover:bg-accent/20"
                      >
                        <Coffee className="h-3 w-3" />
                        {t('order.add')}
                      </button>
                    ) : (
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(itemId, qty - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-border-subtle bg-surface text-xs text-text transition hover:border-accent"
                          >
                            −
                          </button>
                          <span className="min-w-[1.5rem] text-center text-xs text-text">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(itemId, qty + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-border-subtle bg-surface text-xs text-text transition hover:border-accent"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(itemId)}
                          className="text-[10px] text-text-muted transition hover:text-text"
                        >
                          {t('order.remove')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        tableNumber={displayTableNumber}
        items={cartItems}
        subtotal={subtotal}
        serviceFee={serviceFee}
        total={total}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onUpdateItemNotes={updateItemNotes}
        onPlaceOrder={() => navigate(`/cafe/${id}/order/summary`)}
      />
    </section>
  );
};
