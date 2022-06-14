import {
  searchAndFilterReducerActions,
  searchAndFilterReducer,
  searchAndFilterInitialState
} from '../searchAndFilterReducers';

describe('searchAndFilterReducer', () => {
  it('should return initial state when no action', () => {
    const returnedState = searchAndFilterReducer(searchAndFilterInitialState, {
      type: 'fake'
    });

    expect(returnedState).toEqual(searchAndFilterInitialState);
  });

  it('should update any state using searchAndFilterReducerActions.SEARCH_AND_FILTER_GENERIC', () => {
    const returnedState = searchAndFilterReducer(searchAndFilterInitialState, {
      type: searchAndFilterReducerActions.SEARCH_AND_FILTER_GENERIC,
      data: {
        isLoading: 'boris is a lying buffoon'
      }
    });
    expect(returnedState).toEqual({
      isLoading: 'boris is a lying buffoon',
      hasFetched: false,
      isFetching: false,
      isIntersecting: false,
      hasCategoriesData: false,
      hasFetchingError: false,
      hasCategoriesDataError: false,
      pageNo: 1,
      currentFilters: [],
      searchTerm: '',
      pageCount: false
    });
  });

  it('should update the isIntersecting to true when using searchAndFilterReducerActions.SET_IS_INTERSECTING', () => {
    const expectedState = JSON.parse(
      JSON.stringify(searchAndFilterInitialState)
    );
    expectedState.isIntersecting = true;
    const returnedState = searchAndFilterReducer(searchAndFilterInitialState, {
      type: searchAndFilterReducerActions.SET_IS_INTERSECTING
    });

    expect(returnedState).toEqual(expectedState);
  });

  it('should reset parts of the state using searchAndFilterReducerActions.SEARCH_RESET', () => {
    const fakeState = {
      isLoading: false,
      hasFetched: true,
      hasFetchingError: true,
      isFetching: true,
      hasCategoriesData: true,
      hasCategoriesDataError: false,
      isIntersecting: true,
      pageNo: 5,
      currentFilters: [],
      searchTerm: 'El boris buffoon',
      pageCount: 10
    };

    const returnedState = searchAndFilterReducer(fakeState, {
      type: searchAndFilterReducerActions.SEARCH_RESET
    });

    expect(returnedState).toEqual({
      isLoading: true,
      hasFetched: false,
      hasFetchingError: false,
      isFetching: false,
      hasCategoriesData: true,
      hasCategoriesDataError: false,
      isIntersecting: false,
      pageNo: 1,
      currentFilters: [],
      searchTerm: 'El boris buffoon',
      pageCount: false
    });
  });

  it('should reset parts of the state using searchAndFilterReducerActions.SEARCH_RESET_CATEGORY', () => {
    const fakeState = {
      isLoading: false,
      hasFetched: true,
      hasFetchingError: true,
      isFetching: true,
      hasCategoriesData: true,
      hasCategoriesDataError: false,
      isIntersecting: true,
      pageNo: 5,
      currentFilters: [],
      searchTerm: 'El boris buffoon',
      pageCount: 10
    };

    const returnedState = searchAndFilterReducer(fakeState, {
      type: searchAndFilterReducerActions.SEARCH_RESET_CATEGORY
    });

    expect(returnedState).toEqual({
      isLoading: true,
      hasFetched: false,
      hasFetchingError: false,
      isFetching: false,
      hasCategoriesData: true,
      hasCategoriesDataError: false,
      isIntersecting: false,
      pageNo: 1,
      currentFilters: [],
      searchTerm: '',
      pageCount: false
    });
  });
});
