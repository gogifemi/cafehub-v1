import { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import type { TableArea } from '../context/ReservationContext';

const APPROVAL_DELAY_MS = 3000;

interface TableState {
  tableLabel: string;
  capacity: number;
  area: TableArea;
}

const areaToReservationKey: Record<TableArea, string> = {
  window: 'windowSide',
  garden: 'garden',
  indoor: 'indoor',
  outdoor: 'outdoor'
};

export const QRApprovalPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const state = location.state as TableState | null;
  const table = state ?? { tableLabel: '1', capacity: 2, area: 'window' as TableArea };

  const cafes = getMockCafesForLanguage(i18n.language);
  const cafe = cafes.find((c) => c.id === id);

  useEffect(() => {
    if (!id) return;
    const timer = setTimeout(() => {
      navigate(`/cafe/${id}/menu`, {
        state: table,
        replace: true
      });
    }, APPROVAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, [id, navigate, table]);

  if (!id) return null;

  const locationKey = areaToReservationKey[table.area] ?? 'indoor';

  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={() => navigate(`/cafe/${id}`)}
        className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
      >
        {t('qrApproval.back')}
      </button>

      <header className="space-y-1">
        {cafe && (
          <p className="text-sm text-text-muted">{cafe.name}</p>
        )}
      </header>

      {/* Table info */}
      <div className="space-y-4 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">{t('qrApproval.tableNo')}</span>
            <span className="font-medium text-text">{table.tableLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">{t('qrApproval.capacity')}</span>
            <span className="font-medium text-text">
              {t('reservation.capacityPeople', { count: table.capacity })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">{t('qrApproval.location')}</span>
            <span className="font-medium text-text">
              {t(`reservation.${locationKey}`)}
            </span>
          </div>
        </div>
      </div>

      {/* Waiting status */}
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border-subtle bg-surface p-8 shadow-sm">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border-subtle border-t-coffee-500" />
        <p className="text-sm font-medium text-text">{t('qrApproval.waiting')}</p>
        <p className="text-xs text-text-muted">{t('qrApproval.staffApproving')}</p>
      </div>
    </section>
  );
};
