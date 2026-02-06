interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
}

const cities = ['All cities', 'Istanbul', 'Ankara', 'Izmir'];

export const SearchBar = ({ query, onQueryChange, city, onCityChange }: SearchBarProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-3 shadow-sm shadow-black/30 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
      <div className="flex-1">
        <label className="block text-xs font-medium text-slate-400">Search cafes</label>
        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400/60">
          <span className="text-slate-500">🔍</span>
          <input
            type="text"
            className="h-7 w-full border-none bg-transparent text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-0"
            placeholder="Try “specialty coffee” or “quiet to work”"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full sm:w-52">
        <label className="block text-xs font-medium text-slate-400">City</label>
        <div className="mt-1.5 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
          <select
            className="h-7 w-full border-none bg-transparent text-sm text-slate-100 focus:outline-none focus:ring-0"
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

