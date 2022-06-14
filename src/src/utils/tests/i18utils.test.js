import {
  createMultipleDates,
  createLocalePrice,
  createDate,
  createPriceFromObject,
  createPriceWithDiscountFromObject
} from '../i18utils';

describe('Utils', () => {
  describe('createDate', () => {
    it('should format a data correctly with the default [en-GB] locale', () => {
      const date = createDate('2021-12-02T00:00:00');
      expect(date).toEqual('2 Dec 2021');
    });

    it('should format a data correctly different types of timestamp', () => {
      const timestamps = ['2022-02-08T23:15:33.008Z', 1644316608073];
      timestamps.forEach((ts) => {
        const date = createDate(ts);
        expect(date).toEqual('8 Feb 2022');
      });
    });

    it('should create a date in different formats depending on locale', () => {
      const date = createDate('2021-12-02T00:00:00', 'de-DE');
      expect(date).toEqual('2. Dez. 2021');
    });

    it('should create a date in different formats depending on locale', () => {
      const date = createDate('2021-12-02T00:00:00', 'en-ZA');
      expect(date).toEqual('02 Dec 2021');
    });
  });

  describe('createLocalePrice', () => {
    it('should return the correct formatted currency amount', () => {
      const currency = createLocalePrice('en-GB', 'Gbp', 1104.93);
      expect(currency).toEqual('£1,104.93');
    });
  });

  describe('createPriceFromObject', () => {
    it('should return the correctly formatted currency', () => {
      const obj = { amount: 7.57, currency: 'Gbp' };
      const currency = createPriceFromObject(obj, 'Gbp');
      expect(currency).toEqual('£7.57');
    });

    it('should return the correctly formatted currency [Rand]', () => {
      const obj = { amount: 7.57, currency: 'Zar' };
      const currency = createPriceFromObject(obj, 'Zar');
      expect(currency).toEqual('R 7,57');
    });

    it('should return the correctly formatted currency Euro [defaults to DE}', () => {
      const obj = { amount: 7.57, currency: 'Eur' };
      const currency = createPriceFromObject(obj, 'Eur');
      expect(currency).toEqual('7,57 €');
    });

    it('should default to Gbg when no currency', () => {
      const obj = { amount: 7.57, currency: 'Eur' };
      const currency = createPriceFromObject(obj);
      expect(currency).toEqual('£7.57');
    });

    it('should default to Gbg when unknown/not catered for currency', () => {
      const obj = { amount: 7.57, currency: 'Azz' };
      const currency = createPriceFromObject(obj, 'Azz');
      expect(currency).toEqual('£7.57');
    });
  });

  describe('createPriceWithDiscountFromObject', () => {
    it('should return an object with the correct keys', () => {
      const returnedValue = createPriceWithDiscountFromObject(7.57, 'Gbp', 11);
      const keys = Reflect.ownKeys(returnedValue);
      expect(keys).toEqual(['discountAmount', 'fullAmount']);
    });

    it('should return correct if discount is 0', () => {
      const returnedValue = createPriceWithDiscountFromObject(7.57, 'Gbp', 0);
      expect(returnedValue.fullAmount).toBe('£7.57');
      expect(returnedValue.discountAmount).toBe('£7.57');
    });

    it('should return an object with the correct keys', () => {
      const returnedValue = createPriceWithDiscountFromObject(7.57, 'Gbp', 11);
      const keys = Reflect.ownKeys(returnedValue);
      expect(keys).toEqual(['discountAmount', 'fullAmount']);
    });

    it('should return an object with the correct values', () => {
      const returnedValue = createPriceWithDiscountFromObject(7.57, 'Gbp', 11);
      expect(returnedValue.fullAmount).toBe('£7.57');
      expect(returnedValue.discountAmount).toBe('£6.74');
    });
  });

  describe('createMultipleDates', () => {
    it('should create an object with 3 dates', () => {
      const dateObj = createMultipleDates('2021-12-02T00:00:00');
      const ownKeys = Reflect.ownKeys(dateObj);
      expect(ownKeys.length).toEqual(3);
      expect(ownKeys).toEqual(['dueDateTimestamp', 'dueDateLong', 'dueDate']);
    });

    it('should create a date object with the correct values', () => {
      const dateObj = createMultipleDates('2021-12-02T00:00:00');
      expect(dateObj).toEqual({
        dueDateTimestamp: '2021-12-02T00:00:00',
        dueDateLong: '2 December 2021',
        dueDate: '2 Dec 2021'
      });
    });

    it('should create a date object with the correct values for another locale', () => {
      const dateObj = createMultipleDates('2021-12-02T00:00:00', 'de-DE');
      expect(dateObj).toEqual({
        dueDateTimestamp: '2021-12-02T00:00:00',
        dueDateLong: '2. Dezember 2021',
        dueDate: '2. Dez. 2021'
      });
    });
  });
});
