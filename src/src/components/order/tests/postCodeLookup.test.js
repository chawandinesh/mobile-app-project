import React from 'react';
import { render } from '@testing-library/react';
import { PostCodeLookUp } from '../postCodeLookUp';

describe('BuyNowAddress', () => {
  it('should NOT have a "select existing address" select when no existing addresses', () => {
    const { container } = render(<PostCodeLookUp />);
    expect(container.querySelector('#selectKnownAddress')).toBeNull();
  });

  it('should have a "select existing address" select when existing addresses', () => {
    const fakeAddress =
      'St. Andrews House, St. Andrews Trading Estate, Bridport, DT6 3EX';

    const knownAddressArray = [
      { value: 'deliveryAddress', text: fakeAddress },
      { value: 'accountAddress', text: fakeAddress }
    ];

    const { container } = render(
      <PostCodeLookUp knownAddressArray={knownAddressArray} />
    );

    const addressSelect = container.querySelector('#selectKnownAddress');
    expect(addressSelect).not.toBeNull();
    expect(addressSelect.querySelectorAll('option').length).toBe(2);
  });

  it('should have the correct number of input boxes', () => {
    const { container } = render(<PostCodeLookUp />);

    expect(container.querySelectorAll('input').length).toBe(5);
  });

  it('should have the correct number of selects', () => {
    const { container } = render(<PostCodeLookUp />);

    expect(container.querySelectorAll('select').length).toBe(2);
  });
});
