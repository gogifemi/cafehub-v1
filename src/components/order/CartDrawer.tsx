import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, X } from 'lucide-react';
import { ModalPortal } from '../layout/ModalPortal';

interface CartDrawerItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: string;
  items: CartDrawerItem[];
  subtotal: number;
  serviceFee: number;
  total: number;
  onRemove: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onUpdateItemNotes?: (itemId: string, notes: string) => void;
  onPlaceOrder: () => void;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  tableNumber,
  items,
  subtotal,
  serviceFee,
  total,
  onRemove,
  onUpdateQuantity,
  onUpdateItemNotes,
  onPlaceOrder
}: CartDrawerProps) => {
  const { t } = useTranslation();
  const [openNotesFor, setOpenNotesFor] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-[9998] bg-core-black/50"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        role="button"
        tabIndex={0}
        aria-label={t('order.closeCart')}
      />
      <aside
        className="fixed right-0 top-0 z-[9999] flex h-full w-full max-w-md flex-col bg-bg shadow-xl sm:max-w-sm"
        aria-modal="true"
        aria-label={t('order.cart')}
      >
        <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
          <h2 className="text-lg font-semibold text-text">{t('order.cart')}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-text-muted hover:bg-surface-subtle hover:text-text"
            aria-label={t('actions.cancel')}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {tableNumber && (
          <p className="border-b border-border-subtle px-4 py-2 text-sm text-text-muted">
            {t('menu.tableNo')} {tableNumber}
          </p>
        )}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {items.length === 0 ? (
            <p className="py-8 text-center text-sm text-text-muted">{t('order.emptyCart')}</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-2 border-b border-border-subtle pb-4 last:border-0"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium text-text">{item.name}</span>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="shrink-0 rounded p-1 text-text-muted hover:bg-surface-subtle hover:text-text"
                      aria-label={t('order.remove')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border-subtle bg-surface text-text hover:border-accent"
                        aria-label={t('order.decreaseQuantity')}
                      >
                        −
                      </button>
                      <span className="min-w-[1.5rem] text-center text-text">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-border-subtle bg-surface text-text hover:border-accent"
                        aria-label={t('order.increaseQuantity')}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="text-text-muted">{item.price} TL × {item.quantity}</span>
                      <span className="ml-2 font-medium text-text">
                        {item.price * item.quantity} TL
                      </span>
                    </div>
                  </div>
                  {onUpdateItemNotes && (
                    <div className="mt-1 space-y-1 text-xs">
                      {openNotesFor === item.id ? (
                        <>
                          <textarea
                            className="w-full rounded-lg border border-border-subtle bg-bg-soft px-2 py-1 text-xs text-text placeholder:text-text-subtle focus:outline-none focus:ring-1 focus:ring-accent"
                            rows={2}
                            placeholder={t('order.itemNotePlaceholder', 'Bu ürün için özel not ekleyin')}
                            value={item.notes ?? ''}
                            onChange={(e) => onUpdateItemNotes(item.id, e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => setOpenNotesFor(null)}
                            className="text-[11px] font-medium text-text-muted hover:text-text"
                          >
                            {t('actions.cancel')}
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setOpenNotesFor(item.id)}
                          className="text-[11px] font-medium text-accent hover:text-accent-strong"
                        >
                          {item.notes
                            ? t('order.editItemNote', 'Notu düzenle')
                            : t('order.addItemNote', 'Not ekle')}
                        </button>
                      )}
                      {item.notes && openNotesFor !== item.id && (
                        <p className="text-[11px] text-text-muted line-clamp-2">
                          {item.notes}
                        </p>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-border-subtle bg-surface p-4">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>{t('order.subtotal')}</span>
                <span>{subtotal} TL</span>
              </div>
              {serviceFee > 0 && (
                <div className="flex justify-between text-text-muted">
                  <span>{t('order.serviceFee')}</span>
                  <span>{serviceFee} TL</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-text">
                <span>{t('order.total')}</span>
                <span>{total} TL</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onPlaceOrder();
                onClose();
              }}
              className="mt-4 w-full rounded-xl bg-accent py-3 font-medium text-core-white hover:bg-accent-strong"
            >
              {t('order.placeOrder')}
            </button>
          </div>
        )}
      </aside>
    </ModalPortal>
  );
};
