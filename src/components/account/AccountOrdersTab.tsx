import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { PastOrder } from '../../context/AuthContext';
import { OrderCard } from './OrderCard';
import { OrderDetailsModal } from './OrderDetailsModal';

export function AccountOrdersTab() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<PastOrder | null>(null);

  // Not logged in - show message instead of blank
  if (!isAuthenticated || !user) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-text-muted">
          {t(
            'account.orders.loginRequired',
            'Siparişlerinizi görmek için giriş yapın'
          )}{' '}
          / Please log in to see your orders
        </p>
        <Link
          to="/login"
          className="mt-4 inline-block rounded-lg bg-accent px-6 py-2 text-sm font-medium text-bg hover:bg-accent-soft"
        >
          {t('account.orders.login', 'Giriş Yap')} / Log In
        </Link>
      </div>
    );
  }

  const orders = user.orders || [];

  // Empty state
  if (orders.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-text-muted">{t('account.orders.empty')}</p>
        <Link
          to="/"
          className="mt-4 inline-block rounded-lg bg-accent px-6 py-2 text-sm font-medium text-bg hover:bg-accent-soft"
        >
          {t('account.orders.explore')}
        </Link>
      </div>
    );
  }

  // Show orders
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-text">{t('account.orders.title')}</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onViewDetails={() => setSelectedOrder(order)}
          />
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onOrderAgain={() => {
            window.location.href = `/cafe/${selectedOrder.cafeId}/menu`;
          }}
        />
      )}
    </div>
  );
}
