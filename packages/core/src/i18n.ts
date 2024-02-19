import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const localeFiles = import.meta.glob('./locales/*.json', { eager: true });

const resources = Object.entries(localeFiles).reduce((acc, [path, module]) => {
  const languageCode = path.match(/\/([a-zA-Z0-9-_]+)\.json$/)[1];
  acc[languageCode] = {
    translation: module,
  };
  return acc;
}, {});

i18n.use(initReactI18next).init({
  resources,
  lng: 'cn',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
