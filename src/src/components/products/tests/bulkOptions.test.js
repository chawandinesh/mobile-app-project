import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BulkOptions } from '../bulkOptions';
import { productInfoDataNew } from './productInfoData';

describe('Bulk Options', () => {
  let bulkOptions;
  beforeEach(() => {
    bulkOptions = JSON.parse(JSON.stringify(productInfoDataNew.bulkOptions));
  });
  it('should return null when no bulk options supplied', () => {
    const { container } = render(<BulkOptions />);
    expect(container.querySelector('.bulk-options')).toBeNull();
  });

  it('should return null when bulk options are an empty array', () => {
    const { container } = render(<BulkOptions bulkOptions={[]} />);
    expect(container.querySelector('.bulk-options')).toBeNull();
  });

  it('should return dom elements when bulk options are correct', () => {
    const { container } = render(
      <MemoryRouter>
        <BulkOptions bulkOptions={bulkOptions} />
      </MemoryRouter>
    );
    expect(container.querySelector('.bulk-options')).not.toBeNull();
  });

  it('should return a table with the correct number of table body rows', () => {
    const { container } = render(
      <MemoryRouter>
        <BulkOptions bulkOptions={bulkOptions} />
      </MemoryRouter>
    );
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    expect(table.querySelectorAll('tbody > tr').length).toBe(2);
  });

  it('should the correct amount of tds', () => {
    const { container } = render(
      <MemoryRouter>
        <BulkOptions bulkOptions={bulkOptions} />
      </MemoryRouter>
    );
    expect(container.querySelectorAll('tbody > tr > td').length).toBe(4);
  });

  it('should have the correct href and text in the first td', () => {
    const { container } = render(
      <MemoryRouter>
        <BulkOptions bulkOptions={bulkOptions} />
      </MemoryRouter>
    );
    const td = container.querySelectorAll('td');
    const link = td[0].querySelector('a');
    expect(link).not.toBeNull();
    expect(td[0].textContent).toBe('27 pack');
    expect(link.href).toContain('/product/CS3L-365MS-MC4-27');
  });

  it('should have the correctly formatted price in the second td', () => {
    const { container } = render(
      <MemoryRouter>
        <BulkOptions bulkOptions={bulkOptions} />
      </MemoryRouter>
    );
    const td = container.querySelectorAll('td');
    expect(td[1].textContent).toBe('£2,520.04');
  });
});
