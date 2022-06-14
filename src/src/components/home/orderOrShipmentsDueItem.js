import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { T } from '../translation';
import { DateStr } from '../generic/dateStr';
import { getMappedData, getCorrectError } from './homeUtils';

const OrderOrShipmentsDueItem = ({ type, items, hasFetchError }) => {
  return (
    <div className="orders-due">
      <h2 className="heading-level-two">
        <T
          strProp={type === 'orders' ? 'orderDueTitle' : 'shipmentsDueTitle'}
        />{' '}
        <span className="heading-level-two--subtext">
          <T strProp="orderOrShipStrap" />
        </span>
      </h2>
      {items.length === 0 || hasFetchError ? (
        <p className="orders-due__no-orders">
          <T strProp={getCorrectError(type, hasFetchError)} />
        </p>
      ) : (
        <ol className="orders-due__list">
          {[...items.slice(0, 3)].map((item) => {
            const { id, status, description, date } = getMappedData(item, type);
            return (
              <li key={id} className="orders-due__item">
                <div>
                  <div className="orders-due__inner">
                    <svg className="svg-order" aria-hidden="true">
                      <use href="#svg-order" />
                    </svg>
                    <Link to={`/${type}/${id}`} className="orders-due__link">
                      {id}
                    </Link>
                  </div>
                  <p className="orders-due__desc">{description}</p>
                  <p data-meta="order-date" className="orders-due__date">
                    <T strProp="orderOrShipmentsDispatch" /> :{' '}
                    <b>
                      <DateStr timestamp={date} />
                    </b>
                  </p>
                </div>
                <p className="pill">{status}</p>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

OrderOrShipmentsDueItem.propTypes = {
  type: PropTypes.oneOf(['orders', 'shipments']).isRequired,
  items: PropTypes.array,
  hasFetchError: PropTypes.bool
};

OrderOrShipmentsDueItem.defaultProps = {
  hasFetchError: false
};

export { OrderOrShipmentsDueItem };
