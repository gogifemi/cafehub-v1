import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// We load translations from static JSON files served by Vite from /public/locales
const loadLocales = async () => {
  const [tr, en, es, de] = await Promise.all([
    fetch('/locales/tr/common.json').then((res) => res.json()),
    fetch('/locales/en/common.json').then((res) => res.json()),
    fetch('/locales/es/common.json').then((res) => res.json()),
    fetch('/locales/de/common.json').then((res) => res.json())
  ]);

  return {
    tr: { common: tr },
    en: { common: en },
    es: { common: es },
    de: { common: de }
  } as const;
};

// We export a promise so the app can wait for i18n to be ready before rendering
export const initI18n = async () => {
  const resources = await loadLocales();

  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'tr',
      lng: 'tr',
      supportedLngs: ['tr', 'en', 'es', 'de'],
      ns: ['common'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false
      },
      detection: {
        // Order: explicit localStorage choice, browser language, then fallback
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'cafehub-language'
      }
    });

  return i18n;
};

export default i18n;

