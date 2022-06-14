import {
  inOrDueStock,
  stockMessageProducts,
  stockStatus,
  createStockAvailabilityArray
} from '../stockUtils';

describe('Stock utils', () => {
  let stockLevels;
  beforeEach(() => {
    stockLevels = {
      noStock: [],
      inStock: [
        {
          plannedDate: null,
          quantity: 2,
          inStock: true
        }
      ],
      stockComing: [
        {
          plannedDate: '2021-12-02T00:00:00',
          quantity: 12,
          inStock: false
        }
      ],
      stockComingMultiple: [
        {
          plannedDate: '2021-12-02T00:00:00',
          quantity: 12,
          inStock: false
        },
        {
          plannedDate: '2021-12-12T00:00:00',
          quantity: 10,
          inStock: false
        }
      ],
      stockAndStockComing: [
        {
          plannedDate: null,
          quantity: 4,
          inStock: true
        },
        {
          plannedDate: '2021-12-02T00:00:00',
          quantity: 12,
          inStock: false
        },
        {
          plannedDate: '2022-01-02T00:00:00',
          quantity: 10,
          inStock: false
        }
      ]
    };
  });

  describe('inOrDueStock', () => {
    it('should return an empty array when no stocks', () => {
      const stock = stockLevels.noStock;
      expect(inOrDueStock(stock)).toEqual([]);
    });

    it('should return an empty array when no stock that matches', () => {
      const stock = stockLevels.stockComing;
      expect(inOrDueStock(stock)).toEqual([]);
    });

    it('should default to looking for inStock that is true', () => {
      const stock = stockLevels.stockAndStockComing;
      expect(inOrDueStock(stock)).toEqual([stock[0]]);
    });

    it('should default to looking for inStock that is false', () => {
      const stock = stockLevels.stockAndStockComing;
      expect(inOrDueStock(stock, false)).toEqual([stock[1], stock[2]]);
    });
  });

  describe('stockStatus', () => {
    it('should return correct stockStatus object when no stock', () => {
      expect(stockStatus(stockLevels.noStock)).toEqual({
        status: 'Out of stock no more due',
        statusCode: 'OUT_OF_STOCK_NO_MORE_DUE',
        quantityInStock: 0,
        stockDue: null,
        strProp: 'contactUs'
      });
    });

    it('should return correct stockStatus object when only in stock stock exists', () => {
      expect(stockStatus(stockLevels.inStock)).toEqual({
        status: 'In stock no more due',
        statusCode: 'IN_STOCK_NO_MORE_DUE',
        quantityInStock: 2,
        stockDue: null,
        strProp: 'productStockInStock'
      });
    });

    it('should return correct stockStatus object when only due stock stock exists', () => {
      expect(stockStatus(stockLevels.stockComing)).toEqual({
        status: 'Out of stock more due',
        statusCode: 'OUT_OF_STOCK_MORE_DUE',
        quantityInStock: 0,
        strProp: 'productStockDueStock',
        stockDue: [
          {
            dueDate: '2 Dec 2021',
            dueDateLong: '2 December 2021',
            dueDateTimestamp: '2021-12-02T00:00:00',
            quantity: 12
          }
        ]
      });
    });

    it('should return correct stockStatus object existing stock and due stock exist', () => {
      expect(stockStatus(stockLevels.stockAndStockComing)).toEqual({
        status: 'In stock more due',
        statusCode: 'IN_STOCK_MORE_DUE',
        quantityInStock: 4,
        strProp: 'productStockInStock',
        stockDue: [
          {
            dueDate: '2 Dec 2021',
            dueDateLong: '2 December 2021',
            dueDateTimestamp: '2021-12-02T00:00:00',
            quantity: 12
          },
          {
            dueDate: '2 Jan 2022',
            dueDateLong: '2 January 2022',
            dueDateTimestamp: '2022-01-02T00:00:00',
            quantity: 10
          }
        ]
      });
    });
  });

  describe('stockMessageProducts', () => {
    it('should return an object with the correct keys', () => {
      const expectedKeys = ['stockType', 'strProps', 'statusCode'];

      ['noStock', 'inStock', 'stockComing', 'stockComingMultiple'].forEach(
        (key) => {
          const result = stockMessageProducts(stockLevels[key]);
          const resultKeys = Reflect.ownKeys(result);
          expect(resultKeys).toEqual(expectedKeys);
        }
      );
    });

    it('should return no stock message when no stock', () => {
      const { stockType, strProps } = stockMessageProducts(stockLevels.noStock);

      expect(strProps).toEqual([
        {
          strProp: 'contactUs'
        }
      ]);
      expect(stockType).toBe(false);
    });

    it('should return just quantity message when only inStock', () => {
      const { stockType, strProps } = stockMessageProducts(stockLevels.inStock);

      expect(strProps).toEqual([
        {
          quantity: 2,
          statusCode: 'IN_STOCK_NO_MORE_DUE',
          strProp: 'productStockInStock'
        }
      ]);
      expect(stockType).toBe(true);
    });

    it('should return stock due message only single item in dueStock', () => {
      const { stockType, strProps } = stockMessageProducts(
        stockLevels.stockComing
      );

      expect(strProps).toEqual([
        {
          dueDate: '2 Dec 2021',
          quantity: 12,
          statusCode: 'OUT_OF_STOCK_MORE_DUE',
          strProp: 'productStockDueStock'
        }
      ]);
      expect(stockType).toBe(true);
    });

    it('should return stock due messages when multiple items in dueStock', () => {
      const { stockType, strProps } = stockMessageProducts(
        stockLevels.stockComingMultiple
      );

      expect(strProps).toEqual([
        {
          statusCode: 'OUT_OF_STOCK_MORE_DUE',
          strProp: 'productStockDueStock',
          quantity: 12,
          dueDate: '2 Dec 2021'
        },
        {
          statusCode: 'OUT_OF_STOCK_MORE_DUE',
          strProp: 'productStockDueStock',
          quantity: 10,
          dueDate: '12 Dec 2021'
        }
      ]);
      expect(stockType).toBe(true);
    });

    it('should return stock due messages when in stock and there is due stock', () => {
      const { stockType, strProps } = stockMessageProducts(
        stockLevels.stockAndStockComing
      );

      expect(strProps).toEqual([
        {
          quantity: 4,
          statusCode: 'IN_STOCK_MORE_DUE',
          strProp: 'productStockInStock'
        },
        {
          dueDate: '2 Dec 2021',
          quantity: 12,
          statusCode: 'IN_STOCK_MORE_DUE',
          strProp: 'productStockDueStock'
        },
        {
          dueDate: '2 Jan 2022',
          quantity: 10,
          statusCode: 'IN_STOCK_MORE_DUE',
          strProp: 'productStockDueStock'
        }
      ]);
      expect(stockType).toBe(true);
    });
  });

  describe('createStockAvailabilityArray', () => {
    it('should return an array', () => {
      const returned = createStockAvailabilityArray({
        status: 'Out of stock no more due',
        statusCode: 'OUT_OF_STOCK_NO_MORE_DUE',
        quantityInStock: 0,
        stockDue: null,
        strProp: 'contactUs'
      });
      expect(Array.isArray(returned)).toBe(true);
    });

    it('should return an array with a single item when status is "Out of stock no more due"', () => {
      const returned = createStockAvailabilityArray({
        status: 'Out of stock no more due',
        statusCode: 'OUT_OF_STOCK_NO_MORE_DUE',
        quantityInStock: 0,
        stockDue: null,
        strProp: 'contactUs'
      });
      expect(returned.length).toBe(1);
      expect(returned[0]).toEqual({
        strProp: 'contactUs',
        key: 'outofstock'
      });
    });

    it('should return an array with a single item when just items in stock', () => {
      const returned = createStockAvailabilityArray({
        status: 'In stock no more due',
        statusCode: 'IN_STOCK_NO_MORE_DUE',
        quantityInStock: 2,
        stockDue: null,
        strProp: 'productStockInStock'
      });

      expect(returned.length).toBe(1);
      expect(returned[0]).toEqual({
        strProp: 'productStockInStock',
        quantity: 2,
        key: 'instock'
      });
    });

    it('should return an array with a out of stock items when status is "Out of stock more due"', () => {
      const returned = createStockAvailabilityArray({
        status: 'Out of stock more due',
        statusCode: 'OUT_OF_STOCK_MORE_DUE',
        quantityInStock: 0,
        strProp: 'productStockDueStock',
        stockDue: [
          {
            dueDate: '2 Dec 2021',
            dueDateLong: '2 December 2021',
            dueDateTimestamp: '2021-12-10T00:00:00',
            quantity: 10
          },
          {
            dueDate: '2 Dec 2021',
            dueDateLong: '2 December 2021',
            dueDateTimestamp: '2021-12-10T00:00:00',
            quantity: 12
          }
        ]
      });

      expect(returned.length).toBe(2);
      expect(returned).toEqual([
        {
          dueDateTimestamp: '2021-12-10T00:00:00',
          quantity: 10,
          key: '2021-12-10T00:00:00'
        },
        {
          dueDateTimestamp: '2021-12-10T00:00:00',
          quantity: 12,
          key: '2021-12-10T00:00:00'
        }
      ]);
    });

    it('should return an array with coming stock and current stock when  status is "In stock more due"', () => {
      const returned = createStockAvailabilityArray({
        status: 'In stock more due',
        statusCode: 'IN_STOCK_MORE_DUE',
        quantityInStock: 4,
        strProp: 'productStockInStock',
        stockDue: [
          {
            dueDate: '2 Dec 2021',
            dueDateLong: '2 December 2021',
            dueDateTimestamp: '2021-12-02T00:00:00',
            quantity: 12
          },
          {
            dueDate: '10 Jan 2022',
            dueDateLong: '10 January 2022',
            dueDateTimestamp: '2022-01-10T00:00:00',
            quantity: 10
          }
        ]
      });

      expect(returned.length).toBe(3);
      expect(returned[0]).toEqual({
        key: 'instock',
        strProp: 'productStockInStock',
        quantity: 4
      });
      expect(returned[1]).toEqual({
        dueDateTimestamp: '2021-12-02T00:00:00',
        quantity: 12,
        key: '2021-12-02T00:00:00'
      });

      expect(returned[2]).toEqual({
        dueDateTimestamp: '2022-01-10T00:00:00',
        quantity: 10,
        key: '2022-01-10T00:00:00'
      });
    });
  });
});
