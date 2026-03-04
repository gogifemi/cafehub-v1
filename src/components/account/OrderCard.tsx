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

  const effectiveStatus: OrderStatus | 'completed' =
    status === 'completed' ? 'completed' : status;

  const statusColors: Record<string, { bg: string; text: string }> = {
    // 1. order received
    received: { bg: '#706455', text: '#ffffff' },
    // 2. waiting confirmation (not currently used as a distinct status)
    waiting_confirmation: { bg: '#8b5846', text: '#ffffff' },
    // 3. being prepared
    preparing: { bg: '#797979', text: '#ffffff' },
    // 4. ready for service
    ready: { bg: '#3c5d3f', text: '#ffffff' },
    // 5. served
    delivered: { bg: '#3a6864', text: '#ffffff' },
    // 6. payment received (used for completed historical orders)
    completed: { bg: '#1a333c', text: '#ffffff' },
    // 7. order canceled
    cancelled: { bg: '#363a3a', text: '#ffffff' }
  };

  const activeStatusStyle = statusColors[effectiveStatus] ?? {
    bg: '#706455',
    text: '#ffffff'
  };

  const cardClasses = isActive
    ? 'border-accent bg-accent-soft/10 shadow-md'
    : 'border-border-subtle bg-surface shadow-sm';

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
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{ backgroundColor: activeStatusStyle.bg, color: activeStatusStyle.text }}
                >
                  {t('account.orders.activeBadge', 'Aktif sipariş')}
                </span>
              )}
              {isActive && effectiveStatus !== 'completed' && (
                <span className="inline-flex items-center rounded-full bg-surface-subtle px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-subtle">
                  {t(`order.status.${effectiveStatus}`)}
                </span>
              )}
              {!isActive && (
                <span className="inline-block rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide"
                  style={{ backgroundColor: statusColors.completed.bg, color: statusColors.completed.text }}
                >
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

