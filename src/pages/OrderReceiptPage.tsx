import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { useOrder } from '../context/OrderContext';
import { useTableSession } from '../context/TableSessionContext';
import { useAuth } from '../context/AuthContext';

const VAT_RATE = 0.1;

export const OrderReceiptPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { placedOrder, paymentMethod, resetOrder, updateOrderStatus } = useOrder();
  const { clearSession, clearCart } = useTableSession();
  const { user, addOrder } = useAuth();

  const cafes = getMockCafesForLanguage(i18n.language);
  const cafe = cafes.find((c) => c.id === id);

  // Mark order as payment received so table stays occupied until "Leave table"
  useEffect(() => {
    if (placedOrder) {
      updateOrderStatus('payment_received');
    }
  }, [placedOrder, updateOrderStatus]);

  // Clear the active cart after successful payment,
  // while keeping the table session active so the guest can reorder.
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!id || !placedOrder || !user) return;

    const beforeVat = placedOrder.subtotal + placedOrder.serviceFee;
    const vat = Math.round(beforeVat * VAT_RATE);
    const tableNumber = Number(placedOrder.tableNumber) || 0;

    addOrder({
      id: placedOrder.orderId,
      cafeId: id,
      cafeName: cafe?.name ?? '',
      cafeImage: undefined,
      date: placedOrder.createdAt,
      tableNumber,
      total: placedOrder.total + vat,
      status: 'completed',
      items: placedOrder.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        notes: item.notes
      })),
      orderNotes: placedOrder.specialInstructions,
      paymentMethod: paymentMethod ?? 'Online',
      cardLast4: null,
      subtotal: placedOrder.subtotal,
      serviceFee: placedOrder.serviceFee,
      vat
    });
  }, [id, placedOrder, user, cafe, paymentMethod, addOrder]);

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
          className="w-full rounded-xl bg-accent py-3 font-medium text-core-white hover:bg-accent-strong"
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
        <button
          type="button"
          onClick={() => {
            clearSession();
            resetOrder();
            navigate('/');
          }}
          className="w-full rounded-xl border border-border-subtle bg-surface py-3 font-medium text-text hover:bg-surface-subtle"
        >
          {t('order.leaveTable', { defaultValue: 'Leave table' })}
        </button>
      </div>
    </section>
  );
};
