import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-accent via-accent-soft to-accent-strong shadow-lg shadow-accent/40">
            <span className="text-lg font-black text-core-black">C</span>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-text">
              {t('nav.brandTitle')}
            </p>
            <p className="text-xs text-text-muted">{t('nav.brandTagline')}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 text-xs font-medium text-text-muted sm:flex">
            <span className="rounded-full bg-surface-subtle px-3 py-1 text-status-success">
              ● {t('nav.nearbyGems')}
            </span>
            <button className="rounded-full border border-border-subtle bg-surface px-3 py-1 text-text-muted transition hover:border-border-strong hover:text-text">
              {t('nav.mapSoon')}
            </button>
            <button className="rounded-full border border-border-subtle bg-surface px-3 py-1 text-text-muted transition hover:border-border-strong hover:text-text">
              {t('nav.favoritesSoon')}
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

