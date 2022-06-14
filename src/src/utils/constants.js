/* put in a constant file? */
const defaultLocale = 'en-GB';
const defaultCurrency = 'GBP';

const localeMapping = {
  'en-GB': {
    currency: 'GBP',
    locale: 'enGB',
    dir: 'ltr'
  },
  'de-DE': {
    currency: 'EUR',
    locale: 'deDE',
    dir: 'ltr'
  },
  'en-ZA': {
    currency: 'ZAR',
    locale: 'enZA',
    dir: 'ltr'
  },
  'ar-AE': {
    currency: 'AED',
    locale: 'arAE',
    dir: 'rtl'
  }
};

const currencyMapping = {
  GBP: {
    currency: 'GBP',
    locale: 'en-GB'
  },
  EUR: {
    currency: 'EUR',
    locale: 'de-DE'
  },
  ZAR: {
    currency: 'ZAR',
    locale: 'en-ZA'
  }
};

const dateOptionsConfig = {
  'en-GB': {
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    short: { year: 'numeric', month: 'short', day: 'numeric' }
  },
  'de-DE': {
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    short: { year: 'numeric', month: 'short', day: 'numeric' }
  },
  'en-ZA': {
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    short: { year: 'numeric', month: 'short', day: 'numeric' }
  }
};

const deliveryAddressMap = ['contactName', 'street', 'town', 'postCode'];

const types = {
  '[object Date]': 'Date',
  '[object String]': 'String',
  '[object Number]': 'Number',
  '[object Boolean]': 'Boolean',
  '[object Function]': 'Function',
  '[object Symbol]': 'Symbol',
  '[object Object]': 'Object',
  '[object Null]': 'Null',
  '[object Math]': 'Math',
  '[object Undefined]': 'Undefined',
  '[object Array]': 'Array',
  '[object Window]': 'Window',
  '[object NodeList]': 'NodeList',
  '[object DOMTokenList]': 'DOMTokenList',
  '[object DocumentFragment]': 'DocumentFragment',
  '[object Map]': 'Map',
  '[object Set]': 'Set',
  '[object RegExp]': 'RegExp'
};

// use this for the text?
const stockStatuses = {
  IN_STOCK_MORE_DUE: 'In stock more due',
  IN_STOCK_NO_MORE_DUE: 'In stock no more due',
  OUT_OF_STOCK_MORE_DUE: 'Out of stock more due',
  OUT_OF_STOCK_NO_MORE_DUE: 'Out of stock no more due'
};

const oneMin = 1 * 60 * 1000;
const fiveMins = oneMin * 5;
const oneHour = oneMin * 60;
const oneDay = oneHour * 24;
const threeDays = oneDay * 3;
/**
 * some searches are by types of products rather than a search term
 */
const searchTypes = {
  'commercial-products': 'Market=Commercial',
  Clearance: 'Clearance',
  Discontinued: 'Discontinued',
  Bulkpacks: 'BulkPacks',
  New: 'New'
};

export {
  currencyMapping,
  dateOptionsConfig,
  defaultCurrency,
  defaultLocale,
  deliveryAddressMap,
  fiveMins,
  localeMapping,
  oneDay,
  stockStatuses,
  searchTypes,
  threeDays,
  types
};
