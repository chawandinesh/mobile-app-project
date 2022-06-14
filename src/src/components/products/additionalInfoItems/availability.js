import PropTypes from 'prop-types';
import { T } from '../../translation';
import { DateStr } from '../../generic/dateStr';
import { createStockAvailabilityArray } from '../../../utils/stockUtils';

/**
 * displays a list of stock
 * additionalData is an array of stockStatus objects from stockUtils.stockStatues()
 * @param additionalData
 * @param productData
 * @constructor
 */
const Availability = ({ additionalData, productData }) => {
  //need to create the data
  const stockArr = createStockAvailabilityArray(additionalData);
  const length = stockArr.length - 1;
  return (
    <>
      <p className="additional-availability__prod-no">
        {productData.productCode}
      </p>
      <ol className="additional__list">
        {stockArr.map((stockItem, i) => {
          const { key, strProp, dueDateTimestamp, quantity } = stockItem;

          return (
            <li className="additional__item" key={key}>
              <div
                className={
                  i < length
                    ? 'additional__inner'
                    : 'additional__inner additional__inner--no-border'
                }
              >
                <span className="additional-availability__text">
                  {strProp ? (
                    <T strProp={strProp} />
                  ) : (
                    <DateStr timestamp={dueDateTimestamp} />
                  )}
                </span>{' '}
                {quantity && (
                  <span>
                    <T strProp="quantity" />
                    {' : '}
                    {quantity}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
};

Availability.propTypes = {
  productData: PropTypes.object.isRequired,
  additionalData: PropTypes.shape({
    status: PropTypes.string.isRequired,
    statusCode: PropTypes.string.isRequired,
    quantityInStock: PropTypes.number,
    stockDue: PropTypes.array,
    strProp: PropTypes.string.isRequired
  }).isRequired
};

export { Availability };
