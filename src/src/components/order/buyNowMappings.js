const buyNowFormMappings = {
  customerPO: {
    type: 'text',
    labelStrProp: 'buyNowCustomerPO',
    name: 'buynowcustomerpo',
    placeHolder: 'buyNowCustomerPOPlaceHolder',
    value: ''
  },
  contact: {
    type: 'text',
    labelStrProp: 'buyNowContactName',
    name: 'buynowcontact',
    placeHolder: 'buyNowContactNamePlaceHolder',
    value: ''
  },
  phone: {
    type: 'text',
    labelStrProp: 'buyNowPhoneNo',
    name: 'buynowphoneno',
    placeHolder: 'buyNowPhoneNoPlaceHolder',
    value: ''
  },
  country: {
    labelStrProp: 'buyNowCountry',
    type: 'select',
    name: 'buyNowSelectCountry',
    selectData: [
      { value: 'unitedkingdom', text: 'United Kingdom' },
      { value: 'southafrica', text: 'South Africa' },
      { value: 'germany', text: 'Germany' }
    ]
  }
};

const postCodeLookUpMappings = {
  existAddresses: {
    labelStrProp: 'buyNowSelectKnownAddress',
    name: 'selectKnownAddress',
    type: 'select'
  },
  postCode: {
    labelStrProp: 'buyNowPostcode',
    name: 'postcode',
    type: 'text',
    placeHolder: 'buyNowPostcodePlaceHolder'
  },
  // this defaults to have a empty array
  // need to change when we have some requirements
  selectAddress: {
    labelStrProp: 'buyNowSelectLookUpAddress',
    name: 'selectLookUpAddress',
    type: 'select',
    selectData: [{ value: 'select', text: 'Select' }]
  },
  organisation: {
    labelStrProp: 'buyNowOrganisation',
    name: 'organisation',
    type: 'text',
    placeHolder: 'buyNowOrganisationPlaceholder'
  },
  street: {
    labelStrProp: 'buyNowStreet',
    name: 'street',
    type: 'text',
    placeHolder: 'buyNowStreetPlaceholder'
  },
  town: {
    labelStrProp: 'buyNowTown',
    name: 'town',
    type: 'text',
    placeHolder: 'buyNowTownPlaceholder'
  },
  dispatchDate: {
    labelStrProp: 'buyNowDispatchDate',
    name: 'dispatchDate',
    type: 'text',
    placeHolder: 'buyNowDispatchDatePlaceholder'
  },
  preferredDelivery: {
    labelStrProp: 'buyNowPreferredDelivery',
    name: 'preferredDelivery',
    type: 'select',
    selectData: [
      { value: 'tomorrow', text: 'Next Day' },
      { value: 'nextweek', text: 'Next Week' },
      { value: 'whenever', text: 'When Ever' },
      { value: 'now', text: 'Now' }
    ]
  }
};

export { buyNowFormMappings, postCodeLookUpMappings };
