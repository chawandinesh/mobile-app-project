import PropTypes from 'prop-types';
import { ContactFormLink } from './contactFormLink';
import { stockStatus } from '../../utils/stockUtils';
import { stockStatuses } from '../../utils/constants';
import { IT, T } from '../translation';

/**
 * deals with the display of the stock in the search results and product
 * split out into different components as we [the designers] show stock slightly
 * ie very across the site
 */
const StockPill = ({ quantityInStock, additionalClass }) => {
  const cssClasses = additionalClass
    ? `pill pill--stock ${additionalClass}`
    : 'pill pill--stock';
  return (
    <p className={cssClasses}>
      <IT value={quantityInStock} strProp="productStockInStock" />
    </p>
  );
};

StockPill.propTypes = {
  quantityInStock: PropTypes.number.isRequired,
  additionalClass: PropTypes.string
};

const StockDueItem = ({ quantity, dueDateTimestamp }) => {
  return (
    <p className="product-stock__text">
      <IT
        value={quantity}
        strProp="productStockDueStock"
        dateStr={dueDateTimestamp}
      />
    </p>
  );
};

StockDueItem.propTypes = {
  quantity: PropTypes.number.isRequired,
  dueDateTimestamp: PropTypes.string.isRequired
};

const OutOfStock = ({ cssClass, strProp = 'contactUs' }) => {
  return (
    <ContactFormLink cssLinkClass="link-small-and-grey" cssClass={cssClass}>
      <T strProp={strProp} />
    </ContactFormLink>
  );
};

OutOfStock.propTypes = {
  cssClass: PropTypes.string
};

const StockMessage = ({ stock, cssClass }) => {
  const { status, quantityInStock, stockDue } = stockStatus(stock);

  if (status === stockStatuses.IN_STOCK_NO_MORE_DUE) {
    return (
      <>
        <StockPill quantityInStock={quantityInStock} />{' '}
        <OutOfStock strProp="contactUsForMore" />
      </>
    );
  } else if (status === stockStatuses.IN_STOCK_MORE_DUE) {
    const { dueDateTimestamp, quantity } = stockDue[0];
    return (
      <div className="product-stock__col">
        <StockPill quantityInStock={quantityInStock} />
        <StockDueItem quantity={quantity} dueDateTimestamp={dueDateTimestamp} />
      </div>
    );
  } else if (status === stockStatuses.OUT_OF_STOCK_MORE_DUE) {
    const { dueDateTimestamp, quantity } = stockDue[0];
    const secondStockDue = stockDue[1];

    return (
      <div className="product-stock__col">
        <StockDueItem quantity={quantity} dueDateTimestamp={dueDateTimestamp} />
        {secondStockDue && (
          <StockDueItem
            quantity={secondStockDue.quantity}
            dueDateTimestamp={secondStockDue.dueDateTimestamp}
          />
        )}
      </div>
    );
  } else {
    return <OutOfStock cssClass={cssClass} />;
  }
};

StockMessage.propTypes = {
  stock: PropTypes.array.isRequired,
  cssClass: PropTypes.string
};

export { StockMessage, StockPill, StockDueItem, OutOfStock };
