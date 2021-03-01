import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { pt_BR } from './translations';

const resources = {
  'pt-BR': pt_BR,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    // debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
