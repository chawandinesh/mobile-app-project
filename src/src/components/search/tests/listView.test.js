import { render } from '@testing-library/react';
import { ListView } from '../listView';
import { MemoryRouter } from 'react-router-dom';
import { fakeResponse } from './fakeData';

describe('ListView', () => {
  let productData;
  beforeEach(() => {
    productData = JSON.parse(JSON.stringify(fakeResponse.body.result.items));
  });

  it('should return a ol', () => {
    const { container } = render(
      <MemoryRouter>
        <ListView productData={productData} />
      </MemoryRouter>
    );
    expect(container.querySelector('ol')).not.toBeNull();
  });

  it('should create a list item for each item in the productData', () => {
    const { container } = render(
      <MemoryRouter>
        <ListView productData={productData} />
      </MemoryRouter>
    );
    expect(container.querySelectorAll('li').length).toEqual(productData.length);
  });
});
