import React from 'react';
import { render } from '@testing-library/react';
import { buyNowData } from './buyNowData';
import { stringyParse } from '../../../testhelpers';
import { MemoryRouter } from 'react-router-dom';
import { BuyNowInner } from '../buyNowInner';

// just basic tests
describe('BuyNowInner', () => {
  let buyNowDataParsed;
  beforeEach(() => {
    buyNowDataParsed = stringyParse(buyNowData).result;
  });

  const renderer = (props) =>
    render(
      <MemoryRouter>
        <BuyNowInner {...props} />
      </MemoryRouter>
    );

  it('should show an error message when hasError is true', async () => {
    const { container } = renderer({
      hasError: true,
      buyNowData: null
    });

    expect(container.querySelector('.text-error')).not.toBeNull();
  });

  it('should have a correct non form data', () => {
    const { container } = renderer({
      hasError: false,
      buyNowData: buyNowDataParsed
    });

    expect(container.querySelectorAll('dt').length).toBe(2);
  });

  it('should have a correct form data in first fieldset', () => {
    const { container } = renderer({
      hasError: false,
      buyNowData: buyNowDataParsed
    });

    expect(
      container.querySelectorAll('fieldset:first-of-type input').length
    ).toBe(3);
  });
});
