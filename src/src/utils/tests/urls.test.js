import { urls } from '../urls';

describe('Urls', () => {
  // todo update after filters merged?
  describe('search', () => {
    it('should not add the searchTerm if it does not exist', () => {
      const searchOpts = urls.search('', 1, false);
      const expected =
        'undefined/api/v2/Product/search?&pageNumber=1&resultsPerPage=5';
      expect(searchOpts.url).toBe(expected);
    });

    it('should return the correct url when productSortType is NOT supplied', () => {
      const searchOpts = urls.search('searchTerm=borisbuffoon', 1, false);
      const expected =
        'undefined/api/v2/Product/search?searchTerm=borisbuffoon&pageNumber=1&resultsPerPage=5';
      expect(searchOpts.url).toBe(expected);
    });

    it('should return the correct url when productSortType is supplied', () => {
      const searchOpts = urls.search('searchTerm=borisbuffoon', 1, 'SortAsc');
      const expected =
        'undefined/api/v2/Product/search?searchTerm=borisbuffoon&pageNumber=1&resultsPerPage=5&SortAsc=Price';
      expect(searchOpts.url).toBe(expected);
    });
  });
});
