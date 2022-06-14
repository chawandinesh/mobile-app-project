import { defaultLocale, stockStatuses } from './constants';
import { createMultipleDates } from './i18utils';

/**
 *
 * : We get a stock object which may be [] or may have various stock
 * objects in it.
 * eg   {
          plannedDate: '2021-12-02T00:00:00',
          quantity: 12,
          inStock: false
        }
 *
 * ##### THESE ARE THE RULES FOR SHOWING MESSAGES AND STOCK
 * (at least the ones we are working to) #####
 * FYI I don't understand why you show the "Contact us for more" link
 * when you could just show the coming stock??????
 * but hey "mine is not to reason why, just do or die"
 *
 *
 1: I have 100 in stock, 10 due on 20 April, and 15 due on 30 April
 100 in stock
 Contact us for more

 2: I have zero in stock, 10 due on 20 April, and 15 due on 30 April
 10 due on 20 apr 2022
 Contact us for more

 3: I have zero in stock, and zero inbound
 Contact us

 4: I have 10 in stock, 10 due on 20 April
 10 in stock
 Contact us for more
 */

/**
 * gets quantity from stock items
 * @returns {*}
 * @param arr
 */
const getQuantity = (arr) => {
  return arr.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);
};

/**
 * using array.find only returns a single result which
 * is not so good for our use case
 * @param {array} stock
 * @param {boolean} inStockBool
 */
const inOrDueStock = (stock, inStockBool = true) =>
  stock.filter((item) => item.inStock === inStockBool);
/**
 * not tested directly
 * function creates an array of out of stock items
 * @returns {object} - {{quantity: int, dueDateTimestamp, dueState: string, dueStateLong: string}}
 * @param arr
 * @param locale
 */
const getStockDue = (arr, locale) => {
  return arr.map((item) => {
    const { quantity, plannedDate } = item;
    return {
      quantity,
      ...createMultipleDates(plannedDate, locale)
    };
  });
};
/**
 *
 * @returns {object} - {
 *status: string,
 * statusCode: string,
 *quantityInStock: int,
 * stockDue: null || {{dueDateTimestamp, dueState: string, dueStateLong: string}}
 *}
 * @param stock
 * @param locale
 */
const stockStatus = (stock, locale = defaultLocale) => {
  const inStock = inOrDueStock(stock);
  const dueStock = inOrDueStock(stock, false);
  const hasStock = inStock.length || dueStock.length;
  // defaults are when no stock
  let stockDue = null;
  let statusCode = 'OUT_OF_STOCK_NO_MORE_DUE';
  let quantityInStock = 0;
  let strProp = 'contactUs';

  // if stock we need to change the defaults
  if (hasStock) {
    if (inStock.length && !dueStock.length) {
      statusCode = 'IN_STOCK_NO_MORE_DUE';
      // just possibly there are more than one instock item
      quantityInStock = getQuantity(inStock);
      strProp = 'productStockInStock';
    }

    if (!inStock.length && dueStock.length) {
      statusCode = 'OUT_OF_STOCK_MORE_DUE';
      quantityInStock = 0;
      stockDue = getStockDue(dueStock, locale);
      strProp = 'productStockDueStock';
    }

    if (inStock.length && dueStock.length) {
      statusCode = 'IN_STOCK_MORE_DUE';
      quantityInStock = getQuantity(inStock);
      stockDue = getStockDue(dueStock, locale);
      strProp = 'productStockInStock';
    }
  }

  return {
    status: stockStatuses[statusCode],
    statusCode,
    quantityInStock,
    stockDue,
    strProp
  };
};
/**
 *
 * @param {array} - stock array of stock items
 * @returns {*[]} - may return an empty array
 */
const stockMessageProducts = (stock) => {
  const { statusCode, stockDue, quantityInStock, status } = stockStatus(stock);
  let stockType = true;

  let strProps = [];
  if (status === stockStatuses.OUT_OF_STOCK_NO_MORE_DUE) {
    stockType = false;
    strProps.push({
      strProp: 'contactUs'
    });
  } else {
    if (
      status === stockStatuses.IN_STOCK_NO_MORE_DUE ||
      status === stockStatuses.IN_STOCK_MORE_DUE
    ) {
      strProps.push({
        statusCode,
        strProp: 'productStockInStock',
        quantity: quantityInStock
      });
    }
    // change to use the constant
    if (
      status === stockStatuses.OUT_OF_STOCK_MORE_DUE ||
      status === stockStatuses.IN_STOCK_MORE_DUE
    ) {
      stockDue.forEach((stockItem) => {
        strProps.push({
          statusCode,
          strProp: 'productStockDueStock',
          quantity: stockItem.quantity,
          dueDate: stockItem.dueDate
        });
      });
    }
  }

  return {
    stockType,
    strProps,
    statusCode
  };
};

/**
 * takes a stockStatus object and uses it to create an array
 * that is use to show availability on the product page
 * @param stockStatus - a stock object returned from stockStatus()
 *
 * we add a key to object in this array as there is no
 * obvious key to use otherwise
 * @return {[{key: string, strProp}]|*[]}
 */
const createStockAvailabilityArray = (stockStatus) => {
  const { status, quantityInStock, stockDue, strProp } = stockStatus;

  let inStock = [];
  let comingStock = [];
  if (status === stockStatuses.OUT_OF_STOCK_NO_MORE_DUE) {
    return [{ strProp, key: 'outofstock' }];
  }

  if (quantityInStock > 0) {
    inStock = [
      {
        strProp,
        quantity: quantityInStock,
        key: 'instock'
      }
    ];
  }

  if (
    status === stockStatuses.OUT_OF_STOCK_MORE_DUE ||
    status === stockStatuses.IN_STOCK_MORE_DUE
  ) {
    comingStock = stockDue.map((stockItem) => ({
      dueDateTimestamp: stockItem.dueDateTimestamp,
      quantity: stockItem.quantity,
      key: stockItem.dueDateTimestamp
    }));
  }

  return [].concat(inStock, comingStock);
};

export {
  stockMessageProducts,
  stockStatus,
  inOrDueStock,
  createStockAvailabilityArray
};
