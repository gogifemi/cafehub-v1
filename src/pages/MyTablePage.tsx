import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTableSession } from '../context/TableSessionContext';
import { getMockCafesForLanguage } from '../data/mockCafes';
import { useMemo } from 'react';

export const MyTablePage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { session, isValid } = useTableSession();

  const cafes = useMemo(() => getMockCafesForLanguage(i18n.language), [i18n.language]);
  const activeSession = isValid && session?.isActive ? session : null;
  const cafeForSession =
    activeSession && cafes.find((cafe) => cafe.id === activeSession.cafeId);

  if (activeSession && cafeForSession) {
    return (
      <section className="py-6">
        <h1 className="mb-4 text-lg font-semibold text-text">
          {t('myTable.title', 'Masam')}
        </h1>
        <div className="rounded-2xl border border-accent/40 bg-accent-soft/10 px-6 py-5 shadow-sm">
          <p className="text-sm font-medium text-text">
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
          <p className="mt-2 text-xs text-text-subtle">
            {t(
              'myTable.description',
              'Siparişlerinizi bu masaya bağlı olarak veriyorsunuz. Menüye geri dönerek sepetinizi yönetebilirsiniz.'
            )}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => navigate(`/cafe/${activeSession.cafeId}/menu`)}
              className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-xs font-medium text-core-white hover:bg-accent-soft"
            >
              {t('myTable.goToMenu', 'Menüye git')}
            </button>
          </div>
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
            'Herhangi bir masanın QR kodu okutulmadı.'
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

