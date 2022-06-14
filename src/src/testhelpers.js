const createMockSession = (status = 'unauthenticated') => {
  return {
    data: {
      session: {
        expires: '1',
        user: { email: 'a', name: 'Delta' }
      }
    },
    status
  };
};

const mockBasketContext = (
  state = {
    initialFetch: false,
    result: {}
  },
  dispatch = () => {}
) => {
  return {
    state,
    dispatch
  };
};

/*
  just returns a new copy of the data
  easier than spreading big objects
 */
const stringyParse = (jason) => JSON.parse(JSON.stringify(jason));

export { createMockSession, mockBasketContext, stringyParse };
