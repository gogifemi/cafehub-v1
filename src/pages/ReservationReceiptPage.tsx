import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReservation } from '../context/ReservationContext';
import { getMockCafesForLanguage } from '../data/mockCafes';

export const ReservationReceiptPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { state } = useReservation();

  if (!id) {
    return null;
  }

  const cafes = useMemo(() => getMockCafesForLanguage(i18n.language), [i18n.language]);
  const cafe = cafes.find((c) => c.id === id);

  const createdAt = state.createdAt ? new Date(state.createdAt) : new Date();
  const dateFormatter = new Intl.DateTimeFormat(i18n.language || 'tr', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
  const dateStr = dateFormatter.format(createdAt);

  const showCardLast4 =
    state.cardLast4 &&
    (state.paymentMethod === 'credit_card' ||
      state.paymentMethod === 'debit_card' ||
      state.paymentMethod === 'troy');
  const maskedCard = showCardLast4
    ? `**** **** **** ${state.cardLast4}`
    : '—';

  const paymentMethodLabel =
    state.paymentMethod === 'credit_card'
      ? t('reservation.paymentMethods.creditCard')
      : state.paymentMethod === 'debit_card'
      ? t('reservation.paymentMethods.debitCard')
      : state.paymentMethod === 'troy'
      ? t('reservation.paymentMethods.troy')
      : state.paymentMethod === 'bkm_express_paycell'
      ? t('reservation.paymentMethods.bkmExpressPaycell')
      : state.paymentMethod === 'cash'
      ? t('reservation.paymentMethods.cash')
      : '-';

  const reservationCode =
    state.reservationCode ||
    (() => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const yyyy = now.getFullYear();
      const mm = pad(now.getMonth() + 1);
      const dd = pad(now.getDate());
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      return `CAFE-${yyyy}-${mm}-${dd}-${randomCode}`;
    })();

  const transactionId =
    state.transactionId ||
    `TRX-${Math.floor(100000000 + Math.random() * 900000000)}`.toString();

  const onPrint = () => {
    window.print();
  };

  const onDownloadPdf = () => {
    // Placeholder for future implementation.
    // For now, printing can be used to "Save as PDF".
    window.print();
  };

  const onHome = () => {
    navigate('/');
  };

  const onMyReservations = () => {
    navigate('/');
  };

  return (
    <section className="space-y-6">
      <header className="space-y-2 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-status-success/10 text-2xl">
          <span className="text-status-success">✓</span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          {t('reservation.paymentSuccessful')}
        </h1>
        <p className="text-sm text-text-muted">{t('reservation.reservationConfirmed')}</p>
      </header>

      <div className="space-y-4 rounded-2xl border border-border-subtle bg-surface p-4 text-xs text-text-muted shadow-sm">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-0.5">
            <dt className="font-medium text-text">{t('reservation.reservationCode')}</dt>
            <dd>{reservationCode}</dd>
          </div>
          <div className="space-y-0.5">
            <dt className="font-medium text-text">{t('reservation.transactionId')}</dt>
            <dd>{transactionId}</dd>
          </div>
          {cafe && (
            <div className="space-y-0.5">
              <dt className="font-medium text-text">{t('reservation.cafe')}</dt>
              <dd>{cafe.name}</dd>
            </div>
          )}
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
            <dt className="font-medium text-text">{t('reservation.partySize')}</dt>
            <dd>{t('reservation.people', { count: state.partySize ?? 0 })}</dd>
          </div>
          <div className="space-y-0.5">
            <dt className="font-medium text-text">{t('reservation.duration')}</dt>
            <dd>{t('reservation.durationMinutes', { count: state.durationMinutes ?? 0 })}</dd>
          </div>
          <div className="space-y-0.5">
            <dt className="font-medium text-text">{t('reservation.dateTime')}</dt>
            <dd>{dateStr}</dd>
          </div>
          <div className="space-y-0.5">
            <dt className="font-medium text-text">{t('reservation.amountPaid')}</dt>
            <dd>{state.totalPrice} TL</dd>
          </div>
          <div className="space-y-0.5">
            <dt className="font-medium text-text">{t('reservation.paymentMethod')}</dt>
            <dd>
              {paymentMethodLabel}
              {showCardLast4 ? ` (${maskedCard})` : ''}
            </dd>
          </div>
        </dl>

        <div className="space-y-1 pt-2">
          <p>{t('reservation.receiptSent')}</p>
          <p>{t('reservation.viewInApp')}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-sm">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
          >
            {t('reservation.print')}
          </button>
          <button
            type="button"
            onClick={onDownloadPdf}
            className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
          >
            {t('reservation.downloadPdf')}
          </button>
          <button
            type="button"
            onClick={onMyReservations}
            className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
          >
            {t('reservation.myReservations')}
          </button>
        </div>

        <button
          type="button"
          onClick={onHome}
          className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-xs font-medium text-core-black hover:bg-accent-soft"
        >
          {t('reservation.returnHome')}
        </button>
      </div>
    </section>
  );
};

