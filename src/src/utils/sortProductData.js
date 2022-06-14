import { getCurrency } from '../utils/utils';
import { stockStatus } from './stockUtils';

/**
 * we have a fair bit of data in the product details page
 * availability is added here as we use a couple of times
 * [see test data]
 */
const sortProductData = (response, productNo) => {
  const upper = productNo.toUpperCase();
  let result = response.body.result.items[upper];

  const { stockLevels, unitPrice, alternates } = result;
  const { currency, amount } = unitPrice;
  // flatten the data a bit to save lookups
  // filter alternatives as sometimes the data is null which causes a
  // a problem
  return {
    ...result,
    availability: stockStatus(stockLevels),
    alternates: alternates.filter((add) => add.alternateProduct !== null),
    currency,
    amount,
    locale: getCurrency(currency).locale
  };
};
export { sortProductData };
