import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { getMockCafesForLanguage } from '../data/mockCafes';

export const MapPage = () => {
  const { t, i18n } = useTranslation();
  const cafes = useMemo(() => getMockCafesForLanguage(i18n.language), [i18n.language]);

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          {t('map.title', 'Harita')}
        </h1>
        <p className="text-sm text-text-muted">
          {t(
            'map.subtitle',
            'Cafehub sistemindeki kafelerin konumlarını sadece kendi işaretçileriyle gör.'
          )}
        </p>
      </header>

      {/* Minimal, custom “map” surface that only shows our cafes as pins.
          Each pin opens that cafe directly in Google Maps. */}
      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br from-surface via-bg-soft to-surface shadow-sm">
        <div className="relative h-[420px] w-full">
          <div className="pointer-events-none absolute inset-8 rounded-2xl border border-dashed border-border-subtle/70" />

          <div className="relative flex h-full w-full flex-wrap items-center justify-center gap-4 px-6 py-6">
            {cafes.map((cafe, index) => {
              const query = encodeURIComponent(`${cafe.name} ${cafe.address}`);
              const url = `https://www.google.com/maps/search/?api=1&query=${query}`;

              return (
                <a
                  key={cafe.id}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-w-[9rem] max-w-[12rem] cursor-pointer flex-col items-start gap-1 rounded-xl bg-surface/95 px-3 py-2 text-left shadow-sm ring-1 ring-border-subtle transition hover:-translate-y-0.5 hover:bg-surface-subtle hover:shadow-md hover:ring-accent"
                >
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/10 text-[10px] text-accent">
                      {index + 1}
                    </span>
                    {cafe.city}
                  </span>
                  <span className="line-clamp-1 text-xs font-medium text-text">{cafe.name}</span>
                  <span className="line-clamp-2 text-[10px] text-text-muted">{cafe.address}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

