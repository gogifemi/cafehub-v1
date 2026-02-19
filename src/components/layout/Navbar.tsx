import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-accent via-accent-soft to-accent-strong shadow-lg shadow-accent/40">
            <img
              src="/CafeHub-logoCup.png"
              alt={t('nav.logoAlt')}
              className="h-7 w-7 object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-text">
              {t('nav.brandTitle')}
            </p>
            <p className="text-xs text-text-muted">{t('nav.brandTagline')}</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 text-xs font-medium text-text-muted sm:flex">
            <span className="rounded-full bg-surface-subtle px-3 py-1 text-status-success">
              ● {t('nav.nearbyGems')}
            </span>
            <button className="rounded-full border border-border-subtle bg-surface px-3 py-1 text-text-muted transition hover:border-border-strong hover:text-text">
              {t('nav.mapSoon')}
            </button>
            <Link
              to="/account"
              className="rounded-full border border-border-subtle bg-surface px-3 py-1 text-text-muted transition hover:border-border-strong hover:text-text"
            >
              {t('nav.favoritesSoon')}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  className="rounded-full border border-border-subtle bg-surface px-3 py-1.5 text-xs font-medium text-text transition hover:border-accent hover:text-accent"
                >
                  {t('account.myAccount')}
                </Link>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="rounded-full border border-border-subtle bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition hover:border-border-strong hover:text-text"
                >
                  {t('auth.logout')}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-full border border-accent bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent/20"
              >
                {t('auth.login')}
              </Link>
            )}
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

