import { useTranslation } from 'react-i18next';
import type { PastOrder } from '../../context/AuthContext';

interface OrderCardProps {
  order: PastOrder;
  onViewDetails: () => void;
}

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const { t } = useTranslation();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

  return (
    <div className="rounded-xl border border-border-subtle bg-surface p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {order.cafeImage && (
            <img
              src={order.cafeImage}
              alt={order.cafeName}
              className="h-12 w-12 rounded-lg object-cover"
            />
          )}
          <div>
            <h3 className="font-medium text-text">{order.cafeName}</h3>
            <p className="mt-0.5 text-sm text-text-muted">
              {t('account.orders.date')}: {formatDate(order.date)}
            </p>
            <p className="text-sm text-text-muted">
              {t('account.orders.table')}: {order.tableNumber} · {t('account.orders.total')}:{' '}
              {order.total.toFixed(2)} TL
            </p>
            <span className="mt-1 inline-block rounded-full bg-status-success/20 px-2 py-0.5 text-xs text-status-success">
              {t('account.orders.completed')}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onViewDetails}
          className="rounded-lg border border-border-subtle bg-surface-subtle px-3 py-1.5 text-sm font-medium text-text transition hover:bg-surface"
        >
          {t('account.orders.viewDetails')}
        </button>
      </div>
    </div>
  );
}

