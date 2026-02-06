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
  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
      <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1.5">
        <span className="text-slate-400">Min rating</span>
        <select
          className="rounded-full border border-slate-700 bg-slate-950/80 px-2 py-1 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
          value={String(minRating)}
          onChange={(e) => onMinRatingChange(Number(e.target.value))}
        >
          <option value="0">Any</option>
          <option value="3.5">3.5+</option>
          <option value="4">4.0+</option>
          <option value="4.5">4.5+</option>
        </select>
      </div>

      <button
        type="button"
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition ${
          onlyOpenNow
            ? 'border-emerald-400/80 bg-emerald-500/10 text-emerald-200'
            : 'border-slate-700 bg-slate-900/80 text-slate-300 hover:border-slate-500'
        }`}
        onClick={() => onOnlyOpenNowChange(!onlyOpenNow)}
      >
        <span className={onlyOpenNow ? 'text-emerald-400' : 'text-slate-400'}>●</span>
        Open now
      </button>
    </div>
  );
};

