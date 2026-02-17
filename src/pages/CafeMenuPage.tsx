import { useState, useEffect } from 'react';
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

const CATEGORY_ICONS: Record<MenuCategoryKey, string> = {
  coffees: '☕',
  hotDrinks: '🔥',
  coldDrinks: '🥤',
  desserts: '🍰',
  breakfast: '🥐',
  meals: '🍽️'
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
): { background: string; emoji: string } {
  switch (categoryKey) {
    case 'coffees':
      return { background: 'bg-amber-800/30', emoji: '☕' };
    case 'hotDrinks':
      return { background: 'bg-orange-800/30', emoji: '🫖' };
    case 'coldDrinks':
      return { background: 'bg-blue-800/30', emoji: '🥤' };
    case 'desserts':
      return { background: 'bg-rose-800/30', emoji: '🍰' };
    case 'breakfast':
      return { background: 'bg-yellow-800/30', emoji: '🍳' };
    case 'meals':
    default:
      return { background: 'bg-emerald-800/30', emoji: '🥪' };
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
    serviceFeeRate
  } = useOrder();

  const cafes = getMockCafesForLanguage(i18n.language);
  const cafe = cafes.find((c) => c.id === id);

  useEffect(() => {
    if (id && tableState?.tableLabel) {
      setTable(id, tableState.tableLabel);
    }
  }, [id, tableState?.tableLabel, setTable]);

  if (!id) return null;

  const displayTableNumber = tableNumber || tableState?.tableLabel || '';
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const serviceFee = Math.round(subtotal * serviceFeeRate);
  const total = subtotal + serviceFee;
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const itemsForTab: MenuItemWithCategory[] =
    activeTab === 'all' ? getAllMenuItems() : menuItems[activeTab].map((item) => ({ ...item, categoryKey: activeTab }));

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
        onClick={() => navigate(`/cafe/${id}`)}
        className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
      >
        {t('menu.back')}
      </button>

      {tableState && (
        <div className="rounded-xl border border-coffee-500/30 bg-coffee-500/10 px-4 py-2 text-sm text-coffee-700">
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
              <span className="rounded-full bg-coffee-500/20 px-2.5 py-0.5 text-xs font-medium text-coffee-600">
                {t('menu.tableNo')} {displayTableNumber}
              </span>
            )}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative ml-auto rounded-full border border-border-subtle bg-surface p-2 text-text-muted hover:border-coffee-300 hover:text-text"
              aria-label={t('order.cart')}
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-coffee-500 text-[10px] font-medium text-core-white">
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
              ? 'bg-coffee-500 text-core-white'
              : 'border border-border-subtle bg-surface text-text-muted hover:border-coffee-300'
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
                ? 'bg-coffee-500 text-core-white'
                : 'border border-border-subtle bg-surface text-text-muted hover:border-coffee-300'
            }`}
          >
            {CATEGORY_ICONS[key]} {t(`menu.categories.${key}`)}
          </button>
        ))}
      </div>

      {/* Menu items as cards */}
      <div className="rounded-2xl border border-border-subtle bg-surface p-3 sm:p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {itemsForTab.map((item) => {
            const qty = getQuantity(item.categoryKey, item.name);
            const itemId = getItemId(item.categoryKey, item.name);
            const { background, emoji } = getCardImageStyles(item.categoryKey);
            return (
              <article
                key={itemId}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-soft text-[11px] shadow-sm transition hover:border-coffee-300 hover:shadow-md"
              >
                {/* Image / visual area */}
                <div
                  className={`flex h-36 w-full items-center justify-center ${background}`}
                >
                  <span className="text-3xl sm:text-4xl">{emoji}</span>
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
                    <span className="ml-1 shrink-0 text-[11px] font-semibold text-coffee-500 sm:text-xs">
                      {item.price} TL
                    </span>
                  </div>

                  {item.popular && (
                    <div className="inline-flex items-center gap-1 self-start rounded-full bg-coffee-500/10 px-2 py-0.5 text-[10px] font-medium text-coffee-600">
                      🔥 <span>Popüler</span>
                    </div>
                  )}

                  <div className="mt-auto pt-1">
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => handleAdd(item, item.categoryKey)}
                        className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-coffee-500 bg-coffee-500/10 px-3 py-1.5 text-[11px] font-medium text-coffee-600 transition hover:bg-coffee-500/20"
                      >
                        ☕ {t('order.add')}
                      </button>
                    ) : (
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(itemId, qty - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-border-subtle bg-surface text-xs text-text transition hover:border-coffee-300"
                          >
                            −
                          </button>
                          <span className="min-w-[1.5rem] text-center text-xs text-text">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(itemId, qty + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-border-subtle bg-surface text-xs text-text transition hover:border-coffee-300"
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
        onPlaceOrder={() => navigate(`/cafe/${id}/order/summary`)}
      />
    </section>
  );
};
