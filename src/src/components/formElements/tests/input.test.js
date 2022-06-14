import React from 'react';
import { render } from '@testing-library/react';

import { Input } from '../input';

describe('Input', () => {
  let defaultProps;

  beforeEach(() => {
    /** only required props */
    defaultProps = {
      name: 'inputname',
      labelStrProp: 'signIn'
    };
  });

  const createInput = (props) => {
    return render(<Input {...props} />);
  };

  it('should return a label and input', () => {
    const { container } = createInput(defaultProps);
    expect(container.querySelector('label')).not.toBeNull();
    expect(container.querySelector('input')).not.toBeNull();
  });

  it('should return a label and input', () => {
    const { container } = createInput(defaultProps);
    expect(container.querySelector('label').getAttribute('for')).toBe(
      'inputname'
    );
    expect(container.querySelector('input').getAttribute('name')).toBe(
      'inputname'
    );
  });

  it('should return an input with default type', () => {
    const { container } = createInput(defaultProps);
    expect(container.querySelector('input').type).toBe('text');
  });

  it('should return an input with a supplied type', () => {
    defaultProps.type = 'number';
    const { container } = createInput(defaultProps);
    expect(container.querySelector('input').type).toBe('number');
  });
});
