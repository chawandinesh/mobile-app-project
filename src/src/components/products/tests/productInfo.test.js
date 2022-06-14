import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductInfo from '../productInfo';
import { MemoryRouter } from 'react-router-dom';
import { sortProductBaseResult } from '../../../utils/tests/sortProductDataResults';
import { stringyParse } from '../../../testhelpers';

// this has changed and the tests were being skipped
// so now no hasStock or comingStock etc
describe('ProductInfo', () => {
  /**
   * struggle to test form values, dont seem to be able to change them
   */
  let productInfo;
  let outer;
  beforeEach(() => {
    productInfo = stringyParse(sortProductBaseResult);
  });

  const renderer = ({
    showAddedMessage = false,
    submissionError = true,
    productData = productInfo,
    handleSubmit = () => {},
    searchTerm = null,
    discount = 0
  }) => {
    const { container } = render(
      <MemoryRouter>
        <ProductInfo
          showAddedMessage={showAddedMessage}
          submissionError={submissionError}
          productData={productData}
          handleSubmit={handleSubmit}
          searchTerm={searchTerm}
          discount={discount}
        />
      </MemoryRouter>
    );

    outer = container;
  };

  describe('Errors and form submit and success', () => {
    it('Should called handleSubmit when no form error', () => {
      const onSubmit = jest.fn();
      onSubmit.mockImplementation((event) => {
        event.preventDefault();
      });

      renderer({ handleSubmit: onSubmit });

      userEvent.click(screen.getByRole('button', { name: /Add to basket/i }));
      expect(onSubmit).toHaveBeenCalled();
    });

    it('Should have a success message when showAddedMessage is true', () => {
      renderer({ showAddedMessage: true });
      expect(outer.querySelector('[data-meta="add-to-basket"]')).not.toBeNull();
    });

    it('Should have a back to search result message when searchTerm is valid', () => {
      renderer({ searchTerm: 'mcbufoon' });

      const returnLink = outer.querySelector('[data-meta="back-to-search"]');
      expect(returnLink).not.toBeNull();
      expect(returnLink.textContent).toBe('Back to previous page');
    });
  });

  describe('Stock', () => {
    describe('No stock', () => {
      it('should have the correct elements when no stock', () => {
        productInfo.stockLevels = [];
        renderer({});

        expect(outer.querySelector('h1').textContent).toBe(
          productInfo.description
        );
      });
    });

    describe('should have the correct elements when stock exists', () => {
      it('should have the correct title', () => {
        productInfo.stockLevels = [
          {
            plannedDate: null,
            quantity: 2,
            inStock: true
          }
        ];
        renderer({});

        expect(outer.querySelector('h1').textContent).toBe(
          productInfo.description
        );
      });
    });

    describe('should have the correct elements when stock and more stock coming', () => {
      it('should have the correct dom elements', () => {
        productInfo.stockLevels = [
          {
            plannedDate: null,
            quantity: 4,
            inStock: true
          },
          {
            plannedDate: '2021-12-02T00:00:00',
            quantity: 12,
            inStock: false
          }
        ];
        renderer({});

        expect(outer.querySelector('h1').textContent).toBe(
          productInfo.description
        );
      });
    });
  });

  // describe('Discount', () => {
  //   it('should show discount when discount is available', () => {
  //     renderer({ discount: 11 });
  //     expect(2 + 2).toBe(4);
  //   });
  // });
  //
  // describe('Bulk buy', () => {
  //   it('should show bulk buy options if exists', () => {});
  // });
});
