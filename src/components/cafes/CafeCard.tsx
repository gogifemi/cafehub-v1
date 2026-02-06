import type { Cafe } from '../../types/cafe';
import { Rating } from './Rating';

interface CafeCardProps {
  cafe: Cafe;
}

export const CafeCard = ({ cafe }: CafeCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-sm shadow-black/40 transition hover:-translate-y-1 hover:border-amber-400/80 hover:shadow-lg hover:shadow-amber-500/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-1.5">
          <h3 className="text-sm font-semibold tracking-tight text-slate-50">
            {cafe.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2.5 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {cafe.isOpenNow ? 'Open now' : 'Closed'}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2.5 py-0.5">
              <span className="text-slate-400">🚶</span>
              {cafe.distanceMinutesWalk} min walk
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2.5 py-0.5">
              {cafe.priceLevel}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <Rating value={cafe.rating} />
          <span className="text-[11px] text-slate-500">
            {cafe.ratingCount.toLocaleString()} reviews
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 text-xs text-slate-400">
        <p className="line-clamp-1">
          {cafe.address}, {cafe.city}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {cafe.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300 group-hover:bg-amber-500/15 group-hover:text-amber-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

