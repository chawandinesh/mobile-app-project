import * as languages from './languagePacks';
import * as interpolations from './interpolations';
import { defaultLocale, localeMapping } from '../utils/constants';
import { rGet, hasAndGet } from '../utils/utils';
import { createDate } from '../utils/i18utils';

/*
  https://www.localeplanet.com
 */

/**
 *
 * @param {string} message
 * @param {int} value
 * @param {string} date string ie 23 Feb 2020
 * @returns {*}
 */
const interpolate = (message, value, date = null) => {
  const reggie = new RegExp('{count}', 'g');
  const interimMessage = message.replace(reggie, value);
  if (!date) {
    return interimMessage;
  }
  return interimMessage.replace('{date}', date);
};

const getPluralRulesValue = (value, locale = defaultLocale) => {
  const plurals = new Intl.PluralRules(locale);
  return plurals.select(value);
};

/**
 * deals with plurals in a fairly simple way based on the locale
 * get the correct string for the plural and returns it
 * @param localeCode
 * @returns {function(*=, *=): *}
 */
const interpolationWrap = (localeCode = defaultLocale) => {
  const language = hasAndGet(localeMapping, localeCode);
  const interpolationPack = language
    ? rGet(interpolations, language.locale)
    : interpolations[rGet(localeMapping, defaultLocale).locale];

  return (value, strProp, date) => {
    const pluralValue = getPluralRulesValue(value);
    const messages = rGet(interpolationPack, strProp);
    const messageByPluralValue = rGet(messages, pluralValue);
    const dateStr = createDate(date, localeCode);
    return interpolate(messageByPluralValue, value, dateStr);
  };
};

/**
 * need to use some context reducer?
 * defaultLocale is currently en-GB - might change and might be
 * in a different format.  We currently dont get this only the currency
 * => this does not work as Euro would span many countries
 */
const translator = (prop, localeCode = defaultLocale) => {
  // check to see we have a valid locale
  const language = hasAndGet(localeMapping, localeCode);
  const languagePack = language
    ? rGet(languages, language.locale)
    : languages[rGet(localeMapping, defaultLocale).locale];

  return rGet(languagePack, prop);
};

/**
 * returns a partially applicated function with the language pack
 * in the closure saves looks up
 * @param localeCode
 * @returns {function(*=): any}
 */
const translatorWrap = (localeCode = defaultLocale) => {
  const language = hasAndGet(localeMapping, localeCode);
  const languagePack = language
    ? rGet(languages, language.locale)
    : languages[rGet(localeMapping, defaultLocale).locale];

  return (prop) => {
    return rGet(languagePack, prop);
  };
};

export {
  translator,
  translatorWrap,
  interpolate,
  getPluralRulesValue,
  interpolationWrap
};
