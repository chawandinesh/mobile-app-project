import { getMappedData, getItemsWithinCertainDate } from '../homeUtils';
import { oneDay } from '../../../utils/constants';

describe('Home utils', () => {
  describe('getMappedData', () => {
    const shipmentItem = {
      id: 1,
      description: 'Description one',
      shippingDate: '2022-04-16T09:36:38.534Z',
      shippingStatus: 'some status'
    };
    const orderItem = {
      reference: 'abc',
      description: 'some purchase order',
      dispatchDate: '2022-05-17T08:07:08.542Z',
      orderStatus: 'some status'
    };

    it('should return the correct data for an orders item', () => {
      const expected = {
        id: 'abc',
        description: 'some purchase order',
        date: '2022-05-17T08:07:08.542Z',
        status: 'some status'
      };

      expect(getMappedData(orderItem, 'orders')).toEqual(expected);
    });
    it('should return the correct data for a shipments item', () => {
      const expected = {
        id: 1,
        description: 'Description one',
        date: '2022-04-16T09:36:38.534Z',
        status: 'some status'
      };

      expect(getMappedData(shipmentItem, 'shipments')).toEqual(expected);
    });
  });
  describe('getItemsWithinCertainDate', () => {
    it('should return false when compareDateStr arg does not create valid date', () => {
      expect(getItemsWithinCertainDate('abc')).toBe(false);
    });

    it('should return false when baseDateStr arg does not create valid date', () => {
      expect(getItemsWithinCertainDate('2022-05-17T08:07:08.542Z', 'abc')).toBe(
        false
      );
    });

    // using a supplied baseDate
    it('should return false when date is not within 3 days of base', () => {
      expect(
        getItemsWithinCertainDate(
          '2022-04-16T09:36:38.534Z',
          '2022-04-10T09:36:38.534Z'
        )
      ).toBe(false);
    });

    // using a supplied baseDate
    it('should return true when date is within 3 days of base', () => {
      expect(
        getItemsWithinCertainDate(
          '2022-04-16T09:36:38.534Z',
          '2022-04-13T10:36:38.534Z'
        )
      ).toBe(true);
    });

    it('should return true when date is within 3 days of base using new Date as default', () => {
      expect(getItemsWithinCertainDate(Date.now() + oneDay * 2)).toBe(true);
      expect(getItemsWithinCertainDate(Date.now() + oneDay * 2.9)).toBe(true);
      // this one is just below the 3 day limit
      expect(getItemsWithinCertainDate(Date.now() + oneDay * 3 - 10)).toBe(
        true
      );
    });

    it('should return true when date is NOT within 3 days of base using new Date as default', () => {
      expect(getItemsWithinCertainDate(Date.now() + oneDay * 3)).toBe(false);
      expect(getItemsWithinCertainDate(Date.now() + oneDay * 3 + 10)).toBe(
        false
      );
    });

    it('should return false when date is in the past (compared to baseDate)', () => {
      expect(getItemsWithinCertainDate(Date.now() - oneDay)).toBe(false);
    });
  });
});
