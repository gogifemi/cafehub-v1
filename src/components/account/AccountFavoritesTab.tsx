import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { getMockCafesForLanguage } from '../../data/mockCafes';
import { CafeCard } from '../cafes/CafeCard';
export function AccountFavoritesTab() {
  const { t, i18n } = useTranslation();
  const { user, removeFavorite } = useAuth();
  const allCafes = useMemo(() => getMockCafesForLanguage(i18n.language), [i18n.language]);
  const favoriteCafes = useMemo(
    () => (user?.favorites ?? []).map((id) => allCafes.find((c) => c.id === id)).filter(Boolean),
    [user?.favorites, allCafes]
  ) as typeof allCafes;

  if (!user) return null;

  if (favoriteCafes.length === 0) {
    return (
      <section>
        <h2 className="mb-4 text-lg font-semibold text-text">{t('account.favorites.title')}</h2>
        <div className="rounded-2xl border border-dashed border-border-subtle bg-surface-subtle px-6 py-12 text-center">
          <p className="text-text-muted">{t('account.favorites.empty')}</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-lg bg-accent px-4 py-2.5 font-medium text-bg transition hover:bg-accent-soft"
          >
            {t('account.favorites.browse')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-text">{t('account.favorites.title')}</h2>
      <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteCafes.map((cafe) => (
          <CafeCard
            key={cafe.id}
            cafe={cafe}
            variant="favorite"
            isFavorite
            onToggleFavorite={() => removeFavorite(cafe.id)}
          />
        ))}
      </div>
    </section>
  );
}
