import { createContext } from 'react';
import { translatorWrap, interpolationWrap } from '../i18l';
import { defaultLocale, localeMapping } from '../utils/constants';

const createContextValue = (locale = defaultLocale) => {
  const t = translatorWrap(locale);
  const it = interpolationWrap(locale);
  return {
    t,
    it,
    locale,
    dir: localeMapping[locale].dir
  };
};

const Il8Context = createContext(createContextValue());

export { Il8Context, createContextValue };
