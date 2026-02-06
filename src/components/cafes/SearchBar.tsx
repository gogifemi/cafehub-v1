interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
}

const cities = ['All cities', 'Istanbul', 'Ankara', 'Izmir'];

export const SearchBar = ({ query, onQueryChange, city, onCityChange }: SearchBarProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface p-3 shadow-sm shadow-black/30 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
      <div className="flex-1">
        <label className="block text-xs font-medium text-text-muted">Search cafes</label>
        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-bg-soft px-3 py-2 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/60">
          <span className="text-text-subtle">🔍</span>
          <input
            type="text"
            className="h-7 w-full border-none bg-transparent text-sm text-text placeholder:text-text-subtle focus:outline-none focus:ring-0"
            placeholder="Try “specialty coffee” or “quiet to work”"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full sm:w-52">
        <label className="block text-xs font-medium text-text-muted">City</label>
        <div className="mt-1.5 rounded-xl border border-border bg-bg-soft px-3 py-2">
          <select
            className="h-7 w-full border-none bg-transparent text-sm text-text focus:outline-none focus:ring-0"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
          >
            {cities.map((c) => (
              <option key={c} value={c === 'All cities' ? '' : c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

