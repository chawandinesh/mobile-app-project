import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { callApi } from '../../utils/call-api';
import { UseHttpModalHook, useSessionHook } from '../../hooks';
import Layout from '../../components/layout/layout';
import { useEffect } from 'react';
import { PageLoader } from '../../components/generic/pageLoader';
import { BuyNowInner } from '../../components/order/buyNowInner';

/**
 * virtually impossible to write tests for
 * @return {JSX.Element}
 * @constructor
 */
export default function Buynow() {
  const sessionHelpers = useSessionHook();
  const checkHttpStatus = UseHttpModalHook();
  const { productCode, quantity } = useParams();
  const { token, status } = sessionHelpers.getStatusAndToken();

  const [buyNowData, setBuyNowData] = useState({
    hasFetched: false,
    loading: true,
    buyNowData: null,
    hasError: false
  });

  useEffect(() => {
    async function fetchData(productCode, quantity) {
      const response = await callApi(
        'buynow',
        { token, status },
        productCode,
        quantity
      );

      let buyNowDataLocal;
      let localHasError = false;

      if (response.error) {
        // put into a function
        checkHttpStatus(response.statuses);
        localHasError = true;
      } else {
        const {
          body: { result }
        } = response;

        if (result) {
          buyNowDataLocal = result;
        } else {
          buyNowDataLocal = {};
        }
      }
      setBuyNowData({
        buyNowData: buyNowDataLocal,
        hasFetched: true,
        loading: false,
        hasError: localHasError
      });
    }

    if (productCode && quantity && !buyNowData.hasFetched && token) {
      fetchData(productCode, quantity);
    }
  }, [
    productCode,
    buyNowData,
    setBuyNowData,
    token,
    status,
    quantity,
    checkHttpStatus
  ]);

  return (
    <Layout
      title="orderConfirmOrder"
      h1="orderConfirmOrder"
      showBackLinkArrow={true}
    >
      {buyNowData.loading ? (
        <PageLoader isLoading={true} isSmall={true} />
      ) : (
        <BuyNowInner
          hasError={buyNowData.hasError}
          buyNowData={buyNowData.buyNowData}
        />
      )}
    </Layout>
  );
}
