import { render } from '@testing-library/react';
import { Documents } from '../documents';
import React from 'react';

describe('Document', () => {
  let outer;

  const documentsData = [
    {
      title: 'Canadian Factory Inspection',
      description: 'MCS Certificate',
      url: 'https://portal.segen.co.uk/reseller/docs/MCS_BABT8767 R4 Certificate_2020-01-20.PDF'
    },
    {
      title: 'Canadian Ku Oct2019 12 Years',
      description: 'Warranty',
      url: 'https://portal.segen.co.uk/reseller/docs/CanadianSolar_12Year_Warranty_Ku_Modules_October2019.pdf'
    },
    {
      title: 'Canadian Solar IEC61215  IEC61730 November2019',
      description: 'IEC Certificate',
      url: 'https://portal.segen.co.uk/reseller/docs/VDE IEC_61215_61730 (2016) Standard Module_2019-11-26.pdf'
    }
  ];

  beforeEach(() => {
    const { container } = render(<Documents additionalData={documentsData} />);
    outer = container;
  });

  it('should return a list', () => {
    expect(outer.querySelector('ul')).not.toBeNull();
  });
  it('should return a list with correct amount of items', () => {
    const lis = outer.querySelectorAll('li');
    expect(lis.length).toBe(3);
  });
  it('should have list items with the correct titles and urls', () => {
    const lis = outer.querySelectorAll('li');

    lis.forEach((li, i) => {
      let item = lis[i];
      expect(item.textContent).toBe(documentsData[i].description);
      expect(item.querySelector('a').href).toBe(
        encodeURI(documentsData[i].url)
      );
    });
  });
});
