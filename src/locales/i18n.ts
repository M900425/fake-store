import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import ukTranslations from './uk.json';
import frTranslations from './fr.json';
import plTranslations from './pl.json';

const resources = {
  en: { translation: enTranslations },
  uk: { translation: ukTranslations },
  fr: { translation: frTranslations },
  pl: { translation: plTranslations },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;