/* eslint-disable */
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useContext, useReducer } from 'react';
import { callApi } from '../../utils/call-api';
import Layout from '../../components/layout/layout';
import ProductInfo from '../../components/products/productInfo';
import { sortProductData } from '../../utils/sortProductData';
import {
  initialProductState,
  productReducer,
  productActionTypes
} from '../../reducers/productReducer';
import { globalActionsTypes } from '../../hooks/globalReducer';
import { GlobalContext } from '../../contexts/globalContext';
import { useSessionHook, UseHttpModalHook } from '../../hooks';
import { PageLoader } from '../../components/generic/pageLoader';

function Product() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const [pState, pDispatch] = useReducer(productReducer, initialProductState);
  const { state, dispatch } = useContext(GlobalContext);
  const sessionHelpers = useSessionHook();
  const checkHttpStatus = UseHttpModalHook();
  const searchTerm = search.get('searchTerm');
  const { token, status } = sessionHelpers.getStatusAndToken();

  const {
    productData,
    fetchingBasket,
    fetchingProduct,
    hasFetchedProduct,
    submitted,
    showAddedMessage,
    submittedQuantity,
    submissionError,
    percentageDiscount,
    currentProductId
  } = pState;

  useEffect(() => {
    if (currentProductId === null) {
      pDispatch({
        type: productActionTypes.productUpdate,
        data: {
          currentProductId: productId
        }
      });
    } else if (currentProductId !== productId) {
      // need to reset the reducer
      // so that we can refetch the data
      // changing the params does not remount the page
      pDispatch({
        type: productActionTypes.resetReducer
      });
    }
  }, [productId, currentProductId, pDispatch, navigate]);

  useEffect(() => {
    const { initialBasketFetch, basket } = state;
    if (initialBasketFetch && basket) {
      const { percentage } = basket.quote.totalsResponse.discount;
      pDispatch({
        type: productActionTypes.setAccountData,
        data: {
          percentageDiscount: percentage
        }
      });
    }
  }, [state, pDispatch]);

  useEffect(() => {
    async function fetchProductData() {
      const response = await callApi('productNo', { token, status }, productId);
      let productDataLocal;
      if (response.error) {
        checkHttpStatus(response.statuses);
      } else {
        productDataLocal = sortProductData(response, productId);
      }

      pDispatch({
        type: productActionTypes.productUpdate,
        data: {
          fetchingProduct: false,
          hasFetchedProduct: true,
          productData: productDataLocal
        }
      });
    }

    if (productId && !fetchingProduct && !hasFetchedProduct && token) {
      pDispatch({
        type: productActionTypes.productUpdate,
        data: {
          fetchingProduct: true,
          hasFetchedProduct: false
        }
      });
      fetchProductData();
    }
  }, [productId, sessionHelpers, hasFetchedProduct]);

  useEffect(() => {
    /**
     * updates the global reducer with the product that
     * has been added
     * @returns {Promise<void>}
     */
    async function refetchBasketData() {
      const response = await callApi(
        'basket',
        sessionHelpers.getStatusAndToken()
      );

      if (response.error) {
        pDispatch({
          type: productActionTypes.fetchingBasketFail
        });

        dispatch({
          type: globalActionsTypes.productAddedError
        });
      } else {
        dispatch({
          type: globalActionsTypes.productAddedSuccess,
          data: response.body
        });
        pDispatch({
          type: productActionTypes.fetchingBasketSuccess
        });
      }
    }

    if (submitted === true && fetchingBasket === false) {
      pDispatch({
        type: productActionTypes.productUpdate,
        data: {
          fetchingBasket: true
        }
      });
      refetchBasketData();
    }
  }, [submitted, dispatch, sessionHelpers, fetchingBasket]);

  /**
   * handle submit
   * @param e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const target = e.target;
    const designItem = {};
    const formData = new FormData(target);
    // create data to send
    for (const pair of formData.entries()) {
      designItem[pair[0]] = pair[1];
    }

    /**
     postdata format
     "designItem": {
        "category": "Mounting",
        "productCode": "REN-500401",
        "quantity": 2
      }
     */
    try {
      const response = await callApi(
        'basketUpdate',
        sessionHelpers.getStatusAndToken(),
        JSON.stringify({ designItem })
      );
      if (response.error) {
        pDispatch({
          action: productActionTypes.productUpdate,
          data: {
            submissionError: true
          }
        });
      } else {
        pDispatch({
          type: productActionTypes.productUpdate,
          data: {
            submitted: true,
            submissionError: false,
            submittedQuantity: formData.get('quantity')
          }
        });
      }
    } catch (err) {
      pDispatch({
        action: productActionTypes.productUpdate,
        data: {
          submissionError: true
        }
      });
    }
  };

  if (fetchingProduct || !token) {
    return (
      <Layout title="loadingPage">
        <PageLoader isLoading={fetchingProduct} />
      </Layout>
    );
  }

  return (
    <>
      {productData && !productData.error ? (
        <Layout
          title={[
            productData.description,
            productData.subCategory,
            productData.category
          ]}
          translate={false}
        >
          <ProductInfo
            productData={productData}
            handleSubmit={handleSubmit}
            showAddedMessage={showAddedMessage}
            submissionError={submissionError}
            submittedQuantity={submittedQuantity}
            searchTerm={state.searchTerm}
            discount={percentageDiscount}
          />
        </Layout>
      ) : (
        <Layout title="whatever">
          <p></p>
        </Layout>
      )}
    </>
  );
}

export default Product;
