import { callApi } from '../call-api';
import { urls } from '../../utils/urls';

describe('Call Api', () => {
  let map;
  let body;

  beforeEach(() => {
    // use map as we need to return an iterator
    map = new Map();
    map.set('header1', 'header1value');
    body = {
      result: {
        items: {
          a: { id: 'aa' },
          b: { id: 'bb' }
        }
      }
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        headers: map,
        status: 200,
        statusText: 'Good',
        json: () => body
      })
    );
  });

  afterEach(() => {
    global.fetch.mockReset();
  });

  describe('Errors ', () => {
    it('should return an error when no session token', async () => {
      const response = await callApi('basket', {
        status: null
      });
      expect(response.error).toBe(
        'No access token supplied". API request not attempted.'
      );
    });

    it('should return an error when fails', async () => {
      // need to return an iterator with get for res
      fetch.mockResolvedValueOnce({
        ok: false,
        headers: map,
        status: 404,
        statusText: 'Not found'
      });
      const response = await callApi('basket', {
        token: 'abc'
      });
      expect(response.error).toBe(
        'Request to Ordering API failed: 404 Not found'
      );
    });

    it('should return an error with statuses prop when fails', async () => {
      // need to return an iterator with get for res
      fetch.mockResolvedValueOnce({
        ok: false,
        headers: map,
        status: 404,
        statusText: 'Not found'
      });
      const response = await callApi('basket', {
        token: 'abc'
      });
      expect(response.statuses).toEqual({
        status: 404,
        statusText: 'Not found'
      });
    });
  });

  describe('Calling of end points', () => {
    it('should call fetch the correct amount of times', async () => {
      await callApi('basket', {
        token: 'abc'
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should call fetch the correct headers and url', async () => {
      await callApi('basket', {
        token: 'abc'
      });
      expect(global.fetch).toHaveBeenCalledWith('undefined/api/v2/Basket', {
        headers: { Authorization: 'Bearer abc' },
        method: 'GET'
      });
    });

    it('should add in extra headers if required eg postBasket', async () => {
      const designItem = {
        category: 'Mounting',
        productCode: 'REN-500401',
        quantity: 2
      };

      await callApi(
        'basketUpdate',
        {
          token: 'abc'
        },
        JSON.stringify({ designItem })
      );
      expect(global.fetch).toHaveBeenCalledWith(
        'undefined/api/v2/Basket/item',
        {
          headers: {
            Authorization: 'Bearer abc',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ designItem })
        }
      );
    });
  });

  describe('Response', () => {
    // headers faked up using map
    it('should return data any headers in the response', async () => {
      const res = await callApi('basket', {
        token: 'abc'
      });
      expect(res.headers).toEqual({ header1: 'header1value' });
    });

    it('should have response statuses prop', async () => {
      const res = await callApi('basket', {
        token: 'abc'
      });
      expect(res.statuses).toEqual({
        status: 200,
        statusText: 'Good'
      });
    });

    it('should use callback if supplied in options eg search', async () => {
      // in this case search changes the result to an array
      await callApi('search', {
        token: 'abc'
      });
      const callback = urls.search().callback(body.result.items);

      expect(body.result.items).toEqual(callback);
      expect(Array.isArray(body.result.items)).toBe(true);
    });
  });
});
