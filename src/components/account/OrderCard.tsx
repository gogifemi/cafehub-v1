import { useTranslation } from 'react-i18next';
import type { PastOrder } from '../../context/AuthContext';
import type { OrderStatus } from '../../context/OrderContext';

interface OrderCardProps {
  order: PastOrder;
  onViewDetails: () => void;
  isActive?: boolean;
  status?: OrderStatus | 'completed';
}

export function OrderCard({ order, onViewDetails, isActive = false, status = 'completed' }: OrderCardProps) {
  const { t } = useTranslation();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

  const cardClasses = isActive
    ? 'border-accent bg-accent-soft/10 shadow-md'
    : 'border-border-subtle bg-surface shadow-sm';

  const effectiveStatus: OrderStatus | 'completed' =
    status === 'completed' ? 'completed' : status;

  return (
    <div className={`rounded-xl border p-4 transition ${cardClasses}`}>
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
              {t('account.orders.table')}: {order.tableNumber} · {t('account.orders.total')}{' '}
              {order.total.toFixed(2)} TL
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {isActive && (
                <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-core-white">
                  {t('account.orders.activeBadge', 'Aktif sipariş')}
                </span>
              )}
              {isActive && effectiveStatus !== 'completed' && (
                <span className="inline-flex items-center rounded-full bg-surface-subtle px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-subtle">
                  {t(`order.status.${effectiveStatus}`)}
                </span>
              )}
              {!isActive && (
                <span className="inline-block rounded-full bg-status-success/20 px-2 py-0.5 text-xs text-status-success">
                  {t('account.orders.completed')}
                </span>
              )}
            </div>
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

