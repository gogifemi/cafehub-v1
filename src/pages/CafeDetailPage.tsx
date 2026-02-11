import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { Rating } from '../components/cafes/Rating';

export const CafeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const cafes = useMemo(() => getMockCafesForLanguage(i18n.language), [i18n.language]);
  const cafe = cafes.find((c) => c.id === id);

  if (!id) {
    return null;
  }

  if (!cafe) {
    return (
      <section className="space-y-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
        >
          {t('cafeDetail.back')}
        </button>
        <p className="text-sm text-text-muted">Cafe not found.</p>
      </section>
    );
  }

  const samplePhotos = [1, 2, 3, 4];
  const openingHours = [
    'Pazartesi - Cuma: 08:00 - 22:00',
    'Cumartesi: 09:00 - 23:00',
    'Pazar: 10:00 - 21:00'
  ];

  const menuItems = [
    { name: 'Espresso', price: '40 TL' },
    { name: 'Latte', price: '55 TL' },
    { name: 'Filtre Kahve', price: '45 TL' },
    { name: 'Cheesecake', price: '70 TL' }
  ];

  const reviews = [
    {
      author: 'Ayşe',
      rating: 5,
      text: 'Çalışmak için harika, sessiz ve kahveler çok iyi.'
    },
    {
      author: 'John',
      rating: 4.5,
      text: 'Great coffee and friendly staff. Wi‑Fi is stable.'
    }
  ];

  const onBack = () => {
    navigate('/');
  };

  const onReserve = () => {
    navigate(`/cafe/${cafe.id}/reserve`);
  };

  return (
    <section className="space-y-6">
      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
      >
        {t('cafeDetail.back')}
      </button>

      {/* Header */}
      <header className="space-y-3 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm shadow-black/40">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
              {cafe.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface-subtle px-2.5 py-1">
                <Rating value={cafe.rating} />
                <span className="text-[11px] text-text-subtle">
                  {t('cafes.reviews', { count: cafe.ratingCount })}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2.5 py-1">
                <span className="text-text-subtle">📍</span>
                <span className="text-xs text-text-muted">
                  {cafe.address}, {cafe.city}
                </span>
              </span>
            </div>
            <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-text-subtle">
              {cafe.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-subtle px-2 py-0.5 text-[11px] text-text-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
              >
                <span>📷</span>
                <span>{t('cafeDetail.scanQr')}</span>
              </button>
              <button
                type="button"
                onClick={onReserve}
                className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-core-black hover:bg-accent-soft"
              >
                <span>📅</span>
                <span>{t('cafeDetail.makeReservation')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Photos & amenities */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
          <p className="text-xs font-medium text-text-muted">{t('cafeDetail.photos')}</p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {samplePhotos.map((idx) => (
              <div
                key={idx}
                className="h-20 rounded-xl bg-bg-soft/60 shadow-inner shadow-black/30"
              />
            ))}
          </div>
        </div>
        <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
          <p className="text-xs font-medium text-text-muted">{t('cafeDetail.amenities')}</p>
          <ul className="mt-2 space-y-1 text-xs text-text-muted">
            <li>· Wi‑Fi</li>
            <li>· Quiet area</li>
            <li>· Power outlets</li>
            <li>· {cafe.category === 'bakery' ? 'Desserts' : 'Specialty coffee'}</li>
          </ul>
        </div>
      </div>

      {/* About & opening hours */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm md:col-span-2">
          <p className="text-xs font-medium text-text-muted">{t('cafeDetail.about')}</p>
          <p className="mt-1 text-sm text-text-muted">
            Bu kafe, üçüncü dalga kahve yaklaşımıyla özenle kavrulmuş çekirdekler, rahat oturma
            alanları ve uzun süre çalışmaya uygun sessiz bir atmosfer sunar.
          </p>
        </div>
        <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
          <p className="text-xs font-medium text-text-muted">
            {t('cafeDetail.openingHours')}
          </p>
          <ul className="mt-1 space-y-0.5 text-xs text-text-muted">
            {openingHours.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Menu & reviews */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
          <p className="text-xs font-medium text-text-muted">{t('cafeDetail.menu')}</p>
          <ul className="mt-1 space-y-1 text-xs text-text-muted">
            {menuItems.map((item) => (
              <li key={item.name} className="flex items-center justify-between">
                <span>{item.name}</span>
                <span className="text-text-subtle">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm md:col-span-2">
          <p className="text-xs font-medium text-text-muted">{t('cafeDetail.reviews')}</p>
          <div className="mt-2 space-y-2">
            {reviews.map((review) => (
              <div
                key={review.author}
                className="rounded-xl border border-border-subtle bg-bg-soft px-3 py-2 text-xs text-text-muted"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-text">{review.author}</p>
                  <Rating value={review.rating} />
                </div>
                <p className="mt-1">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location map placeholder */}
      <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <p className="text-xs font-medium text-text-muted">{t('cafeDetail.location')}</p>
        <div className="mt-2 h-40 rounded-xl border border-dashed border-border-subtle bg-bg-soft text-center text-xs text-text-subtle flex items-center justify-center">
          Map placeholder
        </div>
      </div>
    </section>
  );
};

