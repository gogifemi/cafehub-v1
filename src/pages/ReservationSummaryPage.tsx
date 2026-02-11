import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReservation } from '../context/ReservationContext';
import { getMockCafesForLanguage } from '../data/mockCafes';

export const ReservationSummaryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { state } = useReservation();

  if (!id) {
    return null;
  }

  // Guard: if essential details are missing, send back to step 1
  if (!state.partySize || !state.durationMinutes || !state.tableId || !state.totalPrice) {
    navigate(`/cafe/${id}/reserve`, { replace: true });
  }

  const cafes = useMemo(() => getMockCafesForLanguage(i18n.language), [i18n.language]);
  const cafe = cafes.find((c) => c.id === id);

  const now = new Date();
  const end = new Date(now.getTime() + (state.durationMinutes ?? 0) * 60_000);
  const dateFormatter = new Intl.DateTimeFormat(i18n.language || 'tr', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const startStr = dateFormatter.format(now);
  const endStr = dateFormatter.format(end);

  const isFiftyFive = state.durationMinutes === 55;

  const onBack = () => {
    navigate(`/cafe/${id}/reserve`);
  };

  const onProceed = () => {
    navigate(`/cafe/${id}/reserve/payment`);
  };

  const onCancel = () => {
    // For now, return to home. In the future, this could go to /cafe/:id.
    navigate('/');
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-text-subtle">
          {t('reservation.step2')}
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          {t('reservation.step2')}
        </h1>
      </header>

      <div className="space-y-4 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        {cafe && (
          <div className="space-y-1">
            <p className="text-sm font-semibold text-text">{cafe.name}</p>
            <p className="text-xs text-text-muted">
              {cafe.address}, {cafe.city}
            </p>
          </div>
        )}

        <dl className="mt-2 grid grid-cols-1 gap-3 text-xs text-text-muted sm:grid-cols-2">
          <div className="space-y-0.5">
            <dt className="font-medium text-text">{t('reservation.partySize')}</dt>
            <dd>{t('reservation.people', { count: state.partySize ?? 0 })}</dd>
          </div>
          <div className="space-y-0.5">
            <dt className="font-medium text-text">{t('reservation.duration')}</dt>
            <dd>{t('reservation.durationMinutes', { count: state.durationMinutes ?? 0 })}</dd>
          </div>
          <div className="space-y-0.5">
            <dt className="font-medium text-text">{t('reservation.table')}</dt>
            <dd>
              No: {state.tableLabel}{' '}
              {state.tableArea && (
                <span className="text-text-subtle">
                  (
                  {t(
                    state.tableArea === 'window'
                      ? 'reservation.windowSide'
                      : state.tableArea === 'garden'
                      ? 'reservation.garden'
                      : state.tableArea === 'outdoor'
                      ? 'reservation.outdoor'
                      : 'reservation.indoor'
                  )}
                  )
                </span>
              )}
            </dd>
          </div>
          <div className="space-y-0.5">
            <dt className="font-medium text-text">{t('reservation.dateTime')}</dt>
            <dd>
              {startStr} → {endStr}
            </dd>
          </div>
          <div className="space-y-0.5">
            <dt className="font-medium text-text">{t('reservation.reservationFee')}</dt>
            <dd>{state.totalPrice} TL</dd>
          </div>
          {isFiftyFive && (
            <div className="space-y-0.5">
              <dt className="font-medium text-text">{t('reservation.reservationFee')}</dt>
              <dd className="text-status-info">
                40 TL {t('reservation.willBeAddedToBill')}
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-4 space-y-1">
          <p className="text-xs font-medium text-text">{t('reservation.specialNotes')}</p>
          <p className="rounded-xl border border-border-subtle bg-bg-soft px-3 py-2 text-xs text-text-muted">
            {state.notes?.trim() ? state.notes : t('reservation.noNotes')}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-sm">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
          >
            {t('reservation.back')}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
          >
            {t('reservation.cancel')}
          </button>
        </div>
        <button
          type="button"
          onClick={onProceed}
          className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-xs font-medium text-core-black hover:bg-accent-soft"
        >
          {t('reservation.proceedToPayment')}
        </button>
      </div>
    </section>
  );
};

