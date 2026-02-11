import type { Cafe } from '../../types/cafe';
import { CafeCard } from './CafeCard';
import { useTranslation } from 'react-i18next';

interface CafeListProps {
  cafes: Cafe[];
}

export const CafeList = ({ cafes }: CafeListProps) => {
  const { t } = useTranslation();

  if (!cafes.length) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-border-subtle bg-surface-subtle px-4 py-10 text-center text-sm text-text-muted">
        {t('status.noResults')}
      </div>
    );
  }

  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cafes.map((cafe) => (
        <CafeCard key={cafe.id} cafe={cafe} />
      ))}
    </section>
  );
};

