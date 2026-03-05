import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { PastOrder } from '../../context/AuthContext';
import { OrderCard } from './OrderCard';
import { OrderDetailsModal } from './OrderDetailsModal';
import { useOrder } from '../../context/OrderContext';
import { useTableSession } from '../../context/TableSessionContext';

export function AccountOrdersTab() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const {
    placedOrder,
    orderStatus,
    resetOrder,
    clearCart,
    addToCart,
    updateItemNotes,
    setSpecialInstructions
  } = useOrder();
  const { clearSession } = useTableSession();
  const [selectedOrder, setSelectedOrder] = useState<PastOrder | null>(null);
  const navigate = useNavigate();

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
          className="mt-4 inline-block rounded-lg bg-accent px-6 py-2 text-sm font-medium text-core-white hover:bg-accent-soft"
        >
          {t('account.orders.login', 'Giriş Yap')} / Log In
        </Link>
      </div>
    );
  }

  const orders = user.orders || [];

  const handleLeaveTable = () => {
    clearSession();
    resetOrder();
    navigate('/');
  };

  // Active order = one with the same id as the currently placed order
  const activeOrderId = placedOrder?.orderId ?? null;

  // Active first, then by date (newest first)
  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      if (a.id === activeOrderId) return -1;
      if (b.id === activeOrderId) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [orders, activeOrderId]);

  // Empty state
  if (orders.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-text-muted">{t('account.orders.empty')}</p>
        <Link
          to="/"
          className="mt-4 inline-block rounded-lg bg-accent px-6 py-2 text-sm font-medium text-core-white hover:bg-accent-soft"
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
        {sortedOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isActive={order.id === activeOrderId}
            status={order.id === activeOrderId ? orderStatus : 'completed'}
            onLeaveTable={order.id === activeOrderId && orderStatus === 'payment_received' ? handleLeaveTable : undefined}
            onViewDetails={() => {
              if (order.id === activeOrderId && order.cafeId) {
                if (orderStatus === 'payment_received') {
                  navigate(`/cafe/${order.cafeId}/order/receipt`);
                } else {
                  navigate(`/cafe/${order.cafeId}/order/tracking`);
                }
              } else {
                setSelectedOrder(order);
              }
            }}
          />
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onOrderAgain={() => {
            if (!selectedOrder.cafeId) return;

            // Start fresh cart
            clearCart();

            // Restore overall order notes if present
            if (selectedOrder.orderNotes) {
              setSpecialInstructions(selectedOrder.orderNotes);
            } else {
              setSpecialInstructions('');
            }

            // Re-add each item with its notes
            selectedOrder.items.forEach((item, index) => {
              const syntheticId = `${item.name}-${item.unitPrice}-${index}`;
              addToCart(
                { name: item.name, price: item.unitPrice },
                item.quantity,
                syntheticId
              );
              if (item.notes) {
                updateItemNotes(syntheticId, item.notes);
              }
            });

            navigate(`/cafe/${selectedOrder.cafeId}/menu`);
          }}
        />
      )}
    </div>
  );
}
