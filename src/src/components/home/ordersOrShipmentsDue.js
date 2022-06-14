import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSessionHook } from '../../hooks';
import { callApi } from '../../utils/call-api';
import { PageLoader } from '../generic/pageLoader';
import { OrderOrShipmentsDueItem } from './orderOrShipmentsDueItem';
import { getItemsWithinCertainDate } from './homeUtils';

/**
 * small controller type component that only makes an api call
 * @returns {JSX.Element}
 * @constructor
 */
const OrdersOrShipmentsDue = ({ type }) => {
  const sessionHelpers = useSessionHook();
  const { token, status } = sessionHelpers.getStatusAndToken();
  const [fetchingStatus, setFetchingStatus] = useState({
    hasFetched: false,
    isFetching: false,
    hasFetchingError: false
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await callApi(`${type}DueForDispatch`, {
          token,
          status
        });

        if (response.error) {
          setItems([]);
          setFetchingStatus({
            hasFetched: true,
            isFetching: false,
            hasFetchingError: true
          });
        } else {
          let {
            body: { result }
          } = response;

          const filterkey = type === 'orders' ? 'dispatchDate' : 'shippingDate';
          const filtered =
            result.items.length > 0
              ? result.items.filter((item) => {
                  return getItemsWithinCertainDate(item[filterkey]);
                })
              : [];

          setItems(filtered);
          setFetchingStatus({
            hasFetched: true,
            isFetching: false,
            hasFetchingError: false
          });
        }
      } catch (err) {
        setItems([]);
        setFetchingStatus({
          hasFetched: true,
          isFetching: false,
          hasFetchingError: false
        });
      }
    }

    const { isFetching, hasFetched } = fetchingStatus;

    if (token && !isFetching && !hasFetched) {
      setFetchingStatus({
        hasFetched: false,
        isFetching: true,
        hasFetchingError: false
      });
      fetchData();
    }
  }, [token, status, type, setItems, fetchingStatus, setFetchingStatus]);

  return fetchingStatus.isFetching || fetchingStatus.hasFetched === false ? (
    <PageLoader isLoading={fetchingStatus.isFetching} isSmall={true} />
  ) : (
    <OrderOrShipmentsDueItem
      type={type}
      items={items}
      hasFetchError={fetchingStatus.hasFetchingError}
    />
  );
};

OrdersOrShipmentsDue.propTypes = {
  type: PropTypes.string.isRequired
};

export { OrdersOrShipmentsDue };
