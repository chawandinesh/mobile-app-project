import { oneDay } from '../../utils/constants';

const mappings = {
  orders: {
    reference: 'id',
    description: 'description',
    dispatchDate: 'date',
    orderStatus: 'status'
  },
  shipments: {
    id: 'id',
    description: 'description',
    shippingDate: 'date',
    shippingStatus: 'status'
  }
};

/**
 * takes data from an order or shipment item
 * and maps it to a new object
 * allows us to use same component
 * NB massive assumption that the props are always there
 * in the object
 *
 * @param item
 * @param type
 */
const getMappedData = (item, type) => {
  return Object.entries(mappings[type]).reduce((acc, props) => {
    acc[props[1]] = item[props[0]];
    return acc;
  }, {});
};

const getCorrectError = (type, hasFetchError) => {
  if (hasFetchError) {
    return `${type}HasFetchError`;
  }

  return `${type}NoOrders`;
};
/**
 * checks if a date is within x days after another
 * @param compareDateStr - date string
 * @param baseDateStr - date string not required
 * @param days - number not required
 */
const getItemsWithinCertainDate = (compareDateStr, baseDateStr, days = 3) => {
  const baseDate = baseDateStr ? new Date(baseDateStr) : new Date();
  const compareDate = new Date(compareDateStr);

  // hard to detect an invalid date as new Date('fdsfds') returns
  // Invalid Date but it is an object
  if (baseDate == 'Invalid Date' || compareDate == 'Invalid Date') {
    return false;
  }

  const baseTime = baseDate.getTime();
  const compareTime = compareDate.getTime();

  if (compareTime < baseTime) {
    return false;
  }

  return baseTime + oneDay * days > compareTime;
};

export { getMappedData, mappings, getCorrectError, getItemsWithinCertainDate };
