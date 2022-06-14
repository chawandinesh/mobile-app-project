const initialGlobalState = {
  basket: null,
  initialBasketFetch: false,
  initialBasketFetchError: null,
  productSortType: false,
  productViewType: 'list',
  searchTerm: '',
  isModalOpen: '',
  modalMessage: ''
};

const globalActionsTypes = {
  closeModal: 'CLOSE_MODAL',
  initialBasketFetchedSuccess: 'INITIAL_BASKET_FETCHED_SUCCESS',
  initialBasketFetchedFailure: 'INITIAL_BASKET_FETCHED_FAILURE',
  productAddedSuccess: 'PRODUCT_ADDED_SUCCESS',
  productAddedError: 'PRODUCT_ADDED_ERROR',
  setModal: 'SET_MODAL',
  setProductViewType: 'SET_PRODUCT_VIEW_TYPE',
  setProductSortType: 'SET_PRODUCT_SORT_TYPE',
  updateSearchTerm: 'UPDATE_SEARCH_TERM'
};

/**
 * ONLY PUT TRULY GLOBAL STATE IN HERE NOT EVERY API CALL ETC
 * ONLY THINGS THAT ARE GOING TO BE RE-USED ON DIFFERENT PAGES
 * OR WHEN YOU RETURN TO A PAGE IE MENU OPEN ETC
 *
 * simple reducer at the moment but we might need to
 * make it a little more complicated with nested state or deeper state
 * objects
 */
function globalReducer(state, action) {
  switch (action.type) {
    case globalActionsTypes.closeModal:
      return {
        ...state,
        isModalOpen: '',
        modalMessage: ''
      };
    case globalActionsTypes.setModal:
      return {
        ...state,
        ...action.data
      };

    case globalActionsTypes.updateSearchTerm:
      return {
        ...state,
        searchTerm: action.data.searchTerm
      };

    case globalActionsTypes.productAddedSuccess:
      return {
        ...state,
        basket: action.data.result,
        mostRecentAction: action.type
      };
    // just keep data the same
    case globalActionsTypes.productAddedError:
      return {
        ...state,
        mostRecentAction: action.type
      };
    case globalActionsTypes.initialBasketFetchedSuccess:
      return {
        ...state,
        basket: action.data.result,
        initialBasketFetch: true,
        initialBasketFetchError: false
      };
    case globalActionsTypes.initialBasketFetchedFailure:
      return {
        ...state,
        basket: null,
        initialBasketFetch: true,
        initialBasketFetchError: false
      };
    case globalActionsTypes.setProductViewType:
      return {
        ...state,
        productViewType: action.data
      };
    case globalActionsTypes.setProductSortType: {
      const { productSortType } = state;
      let updatedProductSortType;
      if (!productSortType) {
        updatedProductSortType = 'SortAsc';
      } else {
        updatedProductSortType =
          productSortType === 'SortAsc' ? 'SortDesc' : 'SortAsc';
      }

      return {
        ...state,
        productSortType: updatedProductSortType
      };
    }

    default:
      return state;
  }
}

export { globalReducer, initialGlobalState, globalActionsTypes };
