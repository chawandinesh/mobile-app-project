const initialState = {
  organisationOpen: false,
  quote: false,
  itemsChanged: false,
  loading: true,
  confirmDelete: false,
  confirmRemoval: false,
  removeModalOpen: false,
  productNo: null,
  modalOpen: false
};

const basketAndQuoteActionTypes = {
  setModalAndProduct: 'SET_MODAL_AND_PRODUCT',
  setLoading: 'SET_LOADING',
  setQuote: 'SET_QUOTE',
  confirmDelete: 'CONFIRM_DELETE',
  setOrganisationOpen: 'SET_ORGANISATION_OPEN',
  confirmRemoval: 'CONFIRM_REMOVAL',
  setRemovalModal: 'SET_REMOVAL_MODAL'
};

function basketAndQuoteReducer(state, action) {
  switch (action.type) {
    case basketAndQuoteActionTypes.confirmRemoval:
      return {
        ...state,
        removeModalOpen: false,
        confirmRemoval: action.data
      };
    case basketAndQuoteActionTypes.setRemovalModal:
      return {
        ...state,
        removeModalOpen: true
      };

    case basketAndQuoteActionTypes.setModalAndProduct:
      return {
        ...state,
        ...action.data
      };

    case basketAndQuoteActionTypes.setQuote:
      return {
        ...state,
        loading: false,
        ...action.data
      };
    case basketAndQuoteActionTypes.setLoading:
      return {
        ...state,
        loading: action.data
      };
    case basketAndQuoteActionTypes.setOrganisationOpen:
      return {
        ...state,
        organisationOpen: !state.organisationOpen
      };

    case basketAndQuoteActionTypes.confirmDelete:
      return {
        ...state,
        modalOpen: false,
        confirmDelete: action.data
      };
    default:
      return state;
  }
}

export { basketAndQuoteActionTypes, basketAndQuoteReducer, initialState };
