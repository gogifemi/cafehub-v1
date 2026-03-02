import { useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { useOrder } from '../context/OrderContext';
import { Banknote, CreditCard, Landmark, Smartphone } from 'lucide-react';

const VAT_RATE = 0.1;

export const BillPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { placedOrder, setPaymentMethod, paymentMethod } = useOrder();

  const [selectedMethod, setSelectedMethod] = useState<string | null>(
    paymentMethod ?? 'credit_card'
  );

  const cafes = getMockCafesForLanguage(i18n.language);
  const cafe = cafes.find((c) => c.id === id);

  if (!id) return null;

  const order = placedOrder;
  const subtotal = order?.subtotal ?? 0;
  const serviceFee = order?.serviceFee ?? 0;
  const beforeVat = subtotal + serviceFee;
  const vat = Math.round(beforeVat * VAT_RATE);
  const total = beforeVat + vat;
  const dateTime = order?.createdAt
    ? new Date(order.createdAt).toLocaleString(i18n.language)
    : new Date().toLocaleString(i18n.language);

  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={() => navigate(`/cafe/${id}`)}
        className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
      >
        {t('menu.back')}
      </button>

      <header className="space-y-1">
        {cafe && <p className="text-sm text-text-muted">{cafe.name}</p>}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
            {t('order.bill')}
          </h1>
          {order?.tableNumber && (
            <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent">
              {t('menu.tableNo')} {order.tableNumber}
            </span>
          )}
        </div>
        <p className="text-xs text-text-muted">{t('order.dateTime')}: {dateTime}</p>
      </header>

      {/* Order items */}
      <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <ul className="space-y-2">
          {(order?.items ?? []).map((item) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span className="text-text">
                {item.name} × {item.quantity}
              </span>
              <span className="text-text">{item.price * item.quantity} TL</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-border-subtle pt-3 text-sm">
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

      {/* Payment options */}
      <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-medium text-text-muted">{t('reservation.paymentMethod')}</h2>
        <div className="grid gap-2">
          {([
            {
              key: 'credit_card',
              label: t('order.creditCard'),
              icon: <CreditCard className="h-4 w-4" />
            },
            {
              key: 'debit_card',
              label: t('order.debitCard'),
              icon: <Landmark className="h-4 w-4" />
            },
            {
              key: 'troy',
              label: t('order.troy'),
              icon: <CreditCard className="h-4 w-4" />
            },
            {
              key: 'bkm_express_paycell',
              label: t('order.bkmExpressPaycell'),
              icon: <Smartphone className="h-4 w-4" />
            },
            {
              key: 'cash',
              label: t('order.cash'),
              icon: <Banknote className="h-4 w-4" />
            }
          ] as { key: string; label: string; icon: ReactNode }[]).map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => {
                setSelectedMethod(opt.key);
                setPaymentMethod(opt.key);
              }}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm text-text transition-all ${
                selectedMethod === opt.key
                  ? 'border-accent bg-accent/10 ring-2 ring-accent/30'
                  : 'border-border-subtle bg-bg-soft hover:border-accent'
              }`}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
              {selectedMethod === opt.key && (
                <span className="ml-auto text-accent">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Split bill */}
      <button
        type="button"
        className="w-full rounded-xl border border-border-subtle bg-surface py-3 font-medium text-text hover:bg-surface-subtle"
      >
        {t('order.splitBill')}
      </button>

      <div className="flex gap-3">
        <button
          type="button"
          className="flex-1 rounded-xl border border-border-subtle bg-surface py-3 font-medium text-text hover:bg-surface-subtle"
        >
          {t('order.callWaiter')}
        </button>
        <button
          type="button"
          onClick={() => navigate(`/cafe/${id}/order/payment`)}
          className="flex-1 rounded-xl border border-accent-strong bg-accent py-3 font-medium text-core-white shadow-sm transition hover:bg-accent-strong hover:shadow-md"
        >
          {t('order.payNow')}
        </button>
      </div>
    </section>
  );
};
