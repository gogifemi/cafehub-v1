import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { useOrder } from '../context/OrderContext';
import type { OrderStatus } from '../context/OrderContext';

const STATUS_ORDER: OrderStatus[] = ['received', 'preparing', 'ready', 'delivered'];
const DEMO_STEP_INTERVAL_MS = 10000;

export const OrderTrackingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { placedOrder, orderStatus, updateOrderStatus, cancelOrder } = useOrder();
  const initialStep = STATUS_ORDER.indexOf(orderStatus);
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStep >= 0 ? initialStep : 0);

  const cafes = getMockCafesForLanguage(i18n.language);
  const cafe = cafes.find((c) => c.id === id);

  // Simulate status progression every 10 seconds
  useEffect(() => {
    if (orderStatus === 'cancelled') return;
    const nextIndex = STATUS_ORDER.indexOf(orderStatus) + 1;
    if (nextIndex >= STATUS_ORDER.length) return;
    const timer = setTimeout(() => {
      const nextStatus = STATUS_ORDER[nextIndex];
      updateOrderStatus(nextStatus);
      setCurrentStepIndex(nextIndex);
    }, DEMO_STEP_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [orderStatus, updateOrderStatus]);

  const canCancel = orderStatus === 'received' || orderStatus === 'preparing';

  if (!id) return null;

  const orderId = placedOrder?.orderId ?? '—';
  const tableNumber = placedOrder?.tableNumber ?? '';

  return (
    <section className="space-y-6">
      <header className="space-y-2 text-center">
        {cafe && <p className="text-sm text-text-muted">{cafe.name}</p>}
        <h1 className="text-2xl font-semibold tracking-tight text-text">
          {t('order.orderReceived')}
        </h1>
        <p className="text-sm text-text-muted">
          {t('order.orderId')}: #{orderId}
        </p>
        {tableNumber && (
          <p className="text-sm text-text-muted">
            {t('menu.tableNo')} {tableNumber}
          </p>
        )}
      </header>

      {/* Status timeline */}
      <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <div className="space-y-4">
          {STATUS_ORDER.map((status, index) => {
            const isDone = index < currentStepIndex || orderStatus === status;
            const isCurrent = orderStatus === status;
            const isCancelled = orderStatus === 'cancelled';
            return (
              <div key={status} className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                    isCancelled && index > STATUS_ORDER.indexOf(orderStatus)
                      ? 'border-border-subtle bg-surface text-text-muted'
                      : isDone
                        ? 'border-coffee-500 bg-coffee-500 text-core-white'
                        : 'border-border-subtle bg-surface text-text-muted'
                  }`}
                >
                  {isDone && !isCancelled ? '✅' : isCurrent ? '⏳' : '○'}
                </div>
                <div className="flex-1">
                  <p
                    className={
                      isDone || isCurrent ? 'font-medium text-text' : 'text-sm text-text-muted'
                    }
                  >
                    {t(`order.status.${status}`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      {orderStatus !== 'cancelled' && (
        <div className="h-2 overflow-hidden rounded-full bg-surface-subtle">
          <div
            className="h-full bg-coffee-500 transition-all duration-500"
            style={{
              width: `${((STATUS_ORDER.indexOf(orderStatus) + 1) / STATUS_ORDER.length) * 100}%`
            }}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => {}}
          className="w-full rounded-xl border border-border-subtle bg-surface py-3 font-medium text-text hover:bg-surface-subtle"
        >
          {t('order.requestHelp')}
        </button>
        {canCancel && (
          <button
            type="button"
            onClick={() => {
              cancelOrder();
            }}
            className="w-full rounded-xl border border-red-500/50 bg-red-500/10 py-3 font-medium text-red-600 hover:bg-red-500/20"
          >
            {t('order.cancelOrder')}
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate(`/cafe/${id}/bill`)}
          className="w-full rounded-xl border border-coffee-500/50 bg-coffee-500/10 py-3 font-medium text-coffee-600 hover:bg-coffee-500/20"
        >
          {t('order.bill')}
        </button>
        <button
          type="button"
          onClick={() => navigate(`/cafe/${id}/menu`)}
          className="w-full rounded-xl border border-border-subtle bg-surface py-3 font-medium text-text-muted hover:bg-surface-subtle"
        >
          {t('menu.back')}
        </button>
      </div>
    </section>
  );
};
