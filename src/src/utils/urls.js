/**
 * files for the endpoint urls
 * also returns additional info for the fetch
 * and an optional callback to filter/manipulate the data
 */

const base = process.env.REACT_APP_API_BASE_URL;
const urls = {
  account: () => {
    return {
      url: `${base}/api/v2/Account`,
      opts: {
        method: 'GET'
      }
    };
  },

  // gets all items in authenticated users basket
  basket: () => {
    return {
      url: `${base}/api/v2/Basket`,
      opts: {
        method: 'GET'
      }
    };
  },
  // not implemented yet
  deleteBasketItem: (bodyData) => {
    return {
      url: `${base}/api/v2/Basket/item`,
      opts: {
        method: 'PATCH',
        body: bodyData
      },
      additionHeaders: {
        'Content-Type': 'application/json'
      }
    };
  },
  // not implemented yet
  deleteQuoteItem: (bodyData) => {
    return {
      url: `${base}/api/v2/Quote/item`,
      opts: {
        method: 'PATCH',
        body: bodyData
      },
      additionHeaders: {
        'Content-Type': 'application/json'
      }
    };
  },
  // not implemented yet might be different
  deleteBasket: (basketNo) => {
    return {
      url: `${base}/api/v2/Basket/${basketNo}`,
      opts: {
        method: 'DELETE'
      }
    };
  },
  // not implemented yet might be different ie might require queryString
  deleteQuote: (basketNo) => {
    return {
      url: `${base}/api/v2/Quote/${basketNo}`,
      opts: {
        method: 'DELETE'
      }
    };
  },

  // adds an item to the users basket
  basketUpdate: (bodyData) => {
    return {
      url: `${base}/api/v2/Basket/item`,
      opts: {
        method: 'POST',
        body: bodyData
      },
      additionHeaders: {
        'Content-Type': 'application/json'
      }
    };
  },
  search: (searchValue, pageNo, productSortType) => {
    return {
      url: `${base}/api/v2/Product/search?${
        searchValue ? searchValue : ''
      }&pageNumber=${pageNo}&resultsPerPage=5${
        productSortType ? `&${productSortType}=Price` : ''
      }`,
      opts: {
        method: 'GET'
      },
      callback: (items) => {
        return Object.values(items);
      }
    };
  },
  categories: () => {
    return {
      url: `${base}/api/v2/ProductCategory`,
      opts: {
        method: 'GET'
      }
    };
  },
  // gets product details
  productNo: (productNo) => {
    return {
      url: `${base}/api/v2/Product?productCodes=${productNo}&includeSpecification=true&includeAlternates=true&includeDependencies=true`,
      opts: {
        method: 'GET'
      }
    };
  },
  filters: (queryString = '') => {
    return {
      url: `${base}/api/v2/Filter${queryString}`,
      opts: {
        method: 'GET'
      }
    };
  },
  ordersDueForDispatch: () => {
    return {
      url: `${base}/api/v2/Order/duefordispatch`,
      opts: {
        method: 'GET'
      }
    };
  },
  shipmentsDueForDispatch: () => {
    return {
      url: `${base}/api/v2/Shipment/duefordispatch`,
      opts: {
        method: 'GET'
      }
    };
  },

  buynow: (productCode, quantity) => {
    return {
      url: `${base}/api/v2/Quote/item`,
      opts: {
        method: 'POST',
        body: JSON.stringify({
          designItem: {
            productCode,
            quantity
          }
        })
      },
      additionHeaders: {
        'Content-Type': 'application/json'
      }
    };
  },

  quote: (quoteReference) => {
    return {
      url: `${base}/api/v2/quote?quoteCodes=${quoteReference}`,
      opts: {
        method: 'GET'
      }
    };
  },
  // not sure that this is correct?
  // we need to product no that is to be removed?
  updateQuote: (quoteReference, data) => {
    return {
      url: `${base}/api/v2/quote/${quoteReference}/items`,
      opts: {
        method: 'PATCH',
        body: JSON.stringify(data)
      }
    };
  }
};

export { urls };
