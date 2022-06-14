import { render, fireEvent } from '@testing-library/react';
import { ListViewItem } from '../listViewItem';
import { MemoryRouter } from 'react-router-dom';
import { fakeResponse } from './fakeData';

describe('ListItemView', () => {
  let productData;
  let outer;
  beforeEach(() => {
    productData = JSON.parse(JSON.stringify(fakeResponse.body.result.items));
    const { container } = render(
      <MemoryRouter>
        <ListViewItem
          item={productData[0]}
          currency={productData[0].unitPrice.currency}
        />
      </MemoryRouter>
    );
    outer = container;
  });

  it('should have correct data in the dds', () => {
    // just some tests for basic stuff
    const dds = outer.querySelectorAll('dd');

    expect(dds.length).toBe(3);
    expect(dds[0].textContent).toBe('Enviroguard');
    expect(dds[1].textContent).toBe('£156.64');
    expect(dds[2].textContent).toBe('BIRD-MESH');
  });

  it('should have correct data in the paragraphs', () => {
    // just some tests for basic stuff
    const paras = outer.querySelectorAll('p');

    expect(paras.length).toBe(3);
    expect(paras[0].textContent).toBe(
      'Bird Deterrent 30m Solar Panel Bird Exclusion Kit (Galvanized Mesh)'
    );
    expect(paras[1].textContent).toBe('13 in stock');
    expect(paras[2].textContent).toBe('20 Due: 10 Nov 2021');
  });

  it('should have the correct links', () => {
    const links = outer.querySelectorAll('a');
    expect(links.length).toBe(1);

    expect(links[0].textContent).toBe('BIRD-MESH');
    expect(links[0].href).toContain('/product/BIRD-MESH');

    // dont test this last link as it has no page to go to yet
  });

  /** move to quantityIncrement */
  xdescribe('Increment of form values', () => {
    let form;
    let formButtons;
    let formInput;
    beforeEach(() => {
      form = outer.querySelector('form');
      formButtons = form.querySelectorAll('button');
      formInput = form.querySelector('input');
    });

    it('should have the correct elements within the form', () => {
      expect(form).not.toBeNull();
      expect(formButtons.length).toBe(2);
      expect(formInput).not.toBeNull();
    });

    it('should have a submit button associated with the form (not in the form)', () => {
      const expectedId = 'form-BIRD-MESH';
      const submit = outer.querySelector('button[type="submit"]');
      expect(form.id).toBe(expectedId);
      expect(submit).not.toBeNull();
      expect(submit.getAttribute('form')).toBe(expectedId);
    });

    it('should have the correct value in the input', () => {
      expect(formInput.value).toBe('1');
    });

    it('should increment the input when the + button is clicked', () => {
      expect(formInput.value).toBe('1');
      fireEvent(
        formButtons[1],
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
      expect(formInput.value).toBe('2');
      fireEvent(
        formButtons[0],
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
      expect(formInput.value).toBe('1');
    });

    it('should NOT decrease the input value below 0', () => {
      expect(formInput.value).toBe('1');
      fireEvent(
        formButtons[0],
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
      expect(formInput.value).toBe('0');
      // ie not -1
      fireEvent(
        formButtons[0],
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true
        })
      );
      expect(formInput.value).toBe('0');
    });
  });
});
