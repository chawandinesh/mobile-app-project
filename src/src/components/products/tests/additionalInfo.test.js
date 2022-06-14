import { render } from '@testing-library/react';
import { AdditionalInfo } from '../additionalInfo';
import { productInfoDataNew } from './productInfoData';
import React from 'react';

describe('AdditionalInfo', () => {
  let productDataLocal;
  let outer;

  const renderer = (productData) => {
    const { container } = render(<AdditionalInfo productData={productData} />);
    outer = container;
  };

  beforeEach(() => {
    productDataLocal = JSON.parse(JSON.stringify(productInfoDataNew));
  });

  it('should display an error when the data is no there', () => {
    renderer({ productDataLocal });
    expect(outer.querySelector('.additionalInfo__text-error')).not.toBe(null);
  });

  it('should display an when the data exits but is in the wrong format', () => {
    productDataLocal.specification = 'String';
    renderer({ productDataLocal });
    expect(outer.querySelector('.additionalInfo__text-error')).not.toBe(null);
  });
});
