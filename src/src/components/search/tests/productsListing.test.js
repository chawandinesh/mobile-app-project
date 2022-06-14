import { ProductsListing } from '../productsListing';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { fakeResponse } from './fakeData';

describe('ProductsListing', () => {
  it('should show an error message when the productData has an error flag', () => {
    const { container } = render(
      <MemoryRouter>
        <ProductsListing
          viewType="list"
          productData={{
            error: true
          }}
        />
      </MemoryRouter>
    );

    const errorPara = container.querySelector('.text-error');
    expect(errorPara).not.toBeNull();
  });

  it('should show an list view when the viewType prop is list', () => {
    const { container } = render(
      <MemoryRouter>
        <ProductsListing
          viewType="list"
          productData={fakeResponse.body.result.items}
        />
      </MemoryRouter>
    );

    const list = container.querySelector('[data-meta="list-view"]');
    expect(list).not.toBeNull();
  });

  it('should show an list view when the viewType prop is grid', () => {
    const { container } = render(
      <MemoryRouter>
        <ProductsListing
          viewType="grid"
          productData={fakeResponse.body.result.items}
        />
      </MemoryRouter>
    );

    const list = container.querySelector('[data-meta="grid-view"]');
    expect(list).not.toBeNull();
  });
});
