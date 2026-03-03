import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useReservation, type ReservationStatus } from '../../context/ReservationContext';
import { getMockCafesForLanguage } from '../../data/mockCafes';

function isReservationActive(createdAt: string | null, durationMinutes: number | null) {
  if (!createdAt || !durationMinutes) return false;
  const start = new Date(createdAt).getTime();
  const end = start + durationMinutes * 60_000;
  const now = Date.now();
  return now >= start && now <= end;
}

export function AccountReservationsTab() {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const { reservations, updateReservationStatus } = useReservation();
  const navigate = useNavigate();
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);

  if (!isAuthenticated || !user) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-text-muted">
          {t(
            'account.reservations.loginRequired',
            'Rezervasyonlarınızı görmek için giriş yapın'
          )}{' '}
          / Please log in to see your reservations
        </p>
        <Link
          to="/login"
          className="mt-4 inline-block rounded-lg bg-accent px-6 py-2 text-sm font-medium text-core-white hover:bg-accent-soft"
        >
          {t('auth.login', 'Giriş Yap')} / Log In
        </Link>
      </div>
    );
  }

  const cafes = useMemo(() => getMockCafesForLanguage(i18n.language), [i18n.language]);

  if (!reservations.length) {
    return (
      <section>
        <h2 className="mb-4 text-lg font-semibold text-text">
          {t('account.reservations.title', 'Rezervasyonlarım')}
        </h2>
        <div className="rounded-2xl border border-dashed border-border-subtle bg-surface-subtle px-6 py-12 text-center">
          <p className="text-text-muted">
            {t('account.reservations.empty', 'Henüz bir rezervasyonunuz yok')}
          </p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-core-white transition hover:bg-accent-soft"
          >
            {t('account.reservations.explore', 'Kafeleri Keşfet')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-text">
        {t('account.reservations.title', 'Rezervasyonlarım')}
      </h2>

      <div className="space-y-3">
        {reservations.map((reservation, index) => {
          const cafe = cafes.find((c) => c.id === reservation.cafeId);
          const dateStr =
            reservation.createdAt &&
            new Intl.DateTimeFormat(i18n.language || 'tr', {
              dateStyle: 'medium',
              timeStyle: 'short'
            }).format(new Date(reservation.createdAt));

          const computeStatus = (): ReservationStatus => {
            if (reservation.status === 'cancelled') return 'cancelled';
            if (reservation.status === 'completed') return 'completed';
            if (reservation.status === 'not_completed') return 'not_completed';

            if (
              reservation.createdAt &&
              reservation.durationMinutes &&
              !isReservationActive(reservation.createdAt, reservation.durationMinutes)
            ) {
              // Reservation window has passed without completion.
              return 'not_completed';
            }

            return 'pending';
          };

          const status = computeStatus();

          // "Active reservation" = upcoming or in-window and not yet completed/cancelled.
          const active =
            status === 'pending' &&
            isReservationActive(reservation.createdAt, reservation.durationMinutes);

          const cardClasses = active
            ? 'border-accent bg-accent-soft/10 shadow-md'
            : 'border-border-subtle bg-surface shadow-sm';

          return (
            <div
              key={reservation.id}
              className={`rounded-2xl border p-4 transition ${cardClasses}`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-text">
                      {cafe ? cafe.name : t('account.reservations.unknownCafe', 'Kafe')}
                    </p>
                    {active && (
                      <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-core-white">
                        {t(
                          'account.reservations.activeBadge',
                          'Aktif rezervasyon'
                        )}
                      </span>
                    )}
                    {!active &&
                      index === 0 &&
                      status !== 'cancelled' &&
                      status !== 'not_completed' && (
                        <span className="inline-flex items-center rounded-full bg-surface-subtle px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-subtle">
                          {t(
                            'account.reservations.recentReservation',
                            'Son rezervasyon'
                          )}
                        </span>
                      )}
                    {!active && status === 'completed' && (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                        {t('account.reservations.status.completed', 'Tamamlandı')}
                      </span>
                    )}
                    {!active && status === 'not_completed' && (
                      <span className="inline-flex items-center rounded-full bg-status-warning/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-status-warning">
                        {t(
                          'account.reservations.status.notCompleted',
                          'Tamamlanmadı'
                        )}
                      </span>
                    )}
                    {!active && status === 'cancelled' && (
                      <span className="inline-flex items-center rounded-full bg-status-warning/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-status-warning">
                        {t('account.reservations.status.cancelled', 'İptal edildi')}
                      </span>
                    )}
                  </div>
                  {dateStr && (
                    <p className="text-xs text-text-muted">
                      {t('reservation.reservationForDate', { date: dateStr })}
                    </p>
                  )}
                </div>

                <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-text-muted sm:text-right">
                  <div>
                    <dt className="font-medium text-text">{t('reservation.partySize')}</dt>
                    <dd>
                      {t('reservation.people', {
                        count: reservation.partySize ?? 0
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-text">{t('reservation.table')}</dt>
                    <dd>{reservation.tableLabel ? `No: ${reservation.tableLabel}` : '—'}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-text">{t('reservation.duration')}</dt>
                    <dd>
                      {t('reservation.durationMinutes', {
                        count: reservation.durationMinutes ?? 0
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-text">{t('reservation.amountPaid')}</dt>
                    <dd>
                      {reservation.totalPrice != null
                        ? `${reservation.totalPrice} TL`
                        : '—'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                <p className="text-text-subtle line-clamp-2">
                  {reservation.notes?.trim()
                    ? reservation.notes
                    : t('reservation.noNotes')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {reservation.cafeId && (
                    <Link
                      to={`/cafe/${reservation.cafeId}/reservation/receipt`}
                      className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
                    >
                      {t('account.reservations.viewReceipt', 'Makbuzu Görüntüle')}
                    </Link>
                  )}
                  {reservation.cafeId && (
                    <Link
                      to={`/cafe/${reservation.cafeId}/reserve`}
                      className="inline-flex items-center rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-core-white hover:bg-accent-soft"
                    >
                      {t('account.reservations.bookAgain', 'Tekrar Rezervasyon Yap')}
                    </Link>
                  )}
                  {reservation.cafeId && status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => navigate(`/cafe/${reservation.cafeId}/scan`)}
                      className="inline-flex items-center rounded-full border border-accent/60 bg-surface px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent-soft/10"
                    >
                      {t('account.reservations.complete', 'Tamamla')}
                    </button>
                  )}
                  {status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => setCancelTargetId(reservation.id)}
                      className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
                    >
                      {t('account.reservations.cancel', 'İptal Et')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {cancelTargetId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setCancelTargetId(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-border-subtle bg-surface p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold text-text">
              {t(
                'account.reservations.cancelConfirmTitle',
                'Rezervasyonu iptal etmek istiyor musunuz?'
              )}
            </h3>
            <p className="mt-2 text-xs text-text-muted">
              {t(
                'account.reservations.cancelConfirmBody',
                'Bu işlem geri alınamaz ve rezervasyon durumunuz \"Tamamlanmadı\" olarak işaretlenecek.'
              )}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCancelTargetId(null)}
                className="rounded-lg border border-border-subtle px-3 py-1.5 text-xs font-medium text-text hover:bg-surface-subtle"
              >
                {t('account.reservations.cancelConfirmNo', 'Vazgeç')}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (cancelTargetId) {
                    updateReservationStatus(cancelTargetId, 'cancelled');
                  }
                  setCancelTargetId(null);
                }}
                className="rounded-lg bg-status-warning/90 px-3 py-1.5 text-xs font-medium text-core-white hover:bg-status-warning"
              >
                {t('account.reservations.cancelConfirmYes', 'Evet, iptal et')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

