import React from 'react';
import { render } from '@testing-library/react';
import { BasketSummaryText } from '../basketSummaryText';
import { MemoryRouter } from 'react-router-dom';

describe('HeaderBasket', () => {
  // it('should show an error when error is true', () => {
  //   const { container } = render(
  //     <MemoryRouter>
  //       <BasketSummaryText error={true} length={10} />
  //     </MemoryRouter>
  //   );
  //   const para = container.querySelector('p');
  //   expect(para).not.toBeNull();
  //   expect(para.textContent).toEqual('Error');
  // });

  it('should show amount of items when length is greater than 0', () => {
    const { container } = render(
      <MemoryRouter>
        <BasketSummaryText error={false} length={10} />
      </MemoryRouter>
    );
    const para = container.querySelector('p');
    expect(para).not.toBeNull();
    expect(para.textContent).toEqual('Cart10 items in your basket');
  });

  it('should show 0 Items when no items', () => {
    const { container } = render(
      <MemoryRouter>
        <BasketSummaryText error={false} length={0} />
      </MemoryRouter>
    );
    const spans = container.querySelectorAll('p span');
    expect(spans.length).toEqual(2);
    expect(spans[0].textContent).toEqual('Cart');
    expect(spans[1].textContent.trim()).toEqual('0 items in your basket');
  });
});
