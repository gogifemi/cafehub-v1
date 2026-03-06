import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { useAuth } from '../context/AuthContext';
import { Heart, MapPin, Star } from 'lucide-react';
import type { Cafe } from '../types/cafe';

// Fix default marker icons in React/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom cafe pin using a Lucide-style coffee icon rendered via a divIcon
const createCafeIcon = (isSelected: boolean) => {
  const baseColor = isSelected ? '#ff7518' : '#6F4E37';

  return L.divIcon({
    html: `
      <div style="
        background-color: ${baseColor};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          style="transform: rotate(45deg)">
          <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
          <line x1="6" y1="2" x2="6" y2="4"/>
          <line x1="10" y1="2" x2="10" y2="4"/>
          <line x1="14" y1="2" x2="14" y2="4"/>
        </svg>
      </div>
    `,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

interface MapSelectionControllerProps {
  selectedCafeId: string | null;
  cafes: Cafe[];
}

// Keeps the leaflet map in sync with the currently selected cafe from the list.
const MapSelectionController = ({ selectedCafeId, cafes }: MapSelectionControllerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!selectedCafeId) return;

    const cafe = cafes.find((c) => c.id === selectedCafeId) as
      | (Cafe & { lat?: number; lng?: number })
      | undefined;

    if (!cafe || cafe.lat == null || cafe.lng == null) return;

    map.flyTo([cafe.lat, cafe.lng], 16, {
      duration: 1.1
    });
  }, [selectedCafeId, cafes, map]);

  return null;
};

export const MapPage = () => {
  const { t, i18n } = useTranslation();
  const cafes = useMemo(() => getMockCafesForLanguage(i18n.language), [i18n.language]);
  const { user, addFavorite, removeFavorite } = useAuth();
  const favoriteIds = user?.favorites ?? [];
  const [selectedCafeId, setSelectedCafeId] = useState<string | null>(null);

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

      <div className="overflow-hidden rounded-2xl border border-border-subtle shadow-sm">
        <MapContainer
          center={[41.0082, 28.9784]}
          zoom={12}
          style={{ width: '100%', height: '420px' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapSelectionController selectedCafeId={selectedCafeId} cafes={cafes} />

          {cafes.map((cafe) => {
            const cafeWithCoords = cafe as typeof cafe & { lat?: number; lng?: number };
            const isSelected = cafe.id === selectedCafeId;

            // Only render marker if cafe has coordinates
            if (!cafeWithCoords.lat || !cafeWithCoords.lng) return null;

            const query = encodeURIComponent(`${cafe.name} ${cafe.address}`);
            const url = `https://www.google.com/maps/search/?api=1&query=${query}`;

            return (
              <Marker
                key={cafe.id}
                position={[cafeWithCoords.lat, cafeWithCoords.lng]}
                icon={createCafeIcon(isSelected)}
              >
                <Popup>
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">{cafe.name}</p>
                    <p className="text-xs text-gray-500">{cafe.address}</p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-500 hover:underline"
                    >
                      Google Maps'te aç →
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <section aria-label={t('map.cafesListTitle', 'Cafehub kafeleri')}>
        <h2 className="mb-3 text-lg font-semibold text-text">
          {t('map.cafesListTitle', 'Cafehub kafeleri')}
        </h2>
        <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
          {cafes.map((cafe) => {
            const isFavorite = favoriteIds.includes(cafe.id);
            const handleToggleFavorite = () => {
              if (isFavorite) {
                removeFavorite(cafe.id);
              } else {
                addFavorite(cafe.id);
              }
            };

            const query = encodeURIComponent(`${cafe.name} ${cafe.address}`);
            const url = `https://www.google.com/maps/search/?api=1&query=${query}`;

            return (
              <article
                key={cafe.id}
                onClick={() => setSelectedCafeId(cafe.id)}
                className={`cursor-pointer rounded-2xl border p-4 shadow-sm transition ${
                  isFavorite ? 'border-accent bg-accent-soft/10 shadow-md' : 'border-border-subtle bg-surface'
                }`}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-text">{cafe.name}</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2 py-0.5 text-[11px] text-text-subtle">
                        <MapPin className="h-3 w-3" />
                        {cafe.city}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2 py-0.5 text-[11px] text-text-subtle">
                        {cafe.priceLevel}
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">
                      {cafe.address}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3 w-3 text-accent" />
                        <span className="font-medium text-text">
                          {cafe.rating.toFixed(1)}
                        </span>
                      </span>
                      <span className="text-text-subtle">
                        {t('cafes.reviews', { count: cafe.ratingCount })}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-3 sm:mt-0">
                    <button
                      type="button"
                      onClick={handleToggleFavorite}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
                        isFavorite
                          ? 'border-[#ff6b35]/60 bg-[#ff6b35]/10 text-[#ff6b35]'
                          : 'border-border-subtle bg-surface-subtle text-text-subtle hover:border-[#ff6b35]/60 hover:text-[#ff6b35]'
                      }`}
                      aria-label={
                        isFavorite
                          ? t('cafes.removeFavorite', 'Favorilerden çıkar')
                          : t('cafes.addFavorite', 'Favorilere ekle')
                      }
                    >
                      <Heart
                        className="h-4 w-4"
                        strokeWidth={1.8}
                        fill={isFavorite ? 'currentColor' : 'none'}
                      />
                    </button>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text hover:border-border-strong hover:text-text"
                    >
                      {t('map.openInGoogleMaps', "Google Maps'te aç")}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
};