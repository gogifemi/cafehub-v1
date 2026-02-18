import { FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useReservation } from '../context/ReservationContext';

type LocalPaymentMethod = 'credit_card' | 'apple_google_pay' | 'debit_card';

export const ReservationPaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { state, setDetails } = useReservation();

  const [localMethod, setLocalMethod] = useState<LocalPaymentMethod | null>(
    (state.paymentMethod as LocalPaymentMethod | null) ?? 'credit_card'
  );
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!id) {
    return null;
  }

  // Guard: if we don't have a reservation fee yet, send back to summary
  if (!state.totalPrice || !state.durationMinutes || !state.tableId) {
    navigate(`/cafe/${id}/reserve/summary`, { replace: true });
  }

  const canSubmit =
    !!localMethod && !!cardNumber.trim() && !!expiry.trim() && !!cvc.trim() && !!cardholder.trim();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    const digits = cardNumber.replace(/\D/g, '');
    const last4 = digits.slice(-4) || '0000';

    setSubmitting(true);

    setTimeout(() => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      const yyyy = now.getFullYear();
      const mm = pad(now.getMonth() + 1);
      const dd = pad(now.getDate());

      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const reservationCode = `CAFE-${yyyy}-${mm}-${dd}-${randomCode}`;
      const transactionId = `TRX-${Math.floor(100000000 + Math.random() * 900000000)}`;

      setDetails({
        paymentMethod: localMethod,
        cardLast4: last4,
        reservationCode,
        transactionId,
        createdAt: now.toISOString()
      });

      setSubmitting(false);
      navigate(`/cafe/${id}/reservation/receipt`);
    }, 1000);
  };

  const onBack = () => {
    navigate(`/cafe/${id}/reserve/summary`);
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-text-subtle">
          {t('reservation.step3')}
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          {t('reservation.step3')}
        </h1>
      </header>

      {/* Compact summary */}
      <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 text-xs text-text-muted shadow-sm">
        <p className="font-medium text-text">{t('reservation.reservationFee')}</p>
        <p>
          {t('reservation.people', { count: state.partySize ?? 0 })} ·{' '}
          {t('reservation.durationMinutes', { count: state.durationMinutes ?? 0 })} ·{' '}
          {t('reservation.table')} {state.tableLabel}
        </p>
        <p className="text-sm font-semibold text-text">
          {t('reservation.amountPaid')}: {state.totalPrice} TL
        </p>
      </div>

      {/* Payment methods */}
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
          <p className="text-xs font-medium text-text-muted">
            {t('reservation.paymentMethod')}
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {(['credit_card', 'apple_google_pay', 'debit_card'] as LocalPaymentMethod[]).map(
              (method) => {
                const selected = localMethod === method;
                const labelKey =
                  method === 'credit_card'
                    ? 'reservation.paymentMethods.creditCard'
                    : method === 'apple_google_pay'
                    ? 'reservation.paymentMethods.appleGooglePay'
                    : 'reservation.paymentMethods.debitCard';

                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setLocalMethod(method)}
                    className={`flex items-center justify-center rounded-xl border px-3 py-2 text-xs font-medium transition ${
                      selected
                        ? 'border-accent bg-accent-soft/20 text-accent-soft'
                        : 'border-border-subtle bg-surface-subtle text-text-muted hover:border-border-strong hover:text-text'
                    }`}
                    aria-pressed={selected}
                  >
                    {t(labelKey)}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Card form */}
        <div className="space-y-3 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
          <p className="text-xs font-medium text-text-muted">{t('payment.cardDetails')}</p>
          <div className="space-y-2">
            <div>
              <label className="block text-[11px] font-medium text-text-muted">
                {t('payment.cardNumber')}
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="cc-number"
                className="mt-1 h-8 w-full rounded-lg border border-border-subtle bg-bg-soft px-3 text-sm text-text focus:outline-none focus:ring-1 focus:ring-accent"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-[11px] font-medium text-text-muted">
                  {t('payment.expiry')}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  className="mt-1 h-8 w-full rounded-lg border border-border-subtle bg-bg-soft px-3 text-sm text-text focus:outline-none focus:ring-1 focus:ring-accent"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>
              <div className="w-24">
                <label className="block text-[11px] font-medium text-text-muted">{t('payment.cvc')}</label>
                <input
                  type="password"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  className="mt-1 h-8 w-full rounded-lg border border-border-subtle bg-bg-soft px-3 text-sm text-text focus:outline-none focus:ring-1 focus:ring-accent"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-text-muted">
                {t('payment.cardholderName')}
              </label>
              <input
                type="text"
                autoComplete="cc-name"
                className="mt-1 h-8 w-full rounded-lg border border-border-subtle bg-bg-soft px-3 text-sm text-text focus:outline-none focus:ring-1 focus:ring-accent"
                value={cardholder}
                onChange={(e) => setCardholder(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-sm">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
          >
            {t('reservation.back')}
          </button>
          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-medium transition ${
              canSubmit && !submitting
                ? 'bg-accent text-core-black hover:bg-accent-soft'
                : 'bg-surface-subtle text-text-subtle'
            }`}
          >
            {submitting ? '...' : t('reservation.completeReservation')}
          </button>
        </div>
      </form>
    </section>
  );
};

