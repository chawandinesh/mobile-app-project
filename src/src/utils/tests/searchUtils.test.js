import { createQueryString } from '../searchUtils';

describe('searchUtils', () => {

  describe('createQueryString', () => {
    it('should return the correct query string when path items value is not a string', () => {
      const returnedQuery = createQueryString([
        { key: 'a', value: new String("1") },
        { key: 'b', value: null },
        { key: 'c', value: undefined },
        { key: 'd', value: 1 },
        { key: 'e', value: () => {} },
        { key: 'f', value: [] },
        { key: 'g', value: {} }
      ], '?c=3&d=4', ['c', 'd']);
      expect(returnedQuery).toBe('a=1&c=3&d=4');
    });
    it('should return the correct query string when 2nd and 3rd params are missing', () => {
      const returnedQuery = createQueryString([{ key: 'a', value: '1' },{ key: 'b', value: null }]);
      expect(returnedQuery).toBe('a=1');
    });
    it('should return the correct query string when 3rd param is missing', () => {
      const returnedQuery = createQueryString([{ key: 'a', value: '1' },{ key: 'b', value: null }], '?c=3&d=4');
      expect(returnedQuery).toBe('a=1&c=3&d=4');
    });
    it('should return the correct query string when query string keys are not in the allowed keys', () => {
      const returnedQuery = createQueryString([{ key: 'a', value: "1" },{ key: 'b', value: null }], '?c=3&d=4', ['d']);
      expect(returnedQuery).toBe('a=1&d=4');
    });
  });
});
