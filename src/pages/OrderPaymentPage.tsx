import { FormEvent, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { useOrder } from '../context/OrderContext';

const VAT_RATE = 0.1;

type LocalPaymentMethod = 'credit_card' | 'apple_google_pay' | 'debit_card' | 'cash';

export const OrderPaymentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { placedOrder, setPaymentMethod, paymentMethod } = useOrder();

  const [localMethod, setLocalMethod] = useState<LocalPaymentMethod | null>(
    (paymentMethod as LocalPaymentMethod | null) ?? 'credit_card'
  );
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const cafes = getMockCafesForLanguage(i18n.language);
  const cafe = cafes.find((c) => c.id === id);

  // If no placed order (e.g. direct URL), redirect to bill or cafe
  useEffect(() => {
    if (!id) return;
    if (!placedOrder) {
      navigate(`/cafe/${id}/bill`, { replace: true });
    }
  }, [id, placedOrder, navigate]);

  if (!id) return null;
  if (!placedOrder) return null;

  const subtotal = placedOrder.subtotal;
  const serviceFee = placedOrder.serviceFee;
  const beforeVat = subtotal + serviceFee;
  const vat = Math.round(beforeVat * VAT_RATE);
  const total = beforeVat + vat;

  const requiresCardDetails =
    localMethod === 'credit_card' || localMethod === 'debit_card';

  const hasCardDetails =
    !!cardNumber.trim() && !!expiry.trim() && !!cvc.trim() && !!cardholder.trim();

  const canSubmit = !!localMethod && (!requiresCardDetails || hasCardDetails);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setPaymentMethod(localMethod);
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      navigate(`/cafe/${id}/order/receipt`);
    }, 1000);
  };

  const onBack = () => {
    navigate(`/cafe/${id}/bill`);
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-text-subtle">
          {t('order.bill')}
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          {t('order.paymentTitle')}
        </h1>
      </header>

      {/* Bill summary */}
      <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 text-sm shadow-sm">
        <p className="font-medium text-text">
          {t('menu.tableNo')} {placedOrder.tableNumber}
        </p>
        <ul className="space-y-1 text-text-muted">
          {placedOrder.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} × {item.quantity}</span>
              <span>{item.price * item.quantity} TL</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 space-y-1 border-t border-border-subtle pt-3">
          <div className="flex justify-between text-text-muted">
            <span>{t('order.subtotal')}</span>
            <span>{subtotal} TL</span>
          </div>
          {serviceFee > 0 && (
            <div className="flex justify-between text-text-muted">
              <span>{t('order.serviceFee')}</span>
              <span>{serviceFee} TL</span>
            </div>
          )}
          <div className="flex justify-between text-text-muted">
            <span>{t('order.vat')}</span>
            <span>{vat} TL</span>
          </div>
          <div className="flex justify-between font-semibold text-text">
            <span>{t('order.total')}</span>
            <span>{total} TL</span>
          </div>
        </div>
      </div>

      {/* Payment methods */}
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
          <p className="text-xs font-medium text-text-muted">
            {t('reservation.paymentMethod')}
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {(
              ['credit_card', 'debit_card', 'apple_google_pay', 'cash'] as LocalPaymentMethod[]
            ).map((method) => {
              const selected = localMethod === method;
              const labelKey =
                method === 'credit_card'
                  ? 'order.creditCard'
                  : method === 'debit_card'
                    ? 'order.debitCard'
                    : method === 'apple_google_pay'
                      ? 'order.appleGooglePay'
                      : 'order.cash';

              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => {
                    setLocalMethod(method);
                    setPaymentMethod(method);
                  }}
                  className={`flex items-center justify-center rounded-xl border px-3 py-2 text-xs font-medium transition ${
                    selected
                      ? 'border-coffee-500 bg-coffee-500/20 text-coffee-600'
                      : 'border-border-subtle bg-surface-subtle text-text-muted hover:border-border-strong hover:text-text'
                  }`}
                  aria-pressed={selected}
                >
                  {t(labelKey)}
                </button>
              );
            })}
          </div>
        </div>
        {/* Conditional payment details UI */}
        {requiresCardDetails ? (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm font-medium text-text">
              {t('payment.cardDetails')}
            </h3>
            <div className="space-y-3 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
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
                    <label className="block text-[11px] font-medium text-text-muted">
                      {t('payment.cvc')}
                    </label>
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
          </div>
        ) : localMethod === 'apple_google_pay' ? (
          <div className="mt-6 rounded-lg border border-border-subtle bg-bg-soft p-6 text-center">
            <div className="mb-4 text-4xl">📱</div>
            <p className="text-text-muted">
              {t('payment.applePayInstruction')}
            </p>
          </div>
        ) : localMethod === 'cash' ? (
          <div className="mt-6 rounded-lg border border-border-subtle bg-bg-soft p-4">
            <p className="text-text-muted">
              {t('payment.cashInstruction')}
            </p>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center rounded-xl border border-border-subtle bg-surface-subtle px-4 py-2.5 text-sm font-medium text-text-muted hover:border-border-strong hover:text-text"
          >
            {t('reservation.back')}
          </button>
          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className={`inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-medium transition ${
              canSubmit && !submitting
                ? 'bg-coffee-500 text-core-white hover:bg-coffee-600'
                : 'bg-surface-subtle text-text-subtle cursor-not-allowed'
            }`}
          >
            {submitting ? '...' : t('order.completePayment')}
          </button>
        </div>
      </form>
    </section>
  );
};
