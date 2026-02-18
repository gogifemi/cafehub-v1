import type { Cafe } from '../../types/cafe';
import { Rating } from './Rating';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface CafeCardProps {
  cafe: Cafe;
  /** Show "Rezervasyon Yap" button and heart (for account favorites) */
  variant?: 'default' | 'favorite';
  /** When variant is favorite: is this cafe in favorites (filled heart) */
  isFavorite?: boolean;
  /** When variant is favorite: toggle favorite (e.g. remove) */
  onToggleFavorite?: () => void;
}

export const CafeCard = ({
  cafe,
  variant = 'default',
  isFavorite = false,
  onToggleFavorite
}: CafeCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onViewDetails = (e?: React.MouseEvent) => {
    if (e && (e.target as HTMLElement).closest('button')) return;
    navigate(`/cafe/${cafe.id}`);
  };

  const onReservation = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/cafe/${cafe.id}/reserve`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.();
  };

  if (variant === 'favorite') {
    return (
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-sm shadow-black/40 transition hover:border-accent hover:shadow-lg hover:shadow-accent/30">
        <div className="aspect-square w-full rounded-t-2xl bg-gradient-to-br from-surface-subtle to-surface-elevated" />
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="cursor-pointer text-sm font-semibold tracking-tight text-text hover:text-accent"
              onClick={() => navigate(`/cafe/${cafe.id}`)}
            >
              {cafe.name}
            </h3>
            {onToggleFavorite && (
              <button
                type="button"
                onClick={handleToggleFavorite}
                className="shrink-0 rounded p-1 text-status-warning transition hover:scale-110"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            )}
          </div>
          <p className="mt-0.5 text-xs text-text-muted">{cafe.city}</p>
          <div className="mt-1 flex items-center gap-1">
            <Rating value={cafe.rating} />
            <span className="text-[11px] text-text-subtle">
              {t('cafes.reviews', { count: cafe.ratingCount })}
            </span>
          </div>
          <p className="mt-2 line-clamp-1 text-xs text-text-muted">
            {cafe.address}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {cafe.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-subtle px-2 py-0.5 text-[11px] text-text-subtle"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-border-subtle" />
        <div className="p-4 pt-3">
          <button
            type="button"
            onClick={onReservation}
            className="w-full rounded-lg bg-accent py-2.5 text-sm font-medium text-bg transition hover:bg-accent-soft"
          >
            {t('account.favorites.makeReservation')}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm shadow-black/40 transition hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/30"
      onClick={onViewDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onViewDetails();
        }
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-1.5">
          <h3 className="text-sm font-semibold tracking-tight text-text">
            {cafe.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2.5 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
              {cafe.isOpenNow ? t('cafes.openNow') : t('cafes.closed')}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2.5 py-0.5">
              <span className="text-text-subtle">🚶</span>
              {t('cafes.distance', { minutes: cafe.distanceMinutesWalk })}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2.5 py-0.5">
              {cafe.priceLevel}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <Rating value={cafe.rating} />
          <span className="text-[11px] text-text-subtle">
            {t('cafes.reviews', {
              count: cafe.ratingCount
            })}
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 text-xs text-text-muted">
        <p className="line-clamp-1">
          {cafe.address}, {cafe.city}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {cafe.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-subtle px-2 py-0.5 text-[11px] text-text-subtle group-hover:bg-accent-soft/15 group-hover:text-accent-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

