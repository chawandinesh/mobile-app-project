import {
  initialProductState,
  productReducer,
  productActionTypes
} from '../productReducer';

describe('productReducer', () => {
  it('should return initial state when no action', () => {
    const returnedState = productReducer(initialProductState, {
      type: 'fake'
    });

    expect(returnedState).toEqual(initialProductState);
  });

  it('should update the state when using "productActionTypes.productUpdate"', () => {
    const returnedState = productReducer(initialProductState, {
      type: productActionTypes.productUpdate,
      data: {
        submissionError: true,
        showAddedMessage: true
      }
    });

    expect(returnedState).toEqual({
      fetchingBasket: false,
      fetchingProduct: false,
      hasFetchedProduct: false,
      productData: null,
      submitted: false,
      submittedQuantity: 0,
      submissionError: true,
      showAddedMessage: true,
      percentageDiscount: 0,
      currentProductId: null
    });
  });

  it('should update the state when using "productActionTypes.fetchingBasketFail"', () => {
    const returnedState = productReducer(
      {
        fetchingBasket: true,
        fetchingProduct: false,
        hasFetchedProduct: false,
        productData: null,
        submitted: true,
        submittedQuantity: 0,
        submissionError: false,
        showAddedMessage: true,
        percentageDiscount: 0,
        currentProductId: null
      },
      {
        type: productActionTypes.fetchingBasketFail
      }
    );

    expect(returnedState).toEqual({
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
    });
  });

  it('should update the state when using "productActionTypes.fetchingBasketSuccess"', () => {
    const initial = {
      ...initialProductState,
      fetchingBasket: true,
      submitted: true
    };

    const returnedState = productReducer(initial, {
      type: productActionTypes.fetchingBasketSuccess
    });

    expect(returnedState).toEqual({
      fetchingBasket: false,
      fetchingProduct: false,
      hasFetchedProduct: false,
      productData: null,
      submitted: false,
      submittedQuantity: 0,
      submissionError: false,
      showAddedMessage: true,
      percentageDiscount: 0,
      currentProductId: null
    });
  });

  it('should update the state when using "productActionTypes.setAccountData"', () => {
    const returnedState = productReducer(initialProductState, {
      type: productActionTypes.setAccountData,
      data: {
        percentageDiscount: 11
      }
    });

    expect(returnedState.percentageDiscount).toEqual(11);
  });
});
