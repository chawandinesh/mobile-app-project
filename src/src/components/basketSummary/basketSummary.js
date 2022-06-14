import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../contexts/globalContext';
import { callApi } from '../../utils/call-api';
import { globalActionsTypes } from '../../hooks/globalReducer';
import { BasketSummaryText } from './basketSummaryText';
import { useSessionHook } from '../../hooks';

const BasketSummary = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [basketItems, setBasketItems] = useState({
    length: null,
    updateError: false
  });
  const sessionHelpers = useSessionHook();
  const { token } = sessionHelpers.getStatusAndToken();

  useEffect(() => {
    if (!token) {
      return;
    }

    async function fetchData() {
      const response = await callApi('basket', { token });
      if (response.error) {
        setBasketItems({
          length: null,
          updateError: true
        });
        dispatch({
          type: globalActionsTypes.initialBasketFetchedFailure
        });
      } else {
        dispatch({
          type: globalActionsTypes.initialBasketFetchedSuccess,
          data: response.body
        });
      }
      setLoading(false);
    }

    if (!state.initialBasketFetch) {
      fetchData();
    }
  }, [dispatch, state.initialBasketFetch, token]);

  useEffect(() => {
    const items = state.basket?.quote?.items;
    const { updateError } = state;
    if (!items) {
      return;
    }

    // need to filter out the delivery items
    // the delivery info is in the items array
    const actualItems = items.filter(
      (item) => item.productCode.toUpperCase() !== 'DELIVERY'
    );

    if (basketItems.length !== actualItems.length) {
      setBasketItems({
        length: actualItems.length,
        updateError: false
      });
    }

    if (updateError) {
      setBasketItems({
        ...basketItems,
        updateError: true
      });
    }
  }, [basketItems, state]);

  if (loading && !state.initialFetch) {
    return (
      <div className="basket-summary__loading">
        <p className="search__loading">
          <span className="visually-hidden">Loading</span>
        </p>
      </div>
    );
  }

  return token ? (
    <Link to="/basket" data-meta="header-basket" className="main-header__links">
      <svg className="svg-bag">
        <use href="#svg-bag" />
      </svg>
      <BasketSummaryText
        length={basketItems.length}
        error={basketItems.updateError}
      />
    </Link>
  ) : null;
};

export { BasketSummary };
