/**
 * used on product page
 * mainly as there were lot of useStates and it was confusing
 */
const initialProductState = {
  fetchingBasket: false,
  fetchingProduct: false,
  hasFetchedProduct: false,
  productData: null,
  submitted: false,
  submittedQuantity: 0,
  submissionError: false,
  showAddedMessage: false,
  percentageDiscount: 0,
  currentProductId: null
};

const productActionTypes = {
  productUpdate: 'PRODUCT_UPDATE',
  fetchingBasketFail: 'FETCHING_BASKET_FAIL',
  fetchingBasketSuccess: 'FETCHING_BASKET_SUCCESS',
  setAccountData: 'SET_ACCOUNT_DATA',
  resetReducer: 'RESET_REDUCER'
};
// todo refactor this some state items are never used
const productReducer = (state, action) => {
  switch (action.type) {
    // generic update just for ease
    case productActionTypes.productUpdate:
      return {
        ...state,
        ...action.data
      };
    case productActionTypes.setAccountData:
      return {
        ...state,
        ...action.data
      };
    case productActionTypes.fetchingBasketFail:
      return {
        ...state,
        ...{ fetchingBasket: false, submitted: false, showAddedMessage: false }
      };

    case productActionTypes.fetchingBasketSuccess:
      return {
        ...state,
        ...{ fetchingBasket: false, submitted: false, showAddedMessage: true }
      };

    case productActionTypes.resetReducer:
      // need to retain the discount
      return {
        ...initialProductState,
        percentageDiscount: state.percentageDiscount
      };
    default:
      return state;
  }
};

export { initialProductState, productReducer, productActionTypes };
