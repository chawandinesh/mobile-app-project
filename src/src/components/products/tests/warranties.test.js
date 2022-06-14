import { render } from '@testing-library/react';
import { Warranties } from '../warranties';

/**
 * just some real basic tests
 */
describe('Warranties', () => {
  const data = [
    {
      productCode: 'GRO-WAR-15Y1-3KW',
      years: 5,
      isExtended: true
    },
    {
      productCode: 'GRO-WAR-20Y1-3KW',
      years: 10,
      isExtended: true
    }
  ];

  it('should show an error message when no warranties supplied', () => {
    const { container } = render(<Warranties />);
    expect(container.querySelector('p')).not.toBeNull();
    expect(container.querySelector('p').textContent).toBe(
      'No additional warranties'
    );
  });

  it('should have the correct items of items when warranties supplied', () => {
    const { container } = render(<Warranties warranties={data} />);
    expect(container.querySelector('p')).toBeNull();
    expect(container.querySelectorAll('tbody tr').length).toBe(2);
  });
});
