import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import type { PastOrder } from '../../context/AuthContext';

export function AccountOrdersTab() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [detailOrder, setDetailOrder] = useState<PastOrder | null>(null);

  const orders = user?.orders ?? [];

  if (!user) return null;

  if (orders.length === 0) {
    return (
      <section>
        <h2 className="mb-4 text-lg font-semibold text-text">{t('account.orders.title')}</h2>
        <div className="rounded-2xl border border-dashed border-border-subtle bg-surface-subtle px-6 py-12 text-center">
          <p className="text-text-muted">{t('account.orders.empty')}</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-lg bg-accent px-4 py-2.5 font-medium text-bg transition hover:bg-accent-soft"
          >
            {t('account.orders.explore')}
          </Link>
        </div>
      </section>
    );
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-text">{t('account.orders.title')}</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border border-border-subtle bg-surface p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
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
              <button
                type="button"
                onClick={() => setDetailOrder(order)}
                className="rounded-lg border border-border-subtle bg-surface-subtle px-3 py-1.5 text-sm font-medium text-text transition hover:bg-surface"
              >
                {t('account.orders.viewDetails')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {detailOrder && (
        <OrderDetailModal
          order={detailOrder}
          onClose={() => setDetailOrder(null)}
          t={t}
        />
      )}
    </section>
  );
}

function OrderDetailModal({
  order,
  onClose,
  t
}: {
  order: PastOrder;
  onClose: () => void;
  t: (key: string) => string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
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
        <h2 id="order-detail-title" className="text-lg font-semibold text-text">
          {order.cafeName}
        </h2>
        <p className="mt-1 text-sm text-text-muted">
          {t('account.orders.date')}: {formatDate(order.date)}
        </p>
        <p className="text-sm text-text-muted">
          {t('account.orders.table')}: {order.tableNumber}
        </p>

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
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="rounded-lg border border-border-subtle bg-surface-subtle px-4 py-2 text-sm font-medium text-text transition hover:bg-surface"
          >
            {t('account.orders.downloadPdf')}
          </button>
          <Link
            to={`/cafe/${order.cafeId}/menu`}
            onClick={onClose}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-bg transition hover:bg-accent-soft"
          >
            {t('account.orders.orderAgain')}
          </Link>
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
