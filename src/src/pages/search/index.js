import { useParams, useSearchParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { useContext, useEffect, useReducer, useState } from 'react';
import { GlobalContext } from '../../contexts/globalContext';
import {
  useSessionHook,
  UseHttpModalHook,
  useElementOnScreen
} from '../../hooks';
import { callApi } from '../../utils/call-api';
import {
  searchAndFilterInitialState,
  searchAndFilterReducerActions,
  searchAndFilterReducer
} from '../../reducers/searchAndFilterReducers';
import { globalActionsTypes } from '../../hooks/globalReducer';
import { ProductListingOuter } from '../../components/search/productListingOuter';
import { PageLoader } from '../../components/generic/pageLoader';
import { createQueryString } from '../../utils/searchUtils';

/**
 * searches for products or categories/subcategories depending on the search string.
 * If the user comes to this page directly or without a search string it will default
 * to "all" (from searchAndFilterInitialState)
 */
export default function SearchHome() {
  const { state, dispatch } = useContext(GlobalContext);
  const [currentQuery, setCurrentQuery] = useState(false);
  // note that this will be reset when we come to the page
  // as it is a new instance of the this useReducer
  const [searchState, searchDispatch] = useReducer(
    searchAndFilterReducer,
    searchAndFilterInitialState
  );

  const { category, subcategory } = useParams();
  const [query] = useSearchParams();
  const [productData, setProductData] = useState(false);
  const sessionHelpers = useSessionHook();
  const checkHttpStatus = UseHttpModalHook();

  const { token, status } = sessionHelpers.getStatusAndToken();
  const { productSortType } = state;
  const {
    isIntersecting,
    pageNo,
    hasFetched,
    isFetching,
    hasFetchingError,
    pageCount
  } = searchState;
  const [containerRef, isVisible] = useElementOnScreen();

  // reset the loading/hasFetched etc when we have a new searchTerm
  // also reset the global search term
  useEffect(() => {
    const queryStr = query.toString();

    if (queryStr !== currentQuery) {
      searchDispatch({
        type: searchAndFilterReducerActions.SEARCH_RESET_CATEGORY
      });

      if (query.has('searchTerm')) {
        dispatch({
          type: globalActionsTypes.updateSearchTerm,
          data: {
            searchTerm: query.get('searchTerm')
          }
        });
      }

      setCurrentQuery(queryStr);
    }
  }, [query, currentQuery, dispatch]);

  useEffect(() => {
    searchDispatch({
      type: searchAndFilterReducerActions.SEARCH_RESET_CATEGORY
    });

    // reset search term if we have either
    if (category || subcategory) {
      dispatch({
        type: globalActionsTypes.updateSearchTerm,
        data: {
          searchTerm: ''
        }
      });
    }
  }, [category, subcategory, searchDispatch, dispatch]);

  // if we have a new productSortType
  // we need to re-do a search so have to set the page etc
  // as the sort will bring back a different set of results
  // so set pageNo back to 1
  // once we have set a sortType we cannot stop having it?
  useEffect(() => {
    if (productSortType) {
      setProductData(false);
      searchDispatch({
        type: searchAndFilterReducerActions.SEARCH_AND_FILTER_GENERIC,
        data: {
          isFetching: false,
          hasFetched: false,
          pageNo: 1
        }
      });
    }
  }, [productSortType]);

  useEffect(() => {
    if (!isIntersecting && isVisible) {
      searchDispatch({
        type: searchAndFilterReducerActions.SET_IS_INTERSECTING
      });
    }
  }, [isVisible, isIntersecting, searchDispatch]);

  useEffect(() => {
    async function fetchData(pageNo, createdQueryStr, productSortType) {
      const response = await callApi(
        'search',
        { token, status },
        createdQueryStr,
        pageNo,
        productSortType
      );

      let productDataLocal;
      // these 2 lets below change depending
      // on whether we get results or the api fails
      let fetchingErrorLocal = false;
      let hasFetchedLocal = true;
      let pageCountLocal = false;

      if (response.error) {
        // put into a function

        checkHttpStatus(response.statuses);

        fetchingErrorLocal = true;
        hasFetchedLocal = false;
      } else {
        const {
          body: { result }
        } = response;

        if (result.items.length > 0) {
          if (pageNo === 1) {
            productDataLocal = result.items;
          } else {
            productDataLocal = [...productData, ...result.items];
          }
          pageCountLocal = result.pageCount;
        } else {
          fetchingErrorLocal = true;
          hasFetchedLocal = false;
          productDataLocal = [];
        }
      }
      setProductData(productDataLocal);
      searchDispatch({
        type: searchAndFilterReducerActions.SEARCH_AND_FILTER_GENERIC,
        data: {
          hasFetched: hasFetchedLocal,
          isLoading: false,
          isFetching: false,
          isIntersecting: false,
          hasFetchingError: fetchingErrorLocal,
          pageCount: pageCountLocal
        }
      });
    }

    // end of fetchData

    // if we have reached the end of pagination don't do any more fetches
    if (pageCount && pageCount < pageNo + 1) {
      return;
    }

    if (token && !hasFetchingError) {
      const createdQueryStr = createQueryString(
        [
          {
            key: 'CategoryId',
            value: category
          },
          {
            key: 'SubCategoryId',
            value: subcategory
          }
        ],
        window.location.search,
        [
          'BrandId',
          'Market',
          'Range',
          'New',
          'Clearance',
          'Discontinued',
          'Bulkpacks',
          'Recent',
          'searchTerm',
          'technologyId'
        ]
      );

      if (pageNo === 1 && !hasFetched && !isFetching) {
        searchDispatch({
          type: searchAndFilterReducerActions.SEARCH_AND_FILTER_GENERIC,
          data: {
            isFetching: true
          }
        });

        fetchData(pageNo, createdQueryStr, productSortType);
      } else if (
        hasFetched &&
        isIntersecting &&
        !isFetching &&
        !hasFetchingError
      ) {
        searchDispatch({
          type: searchAndFilterReducerActions.SEARCH_AND_FILTER_GENERIC,
          data: {
            isFetching: true,
            hasFetched: false,
            pageNo: pageNo + 1
          }
        });
        fetchData(pageNo + 1, createdQueryStr, productSortType);
      }
    }
  }, [
    currentQuery,
    token,
    status,
    isIntersecting,
    pageNo,
    pageCount,
    hasFetched,
    isFetching,
    productData,
    productSortType,
    hasFetchingError,
    category,
    subcategory,
    dispatch,
    checkHttpStatus
  ]);

  return (
    <Layout
      title="searchPageHeading"
      h1="searchPageHeading"
      isHiddenHeading={true}
      showBreadCrumb={true}
    >
      <>
        <ProductListingOuter productData={productData} />

        {((!hasFetchingError && !hasFetched && pageNo === 1) ||
          (isFetching && pageNo > 1)) && (
          <PageLoader isLoading={true} isSmall={true} />
        )}

        {!isIntersecting && hasFetched && <div ref={containerRef} />}
      </>
    </Layout>
  );
}
