import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import { callApi } from '../../../utils/call-api';
import { OrdersOrShipmentsDue } from '../ordersOrShipmentsDue';

const itemsArray = [
  {
    id: 1,
    description: 'Description one',
    shippingDate: '2022-04-16T09:36:38.534Z',
    shippingStatus: 'some string'
  },
  {
    id: 2,
    description: 'Description one',
    shippingDate: '2022-04-17T09:36:38.534Z',
    shippingStatus: 'some string'
  },
  {
    id: 3,
    description: 'Description one',
    shippingDate: '2022-04-18T09:36:38.534Z',
    shippingStatus: 'some string'
  },
  {
    id: 4,
    description: 'Description one',
    shippingDate: '2022-04-19T09:36:38.534Z',
    shippingStatus: 'some string'
  }
];

// all the fun of mocking 1000's of dependencies
jest.mock('../../../utils/call-api', () => {
  return {
    callApi: jest.fn()
  };
});

jest.mock('../../../hooks', () => {
  return {
    useSessionHook: () => ({
      getStatusAndToken: () => ({ token: 'abc', status: 'good' })
    })
  };
});

// https://polvara.me/posts/how-to-test-asynchronous-methods
describe('ordersOrShipmentsDue', () => {
  it('should make a call to call api with correct arguments when type is orders', async () => {
    await waitFor(() => render(<OrdersOrShipmentsDue type="orders" />));
    expect(callApi).toHaveBeenCalledTimes(1);
    // faked token and status
    expect(callApi).toHaveBeenCalledWith('ordersDueForDispatch', {
      status: 'good',
      token: 'abc'
    });
  });

  it('should make a call to call api with correct arguments when type is shipments', async () => {
    await waitFor(() => render(<OrdersOrShipmentsDue type="shipments" />));
    expect(callApi).toHaveBeenCalledTimes(1);
    // faked token and status
    expect(callApi).toHaveBeenCalledWith('shipmentsDueForDispatch', {
      status: 'good',
      token: 'abc'
    });
  });

  it('should show a loader before fetching/while fetching', async () => {
    render(<OrdersOrShipmentsDue type="shipments" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
    waitForElementToBeRemoved(screen.getByText('Loading'));
  });

  it('should only show message when an api call returns data which is all out of date', async () => {
    // we can't test the actual creation of items
    // as the mocking the date does not work (as we can't mock new Date)
    // this is because we can't use Date.now in the homeUtils
    // so test it displays a no items message
    callApi.mockResolvedValueOnce({
      body: {
        result: {
          items: itemsArray
        }
      }
    });
    await waitFor(() => render(<OrdersOrShipmentsDue type="shipments" />));

    await waitFor(() =>
      expect(screen.getByText('shipments due')).toBeInTheDocument()
    );

    await waitFor(() => {
      expect(
        screen.getByText('No shipments in the next 3 working days')
      ).toBeInTheDocument();
    });
  });

  it('should only show message when an api call returns data which is all out of date', async () => {
    // we can't test the actual creation of items
    // as the mocking the date does not work (as we can't mock new Date)
    // this is because we can't use Date.now in the homeUtils
    // so test it displays a no items message
    callApi.mockResolvedValueOnce({
      error: true
    });
    await waitFor(() => render(<OrdersOrShipmentsDue type="shipments" />));

    await waitFor(() =>
      expect(screen.getByText('shipments due')).toBeInTheDocument()
    );

    await waitFor(() => {
      expect(
        screen.getByText('Unable to get shipment data')
      ).toBeInTheDocument();
    });
  });
});
