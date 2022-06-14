import React from 'react';
import { render } from '@testing-library/react';
import { StockMessage } from '../stockMessage';
import { stockLevels } from './productStockTestData';
import { MemoryRouter } from 'react-router-dom';

describe('StockMessage', () => {
  it('should add css class if supplied', () => {
    const { container } = render(
      <MemoryRouter>
        <StockMessage stock={stockLevels.noStock} cssClass="buffoon" />
      </MemoryRouter>
    );
    const span = container.querySelector('span');
    expect(span.classList.contains('buffoon')).toEqual(true);
  });

  // correct
  it('should return a link to contact page when no stock', () => {
    const { container } = render(
      <MemoryRouter>
        <StockMessage stock={stockLevels.noStock} />
      </MemoryRouter>
    );
    expect(container.querySelector('a')).not.toBeNull();
    expect(container.querySelector('a').textContent).toEqual('Contact us');
  });

  describe("stock status 'IN_STOCK_NO_MORE_DUE'", () => {
    it('should return an in-stock stock message', () => {
      const { container } = render(
        <MemoryRouter>
          <StockMessage stock={stockLevels.inStock} />
        </MemoryRouter>
      );

      const p = container.querySelector('p');

      expect(p).not.toBeNull();
      expect(p.textContent).toEqual('2 in stock');
      expect(p.classList.contains('pill')).toBe(true);
    });

    it('should return a link to contact', () => {
      const { container } = render(
        <MemoryRouter>
          <StockMessage stock={stockLevels.inStock} />
        </MemoryRouter>
      );
      const link = container.querySelector('a');
      expect(link).not.toBeNull();
      expect(link.textContent).toContain('Contact us for more');
    });
  });

  // shows in number in stock and first item of coming stock
  describe("stock status 'IN_STOCK_MORE_DUE'", () => {
    it('should do have in stock and the first coming stock shown', () => {
      const { container } = render(
        <MemoryRouter>
          <StockMessage stock={stockLevels.stockAndStockComing} />
        </MemoryRouter>
      );

      const paras = container.querySelectorAll('p');
      expect(paras.length).toBe(2);
      expect(paras[0].classList.contains('pill')).toBe(true);
      expect(paras[0].textContent).toBe('4 in stock');

      expect(paras[1].textContent).toBe('12 Due: 2 Dec 2021');
    });

    it('should not have a link', () => {
      const { container } = render(
        <MemoryRouter>
          <StockMessage stock={stockLevels.stockAndStockComing} />
        </MemoryRouter>
      );

      expect(container.querySelector('a')).toBeNull();
    });
  });

  describe("stock status 'OUT_OF_STOCK_MORE_DUE'", () => {
    it('should return a paragraph with correct message no stock but more coming', () => {
      const { container } = render(
        <MemoryRouter>
          <StockMessage stock={stockLevels.stockComing} />
        </MemoryRouter>
      );
      const para = container.querySelectorAll('p');
      expect(para.length).toBe(1);
      expect(para[0].textContent).toEqual('12 Due: 2 Dec 2021');
    });
    it('should return a paragraph with correct message no stock but more coming', () => {
      const { container } = render(
        <MemoryRouter>
          <StockMessage stock={stockLevels.stockComingTwo} />
        </MemoryRouter>
      );
      const para = container.querySelectorAll('p');
      expect(para.length).toBe(2);
      expect(para[0].textContent).toEqual('12 Due: 2 Dec 2021');
      expect(para[1].textContent).toEqual('10 Due: 5 Jan 2022');
    });
  });

  it('should return default message when oddity occurs', () => {
    const { container } = render(
      <MemoryRouter>
        <StockMessage stock={[{}]} />
      </MemoryRouter>
    );
    expect(container.querySelector('span')).not.toBeNull();
    expect(container.querySelector('span').textContent).toEqual('Contact us');
  });
});
