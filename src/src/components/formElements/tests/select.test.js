import React from 'react';
import { render } from '@testing-library/react';

import { Select } from '../select';

describe('Select', () => {
  let defaultProps;
  const renderer = (props) => {
    return render(<Select {...props} />);
  };

  beforeEach(() => {
    /** only required props */
    defaultProps = {
      selectData: [
        { name: 'name 1', value: 'value 1' },
        { name: 'name 2', value: 'value 2' },
        {
          name: 'name 3',
          value: 'value 3'
        }
      ],
      name: 'selectName',
      labelStrProp: 'signIn',
      valueProp: 'value',
      textProp: 'name'
    };
  });

  it('should have id set to name when no id supplied', () => {
    const { container } = renderer(defaultProps);
    expect(container.querySelector('select').id).toBe(defaultProps.name);
  });

  it('should have id when supplied', () => {
    defaultProps.id = 'someid';
    const { container } = renderer(defaultProps);
    expect(container.querySelector('select').id).toBe('someid');
  });

  it('should use array to construct options', () => {
    const { container } = renderer(defaultProps);
    expect(container.querySelectorAll('option').length).toBe(3);
  });

  it('should have options with the correct values and text', () => {
    const { selectData } = defaultProps;
    const { container } = renderer(defaultProps);
    const options = container.querySelectorAll('option');

    options.forEach((opt, i) => {
      expect(opt.textContent).toBe(selectData[i].name);
      expect(opt.value).toBe(selectData[i].value);
    });
  });
});
