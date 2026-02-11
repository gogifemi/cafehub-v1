import { useTranslation } from 'react-i18next';

const LANGUAGE_STORAGE_KEY = 'cafehub-language';

const LANGUAGES = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' }
] as const;

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentCode = (i18n.language || 'tr').split('-')[0];

  const handleChange = (code: (typeof LANGUAGES)[number]['code']) => {
    if (code === currentCode) return;
    i18n.changeLanguage(code);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    } catch {
      // ignore storage errors (e.g. privacy mode)
    }
  };

  return (
    <div className="inline-flex items-center rounded-full border border-border-subtle bg-surface-subtle text-xs text-text-muted shadow-sm">
      {LANGUAGES.map((lang, index) => {
        const isActive = currentCode === lang.code;

        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleChange(lang.code)}
            className={`px-2.5 py-1 transition first:rounded-l-full last:rounded-r-full ${
              isActive ? 'bg-accent-soft text-core-black' : 'text-text-muted hover:text-text'
            } ${index === 0 ? 'border-r border-border-subtle/60' : ''}`}
            aria-pressed={isActive}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

