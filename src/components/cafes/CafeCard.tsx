import type { Cafe } from '../../types/cafe';
import { Rating } from './Rating';

interface CafeCardProps {
  cafe: Cafe;
}

export const CafeCard = ({ cafe }: CafeCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm shadow-black/40 transition hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-1.5">
          <h3 className="text-sm font-semibold tracking-tight text-text">
            {cafe.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2.5 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
              {cafe.isOpenNow ? 'Open now' : 'Closed'}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2.5 py-0.5">
              <span className="text-text-subtle">🚶</span>
              {cafe.distanceMinutesWalk} min walk
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle px-2.5 py-0.5">
              {cafe.priceLevel}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <Rating value={cafe.rating} />
          <span className="text-[11px] text-text-subtle">
            {cafe.ratingCount.toLocaleString()} reviews
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

