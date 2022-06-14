import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../index';
import React from 'react';
// all the fun of mocking 1000's of dependencies
jest.mock('../../../contexts/globalContext');

jest.mock('../../translation/index', () => ({
  ...jest.requireActual('../../translation/index'),
  T: () => 'some string'
}));

describe('Modal', () => {
  let dispatch;
  let mockUseContext;

  beforeEach(() => {
    dispatch = jest.fn();
    mockUseContext = jest.fn();
    React.useContext = mockUseContext;
  });

  it('should focus on the inner content by default', () => {
    mockUseContext.mockImplementation(() => {
      return {
        state: {
          isModalOpen: 'jfadslfds'
        },
        dispatch
      };
    });

    const { container } = render(<Modal />);
    const inner = container.querySelector('.modal__content');
    expect(inner).toHaveFocus();
  });

  it('should show a default message when no modal exists', () => {
    mockUseContext.mockImplementation(() => {
      return {
        state: {
          isModalOpen: 'jfadslfds'
        },
        dispatch
      };
    });

    const { container } = render(<Modal />);
    const inner = container.querySelector('.modal__content');
    expect(inner).not.toBeNull();
    const firstChild = inner.firstChild;
    expect(firstChild.nodeName).toBe('P');
    expect(firstChild.textContent).toBe('Something went wrong');
  });

  it('should put the correct content in if it exists', () => {
    mockUseContext.mockImplementation(() => {
      return {
        state: {
          isModalOpen: 'ModalContentHttp400'
        },
        dispatch
      };
    });

    const { container } = render(<Modal />);
    const inner = container.querySelector('.modal__content');
    const firstChild = inner.firstChild;
    expect(firstChild.nodeName).toBe('svg');
  });

  it('should call dispatch on close', () => {
    mockUseContext.mockImplementation(() => {
      return {
        state: {
          isModalOpen: 'ModalContentHttp400'
        },
        dispatch
      };
    });

    const { container } = render(<Modal />);
    const button = container.querySelector('button');
    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'CLOSE_MODAL'
    });
  });

  it('should move to the next item when tab is pressed', () => {
    mockUseContext.mockImplementation(() => {
      return {
        state: {
          isModalOpen: 'ModalContentHttp400'
        },
        dispatch
      };
    });

    const { container } = render(<Modal />);
    const inner = container.querySelector('.modal__content');
    const button = container.querySelector('button');

    expect(inner).toHaveFocus();
    userEvent.tab(); //this line made it work
    expect(button).toHaveFocus(); //passing now
  });
});
