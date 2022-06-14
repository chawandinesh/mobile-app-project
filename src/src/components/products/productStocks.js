import { StockDueItem, OutOfStock } from '../generic/stockMessage';
import { stockStatuses } from '../../utils/constants';

/**
 * we have different rules compared to the product listing pages
 * for showing stock
 * I have x items in stock and no other stock coming
 * Show a green pill with stock
 * Show a "Contact us for more message"
 *
 * I have x items in stock and more stock coming
 * Show a green pill with stock
 * Show count of items that are due
 *
 * I have no items in stock and more stock coming
 * Show count of items that are due
 *
 * Nothing in stock and nothing due either
 * Show a "Contact us" message
 *
 * This component does not deal with showing the in stock - that is dealt
 * with in the productInfo.js component
 * it deals with showing the contact messages or the coming stock
 *
 * @param stockLevels - an object returned from stockUtils.js stockStatus
 * @constructor
 */
const ProductStocks = ({ stockLevels }) => {
  const { status, stockDue } = stockLevels;

  if (
    status === stockStatuses.IN_STOCK_MORE_DUE ||
    status === stockStatuses.OUT_OF_STOCK_MORE_DUE
  ) {
    return (
      <>
        {stockDue.map((stockItem) => {
          const { dueDateTimestamp, quantity } = stockItem;
          return (
            <StockDueItem
              key={dueDateTimestamp}
              quantity={quantity}
              dueDateTimestamp={dueDateTimestamp}
            />
          );
        })}
      </>
    );
  }

  if (
    status === stockStatuses.IN_STOCK_NO_MORE_DUE ||
    status === stockStatuses.IN_STOCK_NO_MORE_DUE
  ) {
    const strProp = stockStatuses.IN_STOCK_NO_MORE_DUE
      ? 'contactUsForMore'
      : 'contactUs';

    return (
      <p>
        <OutOfStock strProp={strProp} />
      </p>
    );
  }

  return null;
};

export { ProductStocks };
