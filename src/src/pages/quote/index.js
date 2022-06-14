import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { PageLoader } from '../../components/generic/pageLoader';
import { callApi } from '../../utils/call-api';
import { useSessionHook, UseHttpModalHook } from '../../hooks';
import { QuoteOrBasketInner } from '../../components/quoteOrBasketInner';
import {
  basketAndQuoteActionTypes,
  basketAndQuoteReducer,
  initialState
} from '../../reducers/basketAndQuoteReducer';

export default function Basket() {
  const [state, dispatch] = useReducer(basketAndQuoteReducer, initialState);
  const { token, status } = useSessionHook().getStatusAndToken();
  const checkHttpStatus = UseHttpModalHook();
  const { quoteReference } = useParams();

  /**
   * remove item from basket
   * not working yet as we don't have the end points
   */
  useEffect(() => {
    async function deleteItem() {
      const response = await callApi(
        'updateQuote',
        { token, status },
        state.productNo
      );
      if (response.error) {
        checkHttpStatus(response.statuses);
        dispatch({
          type: basketAndQuoteActionTypes.setQuote,
          data: {
            quote: null,
            productNo: null,
            modalOpen: false,
            confirmDelete: false
          }
        });
      } else {
        dispatch({
          type: basketAndQuoteActionTypes.setQuote,
          data: {
            quote: response.body.result.quote,
            productNo: null,
            modalOpen: false,
            confirmDelete: false
          }
        });
      }
    }

    if (state.confirmDelete && state.productNo && token && !state.loading) {
      dispatch({
        type: basketAndQuoteActionTypes.setLoading,
        data: true
      });
      deleteItem();
    }
  }, [state, token, status, checkHttpStatus]);

  /**
   * removes whole quote
   * we don't have the end point for this
   * not sure what we are going to do here
   * where do we go to after deleting the basket
   * or do we just show a message
   */
  useEffect(() => {
    async function deleteQuote() {
      const response = await callApi(
        'deleteQuote',
        { token, status },
        quoteReference
      );
      if (response.error) {
        checkHttpStatus(response.statuses);
        dispatch({
          type: basketAndQuoteActionTypes.setQuote,
          data: {
            quote: null,
            confirmRemoval: false
          }
        });
      } else {
        dispatch({
          type: basketAndQuoteActionTypes.setQuote,
          data: {
            quote: response.body.result.quote,
            confirmRemoval: false
          }
        });
      }
    }

    if (state.confirmRemoval && !state.loading && token) {
      deleteQuote();
    }
  }, [token, status, checkHttpStatus, state, quoteReference]);

  useEffect(() => {
    async function getData() {
      const response = await callApi(
        'quote',
        { token, status },
        quoteReference
      );
      if (response.error) {
        checkHttpStatus(response.statuses);
        dispatch({
          type: basketAndQuoteActionTypes.setQuote,
          data: {
            quote: null
          }
        });
      } else {
        dispatch({
          type: basketAndQuoteActionTypes.setQuote,
          data: {
            quote: response.body.result.items[0]
          }
        });
      }
    }

    if (token && status && quoteReference) {
      getData();
    }
  }, [token, status, checkHttpStatus, dispatch, quoteReference]);

  // need to do this after delete or whatever
  useEffect(() => {
    if (state.quote) {
      if (state.itemsChanged) {
        const { quote } = state;
        const items = quote.items.map((item) => ({
          ...item,
          totalPrice: {
            ...item.totalPrice,
            amount: item.netPrice.amount * item.quantity
          }
        }));
        let newQuote = { ...quote, items };
        const netPriceAmount = items.reduce(
          (total, currentValue) => total + currentValue.totalPrice.amount,
          0
        );
        const taxValue = netPriceAmount * 0.2;
        const grossTotalAmount = netPriceAmount * 1.2;
        newQuote.totalsResponse.netPrice.amount = netPriceAmount;
        newQuote.totalsResponse.tax.value = taxValue;
        newQuote.totalsResponse.grossTotal.amount = grossTotalAmount;
        dispatch({
          type: basketAndQuoteActionTypes.setQuote,
          data: {
            quote: newQuote,
            itemsChanged: false
          }
        });
      }
    }
  }, [state, dispatch]);

  // async function updateQuoteAPI(productCode, quantity) {
  //   // needs to be debounced
  //   const response = await callApi(
  //     'updateQuote',
  //     { token, status },
  //     quoteReference,
  //     {
  //       designItem: {
  //         productCode: productCode,
  //         quantity: quantity
  //       }
  //     }
  //   );
  //   if (response.error) {
  //     checkHttpStatus(response.statuses);
  //   }
  // }

  const { quote, loading } = state;

  return (
    <Layout
      title="quoteHeadingMain"
      h1="quoteHeadingMain"
      pageClassName="quote"
    >
      {loading ? (
        <PageLoader isLoading={loading} />
      ) : quote ? (
        <QuoteOrBasketInner state={state} dispatch={dispatch} />
      ) : (
        <p>An error has occured</p>
      )}
    </Layout>
  );
}
