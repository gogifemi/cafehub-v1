import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CakeSlice,
  Coffee,
  Croissant,
  CupSoda,
  Flame,
  ShoppingCart,
  UtensilsCrossed
} from 'lucide-react';
import {
  CATEGORY_ORDER,
  getAllMenuItems,
  type MenuCategoryKey,
  type MenuItemWithCategory
} from '../data/mockMenuItems';
import { useOrder } from '../context/OrderContext';

const CATEGORY_ICONS: Record<MenuCategoryKey, JSX.Element> = {
  coffees: <Coffee className="h-3 w-3" />,
  hotDrinks: <Flame className="h-3 w-3" />,
  coldDrinks: <CupSoda className="h-3 w-3" />,
  desserts: <CakeSlice className="h-3 w-3" />,
  breakfast: <Croissant className="h-3 w-3" />,
  meals: <UtensilsCrossed className="h-3 w-3" />
};

function getItemId(categoryKey: MenuCategoryKey, name: string): string {
  return `${categoryKey}-${name}`;
}

function getCardImageStyles(
  categoryKey: MenuCategoryKey
): { background: string; icon: JSX.Element } {
  switch (categoryKey) {
    case 'coffees':
      return {
        background: 'bg-amber-800/30',
        icon: <Coffee className="h-16 w-16 text-accent" />
      };
    case 'hotDrinks':
      return {
        background: 'bg-orange-800/30',
        icon: <Flame className="h-16 w-16 text-accent" />
      };
    case 'coldDrinks':
      return {
        background: 'bg-blue-800/30',
        icon: <CupSoda className="h-16 w-16 text-accent" />
      };
    case 'desserts':
      return {
        background: 'bg-rose-800/30',
        icon: <CakeSlice className="h-16 w-16 text-accent" />
      };
    case 'breakfast':
      return {
        background: 'bg-yellow-800/30',
        icon: <Croissant className="h-16 w-16 text-accent" />
      };
    case 'meals':
    default:
      return {
        background: 'bg-emerald-800/30',
        icon: <UtensilsCrossed className="h-16 w-16 text-accent" />
      };
  }
}

export const MenuItemDetailPage = () => {
  const { id, itemId } = useParams<{ id: string; itemId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useOrder();

  const allItems = useMemo(() => getAllMenuItems(), []);

  const item = useMemo<MenuItemWithCategory | undefined>(() => {
    if (!itemId) return undefined;
    return allItems.find(
      (candidate) => getItemId(candidate.categoryKey, candidate.name) === itemId
    );
  }, [allItems, itemId]);

  if (!id || !itemId) {
    return null;
  }

  if (!item) {
    return (
      <section className="space-y-4">
        <button
          type="button"
          onClick={() => navigate(`/cafe/${id}/menu`)}
          className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
        >
          {t('menu.back')}
        </button>
        <p className="text-sm text-text-muted">{t('menu.itemNotFound', 'Ürün bulunamadı')}</p>
      </section>
    );
  }

  const cartItemId = getItemId(item.categoryKey, item.name);
  const quantity = cartItems.find((cartItem) => cartItem.id === cartItemId)?.quantity ?? 0;
  const { background, icon } = getCardImageStyles(item.categoryKey);

  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={() => navigate(`/cafe/${id}/menu`)}
        className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
      >
        {t('menu.back')}
      </button>

      <article className="grid gap-6 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm shadow-black/40 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className={`flex h-40 w-full items-center justify-center rounded-2xl ${background}`}
          >
            {icon}
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-text-muted">
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2.5 py-0.5">
              {CATEGORY_ICONS[item.categoryKey]}
              <span>{t(`menu.categories.${item.categoryKey}`)}</span>
            </span>
            {item.popular && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-accent">
                <Flame className="h-3 w-3" />
                <span>Popüler seçim</span>
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <header className="space-y-1.5">
            <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
              {item.name}
            </h1>
            <p className="text-sm text-text-muted">{item.description}</p>
            <p className="text-lg font-semibold text-accent">{item.price} TL</p>
          </header>

          <div className="space-y-2 rounded-2xl bg-bg-soft px-3 py-2 text-xs text-text-muted">
            <p className="font-medium text-text">
              {t('menu.itemInfoTitle', 'Bu ürün hakkında')}
            </p>
            <p>
              {t(
                'menu.itemInfoBody',
                'CafeHub menüsünde özenle seçilmiş ürünlerden biridir. Siparişinizi verirken notlar bölümünde özel isteklerinizi belirtebilirsiniz.'
              )}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-2">
            {quantity === 0 ? (
              <button
                type="button"
                onClick={() => addToCart(item, 1, cartItemId)}
                className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-accent bg-accent px-3 py-2 text-sm font-medium text-core-white transition hover:bg-accent-soft"
              >
                <Coffee className="h-4 w-4" />
                {t('order.add')}
              </button>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(cartItemId, quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-surface text-sm text-text transition hover:border-accent"
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center text-sm text-text">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(cartItemId, quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-surface text-sm text-text transition hover:border-accent"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFromCart(cartItemId)}
                    className="text-xs text-text-muted underline-offset-2 hover:underline"
                  >
                    {t('order.remove')}
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => navigate(`/cafe/${id}/menu`)}
              className="inline-flex items-center justify-center gap-1 rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
            >
              <ShoppingCart className="h-3 w-3" />
              <span>{t('menu.backToList', 'Menüye geri dön')}</span>
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

