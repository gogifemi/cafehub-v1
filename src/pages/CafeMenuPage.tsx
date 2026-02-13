import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { menuItems, type MenuCategoryKey } from '../data/mockMenuItems';

const CATEGORY_ORDER: MenuCategoryKey[] = [
  'coffees',
  'brews',
  'breakfast',
  'desserts',
  'coldDrinks',
  'food'
];

const CATEGORY_ICONS: Record<MenuCategoryKey, string> = {
  coffees: '📋',
  brews: '☕',
  breakfast: '🥐',
  desserts: '🍰',
  coldDrinks: '🥤',
  food: '🍔'
};

interface TableState {
  tableLabel: string;
  capacity: number;
  area: string;
}

export const CafeMenuPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<MenuCategoryKey>('coffees');

  const tableState = location.state as TableState | null;
  const cafes = getMockCafesForLanguage(i18n.language);
  const cafe = cafes.find((c) => c.id === id);

  if (!id) return null;

  const items = menuItems[activeCategory];

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

      <header className="flex flex-wrap items-center gap-2">
        <div className="flex flex-1 flex-col gap-0.5">
          {cafe && (
            <p className="text-sm text-text-muted">{cafe.name}</p>
          )}
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
              {t('menu.title')}
            </h1>
            {tableState && (
              <span className="rounded-full bg-coffee-500/20 px-2.5 py-0.5 text-xs font-medium text-coffee-600">
                {t('menu.tableNo')} {tableState.tableLabel}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Category tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {CATEGORY_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveCategory(key)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
              activeCategory === key
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
          {items.map((item) => (
            <li
              key={item.name}
              className="flex flex-col gap-0.5 border-b border-border-subtle pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text">{item.name}</span>
                  {item.popular && (
                    <span className="text-coffee-500" title="Popular">
                      ★
                    </span>
                  )}
                </div>
                <span className="shrink-0 text-sm font-medium text-text">
                  {item.price} TL
                </span>
              </div>
              <p className="text-xs text-text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
