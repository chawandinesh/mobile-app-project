import { FilterNav } from '../filterNav';
import { render, fireEvent } from '@testing-library/react';

// only testing the changing grid/list view
describe('FilterNav', () => {
  let updateViewType;
  beforeEach(() => {
    updateViewType = jest.fn();
  });

  it('should have the correct view type button selected', () => {
    const { container } = render(
      <FilterNav updateViewType={updateViewType} productViewType="grid" />
    );

    const selectedView = container.querySelector(
      '[data-selected-filter="true"]'
    );

    expect(selectedView).not.toBeNull();
    expect(selectedView.dataset.viewType).toBe('grid');
  });

  it('should call updateViewType function when the list view buttons are clicked', () => {
    const { container } = render(
      <FilterNav updateViewType={updateViewType} productViewType="grid" />
    );
    const buttons = container.querySelectorAll('.filter-nav__view-select__btn');
    expect(buttons.length).toBe(2);

    fireEvent(
      buttons[0],
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );
    expect(updateViewType).toHaveBeenCalledTimes(1);
  });
});
