import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useTableSession } from '../context/TableSessionContext';

const VAT_RATE = 0.1;

export const OrderSummaryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const {
    tableNumber,
    cartItems,
    specialInstructions,
    setSpecialInstructions,
    placeOrderFromItems,
    serviceFeeRate
  } = useOrder();
  const { user, addOrder } = useAuth();
  const { session, isValid } = useTableSession();

  const cafes = getMockCafesForLanguage(i18n.language);
  const cafe = cafes.find((c) => c.id === id);

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const serviceFee = Math.round(subtotal * serviceFeeRate);
  const total = subtotal + serviceFee;

  const handleConfirm = () => {
    // Prefer live cart items; if somehow lost, fall back to session cart
    const hasLiveCart = cartItems.length > 0;
    const canUseSessionCart =
      !hasLiveCart && session && isValid && session.cafeId === id && session.cart.length > 0;

    const sourceItems = hasLiveCart
      ? cartItems
      : canUseSessionCart
        ? session.cart.map((item) => ({
            id: item.menuItemId || item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            notes: item.notes
          }))
        : [];

    const effectiveTable =
      tableNumber ||
      (session && isValid && session.cafeId === id ? String(session.tableNumber) : '');

    const order = placeOrderFromItems(sourceItems, effectiveTable);
    if (!order) return;

    if (id && user) {
      const beforeVat = order.subtotal + order.serviceFee;
      const vat = Math.round(beforeVat * VAT_RATE);
      const numericTable = Number(order.tableNumber) || Number(tableNumber) || 0;

      addOrder({
        id: order.orderId,
        cafeId: id,
        cafeName: cafe?.name ?? '',
        cafeImage: undefined,
        date: order.createdAt,
        tableNumber: numericTable,
        total: order.total + vat,
        status: 'completed',
        items: order.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          notes: item.notes
        })),
        orderNotes: order.specialInstructions,
        paymentMethod: 'Online',
        cardLast4: null,
        subtotal: order.subtotal,
        serviceFee: order.serviceFee,
        vat
      });
    }

    navigate(`/cafe/${id}/order/tracking`);
  };

  if (!id) return null;

  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={() => navigate(`/cafe/${id}/menu`)}
        className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
      >
        {t('order.returnToCart')}
      </button>

      <header className="space-y-1">
        {cafe && <p className="text-sm text-text-muted">{cafe.name}</p>}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
            {t('order.orderSummary')}
          </h1>
          {tableNumber && (
            <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent">
              {t('menu.tableNo')} {tableNumber}
            </span>
          )}
        </div>
      </header>

      <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-medium text-text-muted">{t('order.cart')}</h2>
        {cartItems.length === 0 ? (
          <p className="py-4 text-center text-sm text-text-muted">{t('order.emptyCart')}</p>
        ) : (
          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li key={item.id} className="space-y-0.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-text">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-text">{item.price * item.quantity} TL</span>
                </div>
                {item.notes && (
                  <p className="text-xs text-text-muted">
                    {item.notes}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <label className="block text-sm font-medium text-text-muted">{t('order.orderNotes')}</label>
        <textarea
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder={t('order.notesPlaceholder')}
          className="mt-2 h-24 w-full resize-none rounded-xl border border-border-subtle bg-bg-soft px-3 py-2 text-sm text-text placeholder:text-text-subtle focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-text-muted">
            <span>{t('order.subtotal')}</span>
            <span>{subtotal} TL</span>
          </div>
          <div className="flex justify-between text-text-muted">
            <span>{t('order.serviceFee')}</span>
            <span>{serviceFee} TL</span>
          </div>
          <div className="flex justify-between font-semibold text-text">
            <span>{t('order.total')}</span>
            <span>{total} TL</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => navigate(`/cafe/${id}/menu`)}
          className="flex-1 rounded-xl border border-border-subtle bg-surface py-3 font-medium text-text hover:bg-surface-subtle"
        >
          {t('order.returnToCart')}
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={cartItems.length === 0}
          className="flex-1 rounded-xl bg-accent py-3 font-medium text-core-white hover:bg-accent-strong disabled:opacity-50"
        >
          {t('order.confirmOrder')}
        </button>
      </div>
    </section>
  );
};
