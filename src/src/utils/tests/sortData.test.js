import { sortProductData } from '../sortProductData';
import { productInfoDataNew } from '../../components/products/tests/productInfoData';
import { sortProductBaseResult } from './sortProductDataResults';

describe('SortData', () => {
  // stripped down data for testing
  const alternatesData = [
    {
      comment: 'Aluminium version for tiled or slate roofs.',
      alternateProduct: {
        category: 'Mounting'
      }
    },
    {
      comment: 'Lead version for tiled or slate roofs.',
      alternateProduct: {
        category: 'Mounting'
      }
    },
    {
      comment: 'Nothing there.',
      alternateProduct: null
    }
  ];

  describe('productData', () => {
    let rawData;
    beforeEach(() => {
      rawData = JSON.parse(
        JSON.stringify({
          body: {
            result: {
              items: {
                'CS3L-365MS': { ...productInfoDataNew }
              }
            }
          }
        })
      );
    });

    it('should sort the data into the correct format', () => {
      expect(sortProductData(rawData, 'CS3L-365MS')).toEqual(
        sortProductBaseResult
      );
    });

    it('should filter out the alternates that are null', () => {
      rawData.body.result.items['CS3L-365MS'].alternates = alternatesData;
      const sorted = sortProductData(rawData, 'CS3L-365MS');
      expect(sorted.alternates.length).toBe(2);
    });
  });
});
