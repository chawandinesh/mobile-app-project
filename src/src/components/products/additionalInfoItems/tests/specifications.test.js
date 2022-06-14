import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Specifications } from '../specifications';

const specificationsData = [
  {
    name: 'Commodity Code',
    value: '8541409059',
    type: 'string',
    unit: null
  },
  {
    name: 'Description',
    value: 'Canadian Solar 345W Super High',
    type: 'string',
    unit: null
  },
  {
    name: 'Pieces',
    value: '27',
    type: 'decimal',
    unit: null
  },
  {
    name: 'Supplier Part No',
    value: 'CS3L-345P-F9H-27',
    type: 'string',
    unit: null
  }
];

describe('Specifications', () => {
  let outer;

  beforeEach(() => {
    const { container } = render(
      <MemoryRouter>
        <Specifications additionalData={specificationsData} />
      </MemoryRouter>
    );
    outer = container;
  });

  it('should have a the correct amount of dts', () => {
    const dts = outer.querySelectorAll('dt');
    expect(dts.length).toBe(4);
  });

  it('should apply additional class name to last div', () => {
    const divs = outer.querySelectorAll('dl div');
    expect(divs.length).toBe(4);

    divs.forEach((div, i) => {
      if (i < specificationsData.length - 1) {
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
