import React from 'react';
import { render } from '@testing-library/react';
import { BasketSummaryText } from '../basketSummaryText';

describe('HeaderBasketText', () => {
  // it('should show an error when error is true', () => {
  //   const { container } = render(
  //     <BasketSummaryText error={true} length={10} />
  //   );
  //   const para = container.querySelector('p');
  //   expect(para).not.toBeNull();
  //   expect(para.textContent).toEqual('Error');
  // });

  it('should show amount of items when length is greater than 0', () => {
    const { container } = render(
      <BasketSummaryText error={false} length={10} />
    );

    const spans = container.querySelectorAll('p span');
    expect(spans.length).toEqual(2);
    expect(spans[0].textContent.trim()).toEqual('Cart');
    expect(spans[1].textContent.trim()).toEqual('10 items in your basket');
  });

  it('should show nothing when no items and no error', () => {
    const { container } = render(
      <BasketSummaryText error={false} length={0} />
    );
    const spans = container.querySelectorAll('p span');
    expect(spans.length).toEqual(2);
    expect(spans[0].textContent).toEqual('Cart');
    expect(spans[1].textContent.trim()).toEqual('0 items in your basket');
  });
});
