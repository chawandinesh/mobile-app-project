import { dateOptionsConfig, defaultLocale } from './constants';
import { getCurrency } from './utils';

const createDate = (timestamp, locale = defaultLocale, dateType = 'short') => {
  const dateOptions = dateOptionsConfig[locale]
    ? dateOptionsConfig[locale]
    : dateOptionsConfig[defaultLocale];
  return new Date(timestamp).toLocaleString(locale, dateOptions[dateType]);
};

const createLocalePrice = (locale, currency, amount) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
};
/**
 * returns an object of dates
 * @param timestamp
 * @param {string} locale - locale defaults to en-GB
 * @returns {{dueDateTimestamp, dueState: string, dueStateLong: string}}
 *
 * dueDate defaults to short format which is the default required
 */
const createMultipleDates = (timestamp, locale = defaultLocale) => {
  return {
    dueDateTimestamp: timestamp,
    dueDateLong: createDate(timestamp, locale, 'long'),
    dueDate: createDate(timestamp, locale)
  };
};

/***
 * used in basket we don't have locale (in basket response)
 * so we need to make an assumption based on current
 * eg { amount: 7.57, currency: 'Gbp'} => £7.57
 *
 * @param object
 * @param locale
 */
const createPriceFromObject = (obj, currencyValue) => {
  const { amount } = obj;
  const { currency, locale } = getCurrency(currencyValue);
  return createLocalePrice(locale, currency, amount);
};

const createPriceFromValue = (amount, currencyValue) => {
  const { currency, locale } = getCurrency(currencyValue);
  return createLocalePrice(locale, currency, amount);
};

const createTaxValueFromObject = (obj, currencyValue) => {
  const { value } = obj;
  const { currency, locale } = getCurrency(currencyValue);
  return createLocalePrice(locale, currency, value);
};

// todo more test
const createPriceWithDiscountFromObject = (
  amount,
  currencyValue,
  discountPercentage
) => {
  const { currency, locale } = getCurrency(currencyValue);
  let discountAmt = parseFloat('.' + discountPercentage) * amount;
  discountAmt = discountAmt.toPrecision(2);
  const amountWithDiscount = amount - discountAmt;
  return {
    discountAmount: createLocalePrice(locale, currency, amountWithDiscount),
    fullAmount: createLocalePrice(locale, currency, amount)
  };
};

export {
  createMultipleDates,
  createLocalePrice,
  createDate,
  createPriceFromValue,
  createPriceFromObject,
  createTaxValueFromObject,
  createPriceWithDiscountFromObject
};
