import { useTranslation } from 'react-i18next';

interface FilterBarProps {
  minRating: number;
  onMinRatingChange: (value: number) => void;
  onlyOpenNow: boolean;
  onOnlyOpenNowChange: (value: boolean) => void;
}

export const FilterBar = ({
  minRating,
  onMinRatingChange,
  onlyOpenNow,
  onOnlyOpenNowChange
}: FilterBarProps) => {
  const { t } = useTranslation();

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-text-muted">
      <div className="inline-flex items-center gap-2 rounded-full bg-surface-subtle px-3 py-1.5">
        <span className="text-text-subtle">{t('filters.minRating')}</span>
        <select
          className="rounded-full border border-border-subtle bg-bg-soft px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-accent"
          value={String(minRating)}
          onChange={(e) => onMinRatingChange(Number(e.target.value))}
        >
          <option value="0">{t('filters.any')}</option>
          <option value="3.5">3.5+</option>
          <option value="4">4.0+</option>
          <option value="4.5">4.5+</option>
        </select>
      </div>

      <button
        type="button"
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition ${
          onlyOpenNow
            ? 'border-status-success/80 bg-status-success/10 text-status-success'
            : 'border-border-subtle bg-surface-subtle text-text-muted hover:border-border-strong'
        }`}
        onClick={() => onOnlyOpenNowChange(!onlyOpenNow)}
      >
        <span className={onlyOpenNow ? 'text-status-success' : 'text-text-subtle'}>●</span>
        {t('filters.openNow')}
      </button>
    </div>
  );
};

