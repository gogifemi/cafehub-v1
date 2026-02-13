import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMockCafesForLanguage } from '../data/mockCafes';
import type { TableArea } from '../context/ReservationContext';

const MOCK_SCAN_DELAY_MS = 2000;

// Mock table data returned by "scan" (e.g. table 1)
const MOCK_TABLE = {
  tableLabel: '1',
  capacity: 2,
  area: 'window' as TableArea
};

export const QRScanPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [scanning, setScanning] = useState(true);
  const [manualCode, setManualCode] = useState('');

  const cafes = getMockCafesForLanguage(i18n.language);
  const cafe = cafes.find((c) => c.id === id);

  // Simulate successful scan after 2 seconds
  useEffect(() => {
    if (!id) return;
    const timer = setTimeout(() => {
      setScanning(false);
      navigate(`/cafe/${id}/scan/approval`, {
        state: MOCK_TABLE
      });
    }, MOCK_SCAN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [id, navigate]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    navigate(`/cafe/${id}/scan/approval`, {
      state: manualCode.trim() ? { ...MOCK_TABLE, tableLabel: manualCode.trim() } : MOCK_TABLE
    });
  };

  if (!id) return null;

  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={() => navigate(`/cafe/${id}`)}
        className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted hover:border-border-strong hover:text-text"
      >
        {t('qrScan.back')}
      </button>

      <header className="space-y-1">
        {cafe && (
          <p className="text-sm text-text-muted">{cafe.name}</p>
        )}
        <h1 className="text-xl font-semibold tracking-tight text-text sm:text-2xl">
          {t('qrScan.title')}
        </h1>
      </header>

      {/* Camera / Scanner (simulated) */}
      <div className="space-y-4 rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <div className="aspect-[4/3] rounded-xl bg-bg-soft flex items-center justify-center border border-border-subtle">
          {scanning ? (
            <div className="flex flex-col items-center gap-3 text-text-muted">
              <div className="h-12 w-12 animate-pulse rounded-full border-2 border-dashed border-border-strong" />
              <p className="text-sm">{t('qrScan.instructions')}</p>
              <p className="text-xs text-text-subtle">Simulating scan...</p>
            </div>
          ) : (
            <p className="text-sm text-text-muted">Redirecting...</p>
          )}
        </div>
        <p className="text-center text-xs text-text-muted">
          {t('qrScan.instructions')}
        </p>
      </div>

      {/* Manual entry */}
      <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
        <p className="mb-2 text-xs font-medium text-text-muted">
          {t('qrScan.enterManually')}
        </p>
        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <input
            type="text"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="e.g. T1"
            className="flex-1 rounded-xl border border-border-subtle bg-bg-soft px-3 py-2 text-sm text-text placeholder:text-text-subtle focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <button
            type="submit"
            className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-core-black hover:bg-accent-soft"
          >
            {t('actions.submit')}
          </button>
        </form>
      </div>
    </section>
  );
};
