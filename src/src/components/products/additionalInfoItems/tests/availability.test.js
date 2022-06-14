import { render } from '@testing-library/react';
import React from 'react';
import { Availability } from '../availability';

describe('your mum', () => {
  const productData = {
    productCode: 'ABCDEFG'
  };

  const additionalStocks = {
    outofStockNoMoreDue: {
      status: 'Out of stock no more due',
      statusCode: 'OUT_OF_STOCK_NO_MORE_DUE',
      quantityInStock: 0,
      stockDue: null,
      strProp: 'contactUs'
    },
    inStockNoMoreComing: {
      status: 'In stock no more due',
      statusCode: 'IN_STOCK_NO_MORE_DUE',
      quantityInStock: 2,
      stockDue: null,
      strProp: 'productStockInStock'
    },
    notInStockMoreComing: {
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
        },
        {
          dueDate: '10 Jan 2022',
          dueDateLong: '10 January 2022',
          dueDateTimestamp: '2022-01-10T00:00:00',
          quantity: 10
        }
      ]
    },
    inStockMoreComing: {
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
    }
  };

  let stockData;
  beforeEach(() => {
    stockData = JSON.parse(JSON.stringify(additionalStocks));
  });

  it('should return a list', () => {
    const { container } = render(
      <Availability
        productData={productData}
        additionalData={stockData.outofStockNoMoreDue}
      />
    );

    expect(container.querySelector('ol')).not.toBeNull();
  });

  it('should only have a string when NO stock in and NO expected stock', () => {
    const { container } = render(
      <Availability
        productData={productData}
        additionalData={stockData.outofStockNoMoreDue}
      />
    );
    const lis = container.querySelectorAll('li');
    expect(lis.length).toBe(1);
    expect(lis[0].textContent).toBe('Contact us ');
  });

  it('should only have a single li and string when stock and on more expected', () => {
    const { container } = render(
      <Availability
        productData={productData}
        additionalData={stockData.inStockNoMoreComing}
      />
    );
    const lis = container.querySelectorAll('li');
    expect(lis.length).toBe(1);
    expect(lis[0].textContent).toBe('In stock Quantity : 2');
  });

  it('should have as many lis as there are items in comingStock prop but no current stock', () => {
    const { container } = render(
      <Availability
        productData={productData}
        additionalData={stockData.notInStockMoreComing}
      />
    );
    const lis = container.querySelectorAll('li');
    expect(lis.length).toBe(2);
    expect(lis[0].textContent).toBe('2 Dec 2021 Quantity : 12');
    expect(lis[1].textContent).toBe('10 Jan 2022 Quantity : 10');
  });

  it('should have correct lis when in stock and more coming', () => {
    const { container } = render(
      <Availability
        productData={productData}
        additionalData={stockData.inStockMoreComing}
      />
    );

    const lis = container.querySelectorAll('li');
    expect(lis.length).toBe(3);
    expect(lis[0].textContent).toBe('In stock Quantity : 4');
    expect(lis[1].textContent).toBe('2 Dec 2021 Quantity : 12');
    expect(lis[2].textContent).toBe('10 Jan 2022 Quantity : 10');
  });
});
