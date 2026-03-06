import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTableSession } from '../context/TableSessionContext';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { useMemo, useState } from 'react';
import { useOrder } from '../context/OrderContext';

export const MyTablePage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { session, isValid, updatePartySize, clearSession } = useTableSession();
  const { cartItems, serviceFeeRate, resetOrder, placedOrder, orderStatus } = useOrder();

  const cafes = useMemo(() => getMockCafesForLanguage(i18n.language), [i18n.language]);
  const activeSession = isValid && session?.isActive ? session : null;
  const cafeForSession =
    activeSession && cafes.find((cafe) => cafe.id === activeSession.cafeId);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = Math.round(subtotal * serviceFeeRate);
  const total = subtotal + serviceFee;
  const [showPeopleModal, setShowPeopleModal] = useState(false);

  if (activeSession && cafeForSession) {
    return (
      <section className="py-6">
        <h1 className="mb-4 text-lg font-semibold text-text">
          {t('myTable.title', 'Masam')}
        </h1>
        <div className="rounded-2xl border border-border-subtle bg-surface px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-semibold text-text">
                {cafeForSession.name}{' '}
                <span className="ml-2 inline-flex items-center rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
                  {t('myTable.tableLabel', 'Masa')} {activeSession.tableNumber}
                </span>
              </p>
              {activeSession.tableArea && (
                <p className="mt-1 text-xs text-text-muted">
                  {t('myTable.areaLabel', 'Bölge')}: {activeSession.tableArea}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <span className="text-text-subtle">
                  {t('myTable.peopleLabel', 'Kişi sayısı')}:
                </span>
                <span className="inline-flex items-center rounded-full bg-surface-subtle px-3 py-1 text-xs font-medium text-text">
                  {activeSession.partySize ?? 2}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-text-subtle">
                  {t('myTable.orderSummaryLabel', 'Sipariş özeti')}:
                </span>
                {itemCount > 0 ? (
                  <span className="text-xs text-text">
                    {t('myTable.orderSummaryText', '{{count}} ürün, {{total}} TL', {
                      count: itemCount,
                      total
                    })}
                  </span>
                ) : (
                  <span className="text-xs text-text-muted">
                    {t('myTable.noItems', 'Henüz bu masa için eklenmiş bir sipariş yok.')}
                  </span>
                )}
              </div>
            </div>

            <p className="mt-1 text-xs text-text-subtle">
              {t(
                'myTable.description',
                'Siparişlerinizi bu masaya bağlı olarak veriyorsunuz. Menüye geri dönerek sepetinizi yönetebilirsiniz.'
              )}
            </p>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => navigate(`/cafe/${activeSession.cafeId}/menu`)}
                className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-core-white hover:bg-accent-soft"
              >
                {t('myTable.updateOrder', 'Siparişi Güncelle')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPeopleModal(true);
                }}
                className="flex w-full items-center justify-center rounded-lg border border-border-subtle bg-surface-subtle px-4 py-2.5 text-sm font-medium text-text hover:border-accent"
              >
                {t('myTable.editPeople', 'Kişi Sayısını Güncelle')}
              </button>
              <button
                type="button"
                disabled={!placedOrder}
                onClick={() => placedOrder && navigate(`/cafe/${activeSession.cafeId}/order/tracking`)}
                className={`flex w-full items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium ${
                  placedOrder
                    ? 'border-border-subtle bg-surface-subtle text-text hover:border-accent'
                    : 'border-border-subtle bg-surface-subtle text-text-subtle cursor-not-allowed'
                }`}
              >
                {t('myTable.viewOrderStatus', 'Sipariş durumunu görüntüle')}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/cafe/${activeSession.cafeId}/bill`)}
                className="flex w-full items-center justify-center rounded-lg border border-border-subtle bg-surface-subtle px-4 py-2.5 text-sm font-medium text-text hover:border-accent"
              >
                {t('myTable.viewBill', 'Hesap özetini görüntüle')}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/cafe/${activeSession.cafeId}/order/payment`)}
                className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-core-white hover:bg-accent-soft"
              >
                {t('myTable.payBill', 'Hesabı öde')}
              </button>
              <button
                type="button"
                onClick={() => {
                  const confirmed = window.confirm(
                    t(
                      'myTable.leaveTableConfirm',
                      'Masadan ayrılmak ve mevcut oturumu sonlandırmak istiyor musunuz?'
                    )
                  );
                  if (!confirmed) return;
                  clearSession();
                  resetOrder();
                  navigate('/');
                }}
                className="flex w-full items-center justify-center rounded-lg border border-border-subtle bg-surface-subtle px-4 py-2.5 text-sm font-medium text-status-warning hover:border-status-warning hover:text-status-warning"
              >
                {t('myTable.leaveTable', 'Masadan ayrıl')}
              </button>
            </div>
          </div>

          {showPeopleModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4">
              <div className="w-full max-w-sm rounded-2xl border border-border-subtle bg-surface p-6 shadow-xl">
                <h2 className="text-sm font-semibold text-text">
                  {t('myTable.editPeople', 'Kişi Sayısını Güncelle')}
                </h2>
                <p className="mt-1 text-xs text-text-muted">
                  {t(
                    'myTable.editPeopleDescription',
                    'Masadaki kişi sayısını güncellediğinizde, bu bilgi hesabınızda ve siparişlerinizde kullanılacaktır.'
                  )}
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      updatePartySize(Math.max(1, (activeSession.partySize ?? 2) - 1))
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-lg text-text hover:border-accent"
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center text-base font-semibold text-text">
                    {activeSession.partySize ?? 2}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updatePartySize(Math.min(12, (activeSession.partySize ?? 2) + 1))
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-lg text-text hover:border-accent"
                  >
                    +
                  </button>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPeopleModal(false)}
                    className="rounded-lg border border-border-subtle px-4 py-2 text-xs font-medium text-text hover:bg-surface-subtle"
                  >
                    {t('common.cancel', 'İptal')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPeopleModal(false)}
                    className="rounded-lg bg-accent px-4 py-2 text-xs font-medium text-core-white hover:bg-accent-soft"
                  >
                    {t('common.save', 'Kaydet')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <h1 className="mb-4 text-lg font-semibold text-text">
        {t('myTable.title', 'Masam')}
      </h1>
      <div className="rounded-2xl border border-dashed border-border-subtle bg-surface-subtle px-6 py-12 text-center">
        <p className="text-text-muted text-sm">
          {t(
            'myTable.empty',
            'Şu anda aktif bir masaya bağlı değilsiniz. Bir kafede masa QR kodunu okutarak başlayın.'
          )}
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-4 inline-block rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-core-white transition hover:bg-accent-soft"
        >
          {t('myTable.scanQr', 'Masa QR kodu tara')}
        </button>
      </div>
    </section>
  );
};

