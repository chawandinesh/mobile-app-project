import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RelatedParts } from '../relatedParts';

const relatedPartsData = [
  {
    comment: 'Aluminium version for tiled or slate roofs.',
    alternateProduct: {
      category: 'Mounting',
      categoryId: 5,
      description:
        'Dektite Aluminium Multicable Solar Flashing (Tiled or Slate)',
      productCode: 'SDA10MB',
      stockLevels: [
        {
          plannedDate: null,
          quantity: 3,
          inStock: true
        }
      ],
      subCategory: 'Cable Flashings',
      subCategoryId: 134,
      unitPrice: {
        amount: 16.82,
        currency: 'Gbp'
      },
      unitPricePerWatt: {
        amount: 4.8,
        currency: 'Gbp'
      },
      pricePerWatt: '£4.80',
      price: '£16.82',
      portalUrl:
        'https://legacy-portal-dev-as.azurewebsites.net/nav/-part-SDA10MB',
      supplierProductCode: 'SDA10MB',
      weight: 1.02,
      manufacturer: 'Deks',
      productImageUrl: null,
      isNew: false,
      isClearance: false,
      standardWarrantyInYears: null
    }
  },
  {
    comment: 'Lead version for tiled or slate roofs.',
    alternateProduct: {
      category: 'Mounting',
      categoryId: 5,
      description: 'Dektite Lead Multicable Solar Flashing  (Tiled or Slate)',
      productCode: 'DNLS10MB',
      stockLevels: [
        {
          plannedDate: null,
          quantity: 104,
          inStock: true
        }
      ],
      subCategory: 'Cable Flashings',
      subCategoryId: 134,
      unitPrice: {
        amount: 25.37,
        currency: 'Gbp'
      },
      unitPricePerWatt: {
        amount: 4.8,
        currency: 'Gbp'
      },
      pricePerWatt: '£4.80',
      price: '£25.37',
      portalUrl:
        'https://legacy-portal-dev-as.azurewebsites.net/nav/-part-DNLS10MB',
      supplierProductCode: 'DNLS10MB',
      weight: 2.77,
      manufacturer: 'Deks',
      productImageUrl: null,
      isNew: false,
      isClearance: false,
      standardWarrantyInYears: null
    }
  }
];

describe('Related part', () => {
  let outer;
  beforeEach(() => {
    const { container } = render(
      <MemoryRouter>
        <RelatedParts additionalData={relatedPartsData} />
      </MemoryRouter>
    );
    outer = container;
  });

  it('should have the correct amounts of items', () => {
    const lis = outer.querySelectorAll('li');
    expect(lis.length).toBe(2);
  });

  it('should have additional classes when the list item is the last one', () => {
    const divs = outer.querySelectorAll('li > div');
    divs.forEach((div, i) => {
      if (i < relatedPartsData.length - 1) {
        expect(div.classList.contains('additional__inner')).toBe(true);
      } else {
        expect(div.classList.contains('additional__inner')).toBe(true);
        expect(div.classList.contains('additional__inner--no-border')).toBe(
          true
        );
      }
    });
  });
});
