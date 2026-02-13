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
  coffees: '📋',
  brews: '☕',
  breakfast: '🥐',
  desserts: '🍰',
  coldDrinks: '🥤',
  food: '🍔'
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
          {t('menu.all')}
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
            {CATEGORY_ICONS[key]} {t(`menu.${key}`)}
          </button>
        ))}
      </div>

      {/* Menu items */}
      <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <ul className="space-y-4">
          {itemsForTab.map((item) => {
            const qty = getQuantity(item.categoryKey, item.name);
            const itemId = getItemId(item.categoryKey, item.name);
            return (
              <li
                key={itemId}
                className="flex flex-col gap-2 border-b border-border-subtle pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text">{item.name}</span>
                    {item.popular && (
                      <span className="text-coffee-500" title="Popular">
                        🔥
                      </span>
                    )}
                  </div>
                  <span className="shrink-0 text-sm font-medium text-text">{item.price} TL</span>
                </div>
                <p className="text-xs text-text-muted">{item.description}</p>
                <div className="flex items-center justify-between">
                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={() => handleAdd(item, item.categoryKey)}
                      className="inline-flex items-center gap-1 rounded-full border border-coffee-500 bg-coffee-500/10 px-3 py-1.5 text-xs font-medium text-coffee-600 hover:bg-coffee-500/20"
                    >
                      ➕ {t('order.add')}
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(itemId, qty - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-surface text-text hover:border-coffee-300"
                      >
                        −
                      </button>
                      <span className="min-w-[1.5rem] text-center text-sm text-text">{qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(itemId, qty + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-surface text-text hover:border-coffee-300"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(itemId)}
                        className="ml-1 text-xs text-text-muted hover:text-text"
                      >
                        {t('order.remove')}
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
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
