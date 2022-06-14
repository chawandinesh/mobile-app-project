import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ProductStocks } from '../productStocks';

describe('ProductStocks', () => {
  const stockLevels = {
    inStockMoreDue: {
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
    },
    inStockNoMoreDue: {
      status: 'In stock no more due',
      statusCode: 'IN_STOCK_NO_MORE_DUE',
      quantityInStock: 2,
      stockDue: null,
      strProp: 'productStockInStock'
    },
    outOfStockNoMoreDue: {
      status: 'Out of stock no more due',
      statusCode: 'OUT_OF_STOCK_NO_MORE_DUE',
      quantityInStock: 0,
      stockDue: null,
      strProp: 'contactUs'
    },
    outOfStockMoreDue: {
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
    }
  };

  it('should return all stock items as paragraphs showing coming stock when status "In stock more due"', () => {
    const { container } = render(
      <ProductStocks stockLevels={stockLevels.inStockMoreDue} />
    );
    const ps = container.querySelectorAll('p');
    expect(container.querySelectorAll('p').length).toBe(2);
    expect(ps[0].textContent).toBe('12 Due: 2 Dec 2021');
    expect(ps[1].textContent).toBe('10 Due: 2 Jan 2022');
  });

  it('should return all stock items as paragraphs showing coming stock when status is "Out of stock more due"', () => {
    const { container } = render(
      <ProductStocks stockLevels={stockLevels.outOfStockMoreDue} />
    );
    const ps = container.querySelectorAll('p');
    expect(container.querySelectorAll('p').length).toBe(1);
    expect(ps[0].textContent).toBe('12 Due: 2 Dec 2021');
  });

  it('should return a "Contact us for more" when status is "In stock no more due"', () => {
    const { container } = render(
      <MemoryRouter>
        <ProductStocks stockLevels={stockLevels.inStockNoMoreDue} />
      </MemoryRouter>
    );
    const ps = container.querySelectorAll('p');
    expect(container.querySelectorAll('p').length).toBe(1);
    expect(ps[0].textContent).toContain('Contact us for more');
  });

  it('should return a "Contact us" when status is "Out of stock no more due"', () => {
    const { container } = render(
      <MemoryRouter>
        <ProductStocks stockLevels={stockLevels.inStockNoMoreDue} />
      </MemoryRouter>
    );
    const ps = container.querySelectorAll('p');
    expect(container.querySelectorAll('p').length).toBe(1);
    expect(ps[0].textContent).toContain('Contact us');
  });
});
