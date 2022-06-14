import {
  searchReducer,
  searchReducerInitialState,
  searchActionsTypes,
  createSearchAction,
  updateItemsAndPages
} from '../searchReducer';

/**
 * just some simple sanity tests
 */
describe('searchReducer', () => {
  it('should return initial state as default', () => {
    const iniState = searchReducer(searchReducerInitialState, { type: 'fake' });
    expect(iniState).toEqual(searchReducerInitialState);
  });

  it('should update state correctly when updated with an action', () => {
    const action = {
      type: searchActionsTypes.searchUpdate,
      data: {
        loading: 'newstate'
      }
    };

    const newState = searchReducer(searchReducerInitialState, action);
    expect(newState.loading).toBe('newstate');

    [
      'error',
      'items',
      'noResults',
      'searchParam',
      'totalItems',
      'pages',
      'fetching'
    ].forEach((key) => {
      if (key !== 'loading') {
        expect(newState[key]).toEqual(searchReducerInitialState[key]);
      }
    });
  });

  it('should update multiple state props', () => {
    const action = {
      type: searchActionsTypes.searchUpdate,
      data: {
        loading: 'newstate',
        pages: 'pagesstate'
      }
    };

    const newState = searchReducer(searchReducerInitialState, action);
    expect(newState.loading).toBe('newstate');
    expect(newState.pages).toBe('pagesstate');

    [
      'error',
      'items',
      'noResults',
      'searchParam',
      'totalItems',
      'fetching'
    ].forEach((key) => {
      if (key !== 'loading' || key !== 'pages') {
        expect(newState[key]).toEqual(searchReducerInitialState[key]);
      }
    });
  });
});

describe('createSearchAction', () => {
  it('should create an a simple action correctly', () => {
    const action = createSearchAction({
      loading: 'click'
    });

    expect(action.type).toBe(searchActionsTypes.searchUpdate);
    expect(action.data).toEqual({
      loading: 'click'
    });
  });
});

describe('updateItemsAndPages', () => {
  it('should return the correct data when result is an array', () => {
    const items = [
      {
        itemCount: 100,
        items: [1, 2, 3]
      },
      {
        itemCount: 100,
        items: [4, 5, 6]
      }
    ];

    const data = updateItemsAndPages(items, false);

    expect(data).toEqual({
      noResults: false,
      totalItems: 100,
      pages: items,
      loading: false
    });
  });

  it('should return the correct data when result is not an array array', () => {
    const items = {
      itemCount: 100,
      items: [1, 2, 3]
    };
    const data = updateItemsAndPages(items, false);
    expect(data).toEqual({
      noResults: false,
      totalItems: 100,
      pages: [items],
      loading: false
    });
  });
});
