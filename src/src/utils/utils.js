import { currencyMapping, defaultCurrency, types } from './constants';
import { createPriceFromObject, createTaxValueFromObject } from './i18utils';

const rGet = (obj, prop) => Reflect.get(obj, prop);
const rSet = (receiver, prop, value) => Reflect.set(receiver, prop, value);
const rHas = (target, prop) => Reflect.has(target, prop);
const rDelete = (obj, prop) => Reflect.deleteProperty(obj, prop);

const hasAndGet = (obj, prop) => {
  return rHas(obj, prop) ? rGet(obj, prop) : false;
};

const getCurrency = (currencyValue = defaultCurrency) => {
  return rHas(currencyMapping, currencyValue.toUpperCase())
    ? rGet(currencyMapping, currencyValue.toUpperCase())
    : rGet(currencyMapping, 'GBP');
};

/**
 * applies toString on the elem and checks it against the types object eg so '[object Date]'
 * could have the opposite where we slice and get the end portion
 * @param {*} elem - an elem
 * @returns {string|boolean} a boolean
 */
const getType = (elem) => {
  return types[Reflect.apply(toString, elem, [0, 0])];
};

/**
 * takes a response from "/api/v2/ProductCategory" and turns
 * array into an object
 * @param items
 * @returns {*}
 */
const flattenCategories = (items) => {
  return items.reduce((acc, item) => {
    const { id, category, subCategories } = item;

    const name = category.replaceAll(' ', '').toLowerCase();
    if (!acc[name]) {
      acc[name] = {
        id
      };

      if (subCategories && subCategories.length > 0) {
        acc[name]['subCategories'] = subCategories.reduce((acc2, sub) => {
          if (sub.id && sub.subcategory) {
            acc2[sub.subcategory.replaceAll(' ', '-').toLowerCase()] = sub.id;
          }
          return acc2;
        }, {});
      }
    }

    return acc;
  }, {});
};

const partial =
  (fn, ...args) =>
  (...remainingArgs) =>
    fn.apply(this, args.concat(remainingArgs));

export {
  createPriceFromObject,
  createTaxValueFromObject,
  flattenCategories,
  getCurrency,
  getType,
  hasAndGet,
  partial,
  rGet,
  rSet,
  rHas,
  rDelete
};
