import { useTranslation } from 'react-i18next';
import type { PastOrder } from '../../context/AuthContext';
import type { OrderStatus } from '../../context/OrderContext';

interface OrderCardProps {
  order: PastOrder;
  onViewDetails: () => void;
  isActive?: boolean;
  status?: OrderStatus | 'completed';
  onLeaveTable?: () => void;
}

export function OrderCard({ order, onViewDetails, isActive = false, status = 'completed', onLeaveTable }: OrderCardProps) {
  const { t } = useTranslation();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

  const effectiveStatus: OrderStatus | 'completed' =
    status === 'completed' ? 'completed' : status;

  const statusColors: Record<string, { bg: string; text: string }> = {
    received: { bg: '#706455', text: '#ffffff' },
    waiting_confirmation: { bg: '#8b5846', text: '#ffffff' },
    preparing: { bg: '#797979', text: '#ffffff' },
    ready: { bg: '#3c5d3f', text: '#ffffff' },
    delivered: { bg: '#3a6864', text: '#ffffff' },
    payment_received: { bg: '#1a333c', text: '#ffffff' },
    completed: { bg: '#1a333c', text: '#ffffff' },
    cancelled: { bg: '#363a3a', text: '#ffffff' }
  };

  const activeStatusStyle = statusColors[effectiveStatus] ?? {
    bg: '#706455',
    text: '#ffffff'
  };

  const isPaidButTableOccupied = isActive && effectiveStatus === 'payment_received';

  const cardClasses = isActive
    ? 'border-accent bg-accent-soft/10 shadow-md'
    : 'border-border-subtle bg-surface shadow-sm';

  return (
    <div className={`rounded-xl border p-4 transition ${cardClasses}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-1 items-start gap-3 min-w-0">
          <div className="min-w-0 flex-1">
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
                <span className="inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-core-white"
                >
                  {t('account.orders.activeBadge', 'Aktif sipariş')}
                </span>
              )}
              {isActive && effectiveStatus !== 'completed' && (
                <span
                  className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{ backgroundColor: activeStatusStyle.bg, color: activeStatusStyle.text }}
                >
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
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <button
            type="button"
            onClick={onViewDetails}
            className="rounded-lg border border-border-subtle bg-surface-subtle px-3 py-1.5 text-sm font-medium text-text transition hover:bg-surface"
          >
            {t('account.orders.viewDetails')}
          </button>
          {isPaidButTableOccupied && onLeaveTable && (
            <button
              type="button"
              onClick={onLeaveTable}
              className="rounded-lg border border-border-subtle bg-surface-subtle px-3 py-1.5 text-sm font-medium text-text transition hover:bg-surface"
            >
              {t('account.orders.leaveTable', 'Masadan Kalk')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

