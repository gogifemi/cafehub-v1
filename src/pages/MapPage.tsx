import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons in React/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

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
          {cafes.map((cafe) => {
            const cafeWithCoords = cafe as typeof cafe & { lat?: number; lng?: number };

            // Only render marker if cafe has coordinates
            if (!cafeWithCoords.lat || !cafeWithCoords.lng) return null;

            const query = encodeURIComponent(`${cafe.name} ${cafe.address}`);
            const url = `https://www.google.com/maps/search/?api=1&query=${query}`;

            return (
              <Marker key={cafe.id} position={[cafeWithCoords.lat, cafeWithCoords.lng]}>
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
    </section>
  );
};