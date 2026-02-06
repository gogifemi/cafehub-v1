import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-accent via-accent-soft to-accent-strong shadow-lg shadow-accent/40">
            <span className="text-lg font-black text-core-black">C</span>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-text">
              CafeHub
            </p>
            <p className="text-xs text-text-muted">Find your next favorite spot</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 text-xs font-medium text-text-muted sm:flex">
            <span className="rounded-full bg-surface-subtle px-3 py-1 text-status-success">
              ● Nearby gems
            </span>
            <button className="rounded-full border border-border-subtle bg-surface px-3 py-1 text-text-muted transition hover:border-border-strong hover:text-text">
              Map (soon)
            </button>
            <button className="rounded-full border border-border-subtle bg-surface px-3 py-1 text-text-muted transition hover:border-border-strong hover:text-text">
              Favorites (soon)
            </button>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

