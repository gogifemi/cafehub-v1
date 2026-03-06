import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { useOrder } from '../context/OrderContext';

const VAT_RATE = 0.1;

export const BillPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { placedOrder } = useOrder();

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
        onClick={() => navigate(-1)}
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

      {/* Actions: back and proceed to payment */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 rounded-xl border border-border-subtle bg-surface py-3 text-sm font-medium text-text hover:bg-surface-subtle"
        >
          {t('reservation.back')}
        </button>
        <button
          type="button"
          onClick={() => navigate(`/cafe/${id}/order/payment`)}
          className="flex-1 rounded-xl border border-accent-strong bg-accent py-3 text-sm font-medium text-core-white shadow-sm transition hover:bg-accent-strong hover:shadow-md"
        >
          {t('order.payNow')}
        </button>
      </div>
    </section>
  );
};
