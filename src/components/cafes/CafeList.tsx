import type { Cafe } from '../../types/cafe';
import { CafeCard } from './CafeCard';

interface CafeListProps {
  cafes: Cafe[];
}

export const CafeList = ({ cafes }: CafeListProps) => {
  if (!cafes.length) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-4 py-10 text-center text-sm text-slate-400">
        No cafes match your filters yet. Try widening your search.
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

