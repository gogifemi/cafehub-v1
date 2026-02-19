import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { PastOrder } from '../../context/AuthContext';

interface OrderDetailsModalProps {
  order: PastOrder;
  onClose: () => void;
  onOrderAgain: () => void;
}

export function OrderDetailsModal({ order, onClose, onOrderAgain }: OrderDetailsModalProps) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleDownloadPdf = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-detail-title"
    >
      <div
        ref={dialogRef}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border-subtle bg-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          {order.cafeImage && (
            <img
              src={order.cafeImage}
              alt={order.cafeName}
              className="h-12 w-12 rounded-lg object-cover"
            />
          )}
          <div>
            <h2 id="order-detail-title" className="text-lg font-semibold text-text">
              {order.cafeName}
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              {t('account.orders.date')}: {formatDate(order.date)}
            </p>
            <p className="text-sm text-text-muted">
              {t('account.orders.table')}: {order.tableNumber}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-border-subtle pt-4">
          <h3 className="text-sm font-medium text-text-muted">{t('order.orderSummary')}</h3>
          <ul className="mt-2 space-y-1">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between text-sm text-text">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{(item.unitPrice * item.quantity).toFixed(2)} TL</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 space-y-1 border-t border-border-subtle pt-3 text-sm">
          <div className="flex justify-between text-text-muted">
            <span>{t('order.subtotal')}</span>
            <span>{order.subtotal.toFixed(2)} TL</span>
          </div>
          <div className="flex justify-between text-text-muted">
            <span>{t('order.serviceFee')}</span>
            <span>{order.serviceFee.toFixed(2)} TL</span>
          </div>
          <div className="flex justify-between text-text-muted">
            <span>{t('order.vat')}</span>
            <span>{order.vat.toFixed(2)} TL</span>
          </div>
          <div className="flex justify-between font-medium text-text">
            <span>{t('order.total')}</span>
            <span>{order.total.toFixed(2)} TL</span>
          </div>
        </div>

        <p className="mt-3 text-sm text-text-muted">
          {t('reservation.paymentMethod')}: {order.paymentMethod}
          {order.cardLast4 ? ` • **** ${order.cardLast4}` : ''}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="rounded-lg border border-border-subtle bg-surface-subtle px-4 py-2 text-sm font-medium text-text transition hover:bg-surface"
          >
            {t('account.orders.downloadPdf')}
          </button>
          <button
            type="button"
            onClick={onOrderAgain}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent-soft"
          >
            {t('account.orders.orderAgain')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium text-text-muted transition hover:text-text"
          >
            {t('actions.cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}

