import { getString, saveString } from './storable';

const LOCALE_KEY = 'locale';

export const LOCALE = {
  get: () => getString(LOCALE_KEY),
  set: (token) => saveString(LOCALE_KEY, token),
};

const locale = navigator.language.split(/[-_]/)[0];
const storedLocale = LOCALE.get();

if (!storedLocale || storedLocale !== locale) {
  LOCALE.set(locale);
};
