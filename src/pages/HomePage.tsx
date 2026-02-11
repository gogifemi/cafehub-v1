import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { CafeList } from '../components/cafes/CafeList';
import { SearchBar } from '../components/cafes/SearchBar';
import { FilterBar } from '../components/cafes/FilterBar';

export const HomePage = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [minRating, setMinRating] = useState(4);
  const [onlyOpenNow, setOnlyOpenNow] = useState(false);

  const cafes = useMemo(() => getMockCafesForLanguage(i18n.language), [i18n.language]);

  const filteredCafes = useMemo(() => {
    return cafes.filter((cafe) => {
      const matchesQuery =
        !query ||
        cafe.name.toLowerCase().includes(query.toLowerCase()) ||
        cafe.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));

      const matchesCity = !city || cafe.city === city;

      const matchesRating = cafe.rating >= minRating;

      const matchesOpen = !onlyOpenNow || cafe.isOpenNow;

      return matchesQuery && matchesCity && matchesRating && matchesOpen;
    });
  }, [cafes, query, city, minRating, onlyOpenNow]);

  return (
    <section>
      <div className="flex flex-col gap-3 pb-4 pt-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
            {t('home.heroTitle')}
          </h1>
          <p className="mt-1 max-w-xl text-sm text-text-muted">
            {t('home.heroSubtitle')}
          </p>
        </div>
        <div className="rounded-xl border border-status-info/30 bg-status-info/10 px-3 py-2 text-xs text-status-info">
          <p className="font-medium">{t('home.badgeTitle')}</p>
          <p className="text-status-info/80">{t('home.badgeBody')}</p>
        </div>
      </div>

      <SearchBar query={query} onQueryChange={setQuery} city={city} onCityChange={setCity} />
      <FilterBar
        minRating={minRating}
        onMinRatingChange={setMinRating}
        onlyOpenNow={onlyOpenNow}
        onOnlyOpenNowChange={setOnlyOpenNow}
      />

      <CafeList cafes={filteredCafes} />
    </section>
  );
};

