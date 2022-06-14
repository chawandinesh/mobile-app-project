import {
  globalReducer,
  initialGlobalState,
  globalActionsTypes
} from '../globalReducer';

describe('Global reducer', () => {
  it('should return default state', () => {
    const iniState = globalReducer(initialGlobalState, { type: 'fake' });
    expect(iniState).toEqual(initialGlobalState);
  });

  it('should change productSortType to "Asc" when it has not been set', () => {
    const newState = globalReducer(initialGlobalState, {
      type: globalActionsTypes.setProductSortType
    });
    expect(newState.productSortType).toBe('SortAsc');
  });

  it('should change productSortType to the opposite when it has been set', () => {
    let newState = globalReducer(initialGlobalState, {
      type: globalActionsTypes.setProductSortType
    });
    expect(newState.productSortType).toBe('SortAsc');

    newState = globalReducer(newState, {
      type: globalActionsTypes.setProductSortType
    });
    expect(newState.productSortType).toBe('SortDesc');

    newState = globalReducer(newState, {
      type: globalActionsTypes.setProductSortType
    });
    expect(newState.productSortType).toBe('SortAsc');
  });

  it('should reset isModalOpen and modalMessage using "globalActionsTypes.closeModal"', () => {
    const stateWithModal = {
      ...initialGlobalState,
      isModalOpen: 'somestring',
      modalMessage: 'some message'
    };

    const returnedState = globalReducer(stateWithModal, {
      type: globalActionsTypes.closeModal
    });

    expect(returnedState).toEqual(initialGlobalState);
  });

  it('should set isModalOpen and modalMessage using "globalActionsTypes.setModal"', () => {
    const returnedState = globalReducer(initialGlobalState, {
      type: globalActionsTypes.setModal,
      data: {
        isModalOpen: 'modalIsOpen',
        modalMessage: 'some modal message'
      }
    });

    expect(returnedState.isModalOpen).toBe('modalIsOpen');
    expect(returnedState.modalMessage).toBe('some modal message');
  });
});
