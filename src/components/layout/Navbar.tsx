export const Navbar = () => {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 shadow-lg shadow-amber-500/40">
            <span className="text-lg font-black text-slate-950">C</span>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-slate-50">
              CafeHub
            </p>
            <p className="text-xs text-slate-400">Find your next favorite spot</p>
          </div>
        </div>

        <nav className="hidden items-center gap-4 text-xs font-medium text-slate-300 sm:flex">
          <span className="rounded-full bg-slate-800/70 px-3 py-1 text-emerald-300">
            ● Nearby gems
          </span>
          <button className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 hover:border-slate-500 hover:text-slate-50">
            Map (soon)
          </button>
          <button className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 hover:border-slate-500 hover:text-slate-50">
            Favorites (soon)
          </button>
        </nav>
      </div>
    </header>
  );
};

