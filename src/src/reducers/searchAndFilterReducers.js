const searchAndFilterReducerActions = {
  SEARCH_AND_FILTER_GENERIC: 'searchAndFilterGeneric',
  SET_IS_INTERSECTING: 'setIsIntersecting',
  SET_IS_NOT_INTERSECTING: 'setIsNotIntersecting',
  SEARCH_RESET: 'searchReset',
  SEARCH_RESET_CATEGORY: 'searchResetCategory'
};

const searchAndFilterInitialState = {
  isLoading: true,
  hasFetched: false,
  hasFetchingError: false,
  isFetching: false,
  hasCategoriesData: false,
  hasCategoriesDataError: false,
  isIntersecting: false,
  pageNo: 1,
  currentFilters: [],
  searchTerm: '',
  pageCount: false
};

function searchAndFilterReducer(state, action) {
  switch (action.type) {
    case searchAndFilterReducerActions.SEARCH_RESET_CATEGORY:
      return {
        ...state,
        isLoading: true,
        hasFetched: false,
        hasFetchingError: false,
        isFetching: false,
        isIntersecting: false,
        pageNo: 1,
        searchTerm: '',
        pageCount: false
      };

    case searchAndFilterReducerActions.SEARCH_RESET:
      return {
        ...state,
        isLoading: true,
        hasFetched: false,
        hasFetchingError: false,
        isFetching: false,
        isIntersecting: false,
        pageNo: 1,
        pageCount: false
      };

    case searchAndFilterReducerActions.SEARCH_AND_FILTER_GENERIC:
      return {
        ...state,
        ...action.data
      };
    case searchAndFilterReducerActions.SET_IS_INTERSECTING:
      return {
        ...state,
        isIntersecting: true
      };

    case searchAndFilterReducerActions.SET_IS_NOT_INTERSECTING:
      return {
        ...state,
        isIntersecting: false
      };

    default:
      return state;
  }
}

export {
  searchAndFilterReducerActions,
  searchAndFilterReducer,
  searchAndFilterInitialState
};
