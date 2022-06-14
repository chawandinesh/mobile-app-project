import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IT, T } from '../translation';
import { createPriceFromValue } from '../../utils/i18utils';

/**
 * layout/design is tabular so use a table
 * @param bulkOptions
 * @return {JSX.Element|null}
 * @constructor
 */
const BulkOptions = ({ bulkOptions }) => {
  return bulkOptions?.length ? (
    <div className="bulk-options">
      <table className="product-table">
        <caption className="visually-hidden">Bulk buy options</caption>
        <thead>
          <tr>
            <th scope="col" className="product-table__th">
              <T strProp="bulkBuyAmountAndLink" />
            </th>
            <th scope="col" className="product-table__th product-table__right">
              <T strProp="bulkBuyPrice" />
            </th>
          </tr>
        </thead>
        <tbody className="product-table__body">
          {bulkOptions.map((bulk) => {
            const {
              productCode,
              quantity,
              unitPrice: { amount, currency }
            } = bulk;
            return (
              <tr key={productCode}>
                <td>
                  <Link
                    className="link-secondary-alt"
                    to={`/product/${productCode}`}
                  >
                    <IT strProp="bulkBuyPack" value={quantity} />
                  </Link>
                </td>
                <td className="product-table__right">
                  {createPriceFromValue(amount, currency)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : null;
};

BulkOptions.propTypes = {
  bulkOptions: PropTypes.arrayOf(
    PropTypes.shape({
      productCode: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      unitPrice: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      }),
      unitPricePerWatt: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired
      })
    })
  )
};

export { BulkOptions };
