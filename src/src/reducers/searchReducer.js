/**
 * remove api calls from the body as there is a lot of repeated code
 * @returns {Promise<void>}
 */
const searchActionsTypes = {
  searchUpdate: 'updateSingle'
};
const searchReducerInitialState = {
  error: '',
  items: [],
  loading: false,
  noResults: false,
  pages: null,
  searchParam: false,
  totalItems: 0,
  fetching: false
};

/**
 * very simple reducer just to aggregate all the state from
 * search.js into one place.
 * Simple structure and only on action.type
 * @param state
 * @param action
 * @returns {(*)|*}
 */
function searchReducer(state, action) {
  switch (action.type) {
    // simple case for all action is data: {error: false} or data: {loading: false}
    // so we can spread them
    case searchActionsTypes.searchUpdate:
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
}

const createSearchAction = (data) => {
  return {
    type: searchActionsTypes.searchUpdate,
    data
  };
};

/**
 * helper function to upload
 * @param result
 * @param loading
 * @returns {{totalItems: *, pages: *[], noResults: boolean, loading}}
 */
const updateItemsAndPages = (result, loading) => {
  if (Array.isArray(result)) {
    return {
      noResults: result[0].items.length === 0,
      totalItems: result[0].itemCount,
      pages: result,
      loading
    };
  }

  return {
    noResults: result.items.length === 0,
    totalItems: result.itemCount,
    pages: [result],
    loading
  };
};

export {
  createSearchAction,
  searchActionsTypes,
  searchReducer,
  searchReducerInitialState,
  updateItemsAndPages
};
