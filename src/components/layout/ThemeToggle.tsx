import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ColorTheme = 'turkish' | 'core';

const STORAGE_KEY = 'cafehub-color-theme';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<ColorTheme>('turkish');
  const { t } = useTranslation();

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ColorTheme | null;
    const initial: ColorTheme = stored === 'core' || stored === 'turkish' ? stored : 'turkish';

    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = () => {
    const next: ColorTheme = theme === 'turkish' ? 'core' : 'turkish';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const isCore = theme === 'core';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 text-xs font-medium text-text-muted shadow-sm hover:border-border-strong hover:text-text"
        aria-label={
          isCore ? t('theme.switchToTurkish') : t('theme.switchToCore')
        }
    >
      <span
        className={`flex h-4 w-7 items-center rounded-full border border-border bg-bg-soft px-0.5 transition ${
          isCore ? 'justify-end' : 'justify-start'
        }`}
      >
        <span className="h-3 w-3 rounded-full bg-accent" />
      </span>
      <span className="hidden sm:inline">
        {isCore ? t('theme.labelDesktopCore') : t('theme.labelDesktopTurkish')}
      </span>
      <span className="sm:hidden">
        {isCore ? t('theme.labelMobileCore') : t('theme.labelMobileTurkish')}
      </span>
    </button>
  );
};

