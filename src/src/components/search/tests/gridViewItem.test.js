import { render } from '@testing-library/react';
import { GridViewItem } from '../gridViewItem';
import { MemoryRouter } from 'react-router-dom';
import { fakeResponse } from './fakeData';

describe('ListItemView', () => {
  let productData;
  let outer;
  beforeEach(() => {
    productData = JSON.parse(JSON.stringify(fakeResponse.body.result.items));
    const { container } = render(
      <MemoryRouter>
        <GridViewItem
          item={productData[0]}
          currency={productData[0].unitPrice.currency}
        />
      </MemoryRouter>
    );
    outer = container;
  });

  it('should have an svg when no image src supplied', () => {
    // just some tests for basic stuff
    const svg = outer.querySelectorAll('svg');
    expect(svg).not.toBeNull();
  });

  // this is faked as we don't actually have this data yet
  it('should have an image when image src supplied', () => {
    productData[0].productImageUrl = 'fakeImage.jpg';
    const { container } = render(
      <MemoryRouter>
        <GridViewItem
          item={productData[0]}
          currency={productData[0].unitPrice.currency}
        />
      </MemoryRouter>
    );
    const img = container.querySelector('img');

    expect(img).not.toBeNull();
    expect(img.alt).toBe(
      'Bird Deterrent 30m Solar Panel Bird Exclusion Kit (Galvanized Mesh)'
    );
  });
});
