import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { useOrder } from '../context/OrderContext';

export const OrderReceiptPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { placedOrder } = useOrder();

  const cafes = getMockCafesForLanguage(i18n.language);
  const cafe = cafes.find((c) => c.id === id);

  if (!id) return null;

  return (
    <section className="space-y-6">
      <header className="space-y-2 text-center">
        {cafe && <p className="text-sm text-text-muted">{cafe.name}</p>}
        <h1 className="text-2xl font-semibold tracking-tight text-text">
          {t('order.paymentSuccess')}
        </h1>
        <p className="text-sm text-text-muted">{t('order.paymentSuccessMessage')}</p>
        {placedOrder && (
          <p className="text-xs text-text-muted">
            {t('order.orderId')}: #{placedOrder.orderId} · {t('order.total')}: {placedOrder.total} TL
          </p>
        )}
      </header>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => navigate(`/cafe/${id}/menu`)}
          className="w-full rounded-xl bg-coffee-500 py-3 font-medium text-core-white hover:bg-coffee-600"
        >
          {t('menu.title')}
        </button>
        <button
          type="button"
          onClick={() => navigate(`/cafe/${id}`)}
          className="w-full rounded-xl border border-border-subtle bg-surface py-3 font-medium text-text hover:bg-surface-subtle"
        >
          {t('menu.back')}
        </button>
      </div>
    </section>
  );
};
