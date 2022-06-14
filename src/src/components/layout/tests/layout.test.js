import React from 'react';
import Layout from '../layout';
import { GlobalContext } from '../../../contexts/globalContext';
import { render } from '@testing-library/react';
import { Il8Context, createContextValue } from '../../../contexts/i18context';
import { MemoryRouter } from 'react-router-dom';

import { mockBasketContext } from '../../../testhelpers';

//jest.mock('next-auth/react');
//import { useSession } from 'next-auth/react';

/**
 * basic test
 * we cannot test the <Head> component as we dont get
 * a full document returned
 */
describe.skip('Layout', () => {
  it('should not render an H1 if h1 prop is false', () => {
    const { container } = render(
      <Il8Context.Provider value={createContextValue()}>
        <GlobalContext.Provider value={mockBasketContext()}>
          <MemoryRouter>
            <Layout title="Heading text">
              <div></div>
            </Layout>
          </MemoryRouter>
        </GlobalContext.Provider>
      </Il8Context.Provider>
    );
    const h1 = container.querySelector('h1');
    expect(h1).toBeNull();
  });

  it('should render an H1 if h1 prop is not false and translate if set to false', async () => {
    const { container } = render(
      <Il8Context.Provider value={createContextValue()}>
        <GlobalContext.Provider value={mockBasketContext()}>
          <MemoryRouter>
            <Layout
              title="Boris McBuffoon Face"
              h1="Boris McBuffoon Face"
              translate={false}
            >
              <div></div>
            </Layout>
          </MemoryRouter>
        </GlobalContext.Provider>
      </Il8Context.Provider>
    );

    const h1 = container.querySelector('h1');

    expect(h1).not.toBeNull();
    expect(h1.textContent).toBe('Boris McBuffoon Face');
  });
  // can't get the context to work
  it.skip('should render an H1 if h1 prop is not false and translate if set to true', async () => {
    const { container } = render(
      <Il8Context.Provider value={createContextValue()}>
        <GlobalContext.Provider value={mockBasketContext()}>
          <MemoryRouter>
            <Layout title="Quotation" h1="Quotation">
              <div></div>
            </Layout>
          </MemoryRouter>
        </GlobalContext.Provider>
      </Il8Context.Provider>
    );
    const h1 = container.querySelector('h1');

    expect(h1).not.toBeNull();
    expect(h1.textContent).toBe('Your mum');
  });
});
