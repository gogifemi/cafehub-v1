import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '../../context/AuthContext';
import { useTableSession } from '../../context/TableSessionContext';
import { User } from 'lucide-react';
import { getAnimalAvatarById } from '../../data/animalAvatars';

type ColorTheme = 'turkish' | 'core';

export const Navbar = () => {
  const { t } = useTranslation();
  const { isAuthenticated, logout, user } = useAuth();
  const { session, isValid } = useTableSession();
  const hasActiveSession = isValid && session?.isActive;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [colorTheme, setColorTheme] = useState<ColorTheme>('turkish');

  const initials =
    user?.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) ?? '';

  const currentAnimal =
    user?.avatar?.type === 'animal' && user.avatar.animalId
      ? getAnimalAvatarById(user.avatar.animalId)
      : null;

  const isRoundAvatar =
    (user?.avatar?.type === 'animal' && currentAnimal?.style === 'yuvarlak') ||
    user?.avatar?.type === 'upload';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initial =
      (document.documentElement.dataset.theme as ColorTheme | undefined) ?? 'turkish';
    setColorTheme(initial);

    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ theme: ColorTheme }>;
      if (custom.detail?.theme) {
        setColorTheme(custom.detail.theme);
      }
    };

    window.addEventListener('cafehub-theme-changed', handler);

    return () => {
      window.removeEventListener('cafehub-theme-changed', handler);
    };
  }, []);

  const logoSrc =
    colorTheme === 'core'
      ? '/assets/logo/cafehub-logo-buyukLight.png'
      : '/assets/logo/cafehub-logo-buyuk.png';

  return (
    <header className="border-b border-border bg-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center">
          <img
            src={logoSrc}
            alt={t('nav.logoAlt')}
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border-subtle bg-surface text-xs font-semibold text-accent shadow-sm transition hover:border-accent hover:text-accent"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
            >
              {user?.avatar?.type === 'upload' && user.avatar.url ? (
                <img src={user.avatar.url} alt="" className="h-full w-full object-cover" />
              ) : user?.avatar?.type === 'animal' && currentAnimal ? (
                <img
                  src={currentAnimal.imageUrl}
                  alt={currentAnimal.name}
                  className="h-full w-full object-cover"
                />
              ) : initials ? (
                initials
              ) : (
                <User className="h-4 w-4" />
              )}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-11 z-20 w-56 rounded-xl border border-border-subtle bg-surface shadow-lg shadow-black/5">
                <div className="py-2 text-sm">
                  {hasActiveSession && session && (
                    <Link
                      to={`/cafe/${session.cafeId}/menu`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-text hover:bg-surface-subtle"
                    >
                      {t('nav.returnToTable', { defaultValue: 'Return to table' })}
                    </Link>
                  )}

                  <button
                    type="button"
                    className="flex w-full cursor-default items-center justify-between px-3 py-2 text-left text-text-muted"
                    disabled
                  >
                    <span>{t('nav.nearbyGems')}</span>
                    <span className="text-[10px] uppercase tracking-wide text-text-subtle">
                      {t('common.soon', { defaultValue: 'Soon' })}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="flex w-full cursor-default items-center justify-between px-3 py-2 text-left text-text-muted"
                    disabled
                  >
                    <span>{t('nav.mapSoon')}</span>
                    <span className="text-[10px] uppercase tracking-wide text-text-subtle">
                      {t('common.soon', { defaultValue: 'Soon' })}
                    </span>
                  </button>

                  <Link
                    to="/account?tab=favorites"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 text-sm text-text hover:bg-surface-subtle"
                  >
                    <span>{t('account.tabs.favorites')}</span>
                  </Link>

                  <div className="my-1 border-t border-border-subtle" />

                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/account"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 text-text hover:bg-surface-subtle"
                      >
                        {t('account.myAccount')}
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          logout();
                        }}
                        className="block w-full px-3 py-2 text-left text-text-muted hover:bg-surface-subtle hover:text-text"
                      >
                        {t('auth.logout')}
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 text-text hover:bg-surface-subtle"
                    >
                      {t('auth.login')}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

