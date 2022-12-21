import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ru from './ru.json';
import uz from './uz.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'ru',
  fallbackLng: 'ru',
  resources: {
    ru: ru,
    uz: uz,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
