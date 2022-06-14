import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { OrderOrShipmentsDueItem } from '../orderOrShipmentsDueItem';

/**
 * jest making doing TDD really easy and simple, mock everything
 * and make it hard to actually test properly
 */
jest.mock('../../translation/index', () => {
  const mockEnGb = {
    orderOrShipmentsDispatch: 'Dispatch',
    orderDueTitle: 'orders due',
    shipmentsDueTitle: 'shipments due',
    orderOrShipStrap: 'in the next 3 working days',
    ordersNoOrders: 'No orders in the next 3 working days',
    shipmentsNoOrders: 'No shipments in the next 3 working days',
    ordersHasFetchError: 'Unable to get order data',
    shipmentsHasFetchError: 'Unable to get shipment data'
  };
  return {
    ...jest.requireActual('../../translation/index'),
    T: (str) => {
      return mockEnGb[str.strProp];
    }
  };
});

const orderItemsArray = [
  {
    reference: 'abcd',
    purchaseOrder: 'purchase order 1',
    dispatchDate: '2022-05-17T08:07:08.542Z',
    orderStatus: 'order status 1'
  },

  {
    reference: 'efgh',
    purchaseOrder: 'purchase order 2',
    dispatchDate: '2022-05-18T08:07:08.542Z',
    orderStatus: 'order status 2'
  }
];

const shippingItemsArray = [
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

describe('OrderOrShipmentsDueItem', () => {
  let outer;
  let shippingItems;
  let orderItems;

  beforeEach(() => {
    shippingItems = JSON.parse(JSON.stringify(shippingItemsArray));
    orderItems = JSON.parse(JSON.stringify(orderItemsArray));
  });

  const getRendered = (
    type = 'orders',
    items = [],
    hasFetchingError = false
  ) => {
    const { container } = render(
      <MemoryRouter>
        <OrderOrShipmentsDueItem
          items={items}
          type={type}
          hasFetchError={hasFetchingError}
        />
      </MemoryRouter>
    );

    outer = container;
  };

  it('should have correct titles for orders', () => {
    getRendered('orders', []);
    expect(outer.querySelector('h2').textContent).toBe(
      'orders due in the next 3 working days'
    );
  });

  it('should have correct titles for shipments', () => {
    getRendered('shipments', []);
    expect(outer.querySelector('h2').textContent).toBe(
      'shipments due in the next 3 working days'
    );
  });

  it('should show an error message when no orders', () => {
    getRendered('orders', []);
    expect(outer.querySelector('.orders-due__no-orders').textContent).toBe(
      'No orders in the next 3 working days'
    );
  });

  it('should show an error message when no shipments', () => {
    getRendered('shipments', []);
    expect(outer.querySelector('.orders-due__no-orders').textContent).toBe(
      'No shipments in the next 3 working days'
    );
  });

  it('should show an error message when has problem fetching orders data', () => {
    getRendered('orders', [], true);
    expect(outer.querySelector('.orders-due__no-orders').textContent).toBe(
      'Unable to get order data'
    );
  });

  it('should show an error message when has problem fetching shipment data', () => {
    getRendered('shipments', [], true);
    expect(outer.querySelector('.orders-due__no-orders').textContent).toBe(
      'Unable to get shipment data'
    );
  });

  it('should display a maximum of 3 items', () => {
    getRendered('orders', orderItems, false);
    expect(outer.querySelectorAll('.orders-due__item').length).toBe(2);
  });

  it('should display all items if less than 3 (and greater than 0)', () => {
    getRendered('orders', orderItems.slice(0, 2), false);
    expect(outer.querySelectorAll('.orders-due__item').length).toBe(2);
  });

  it('should have correct link when type is order', () => {
    getRendered('orders', orderItems, false);
    const links = outer.querySelectorAll('.orders-due__link');
    expect(links.length).toBe(2);
    links.forEach((link, i) => {
      expect(link.href).toContain(`/orders/${orderItems[i].reference}`);
      expect(link.textContent).toBe(`${orderItems[i].reference}`);
    });
  });

  it('should have correct link when type is shipments', () => {
    getRendered('shipments', shippingItems, false);
    const links = outer.querySelectorAll('.orders-due__link');
    expect(links.length).toBe(3);
    links.forEach((link, i) => {
      expect(link.href).toContain(`/shipments/${shippingItems[i].id}`);
      expect(link.textContent).toBe(`${shippingItems[i].id}`);
    });
  });

  it('should have correct dates', () => {
    getRendered('shipments', shippingItems, false);
    const dates = outer.querySelectorAll('[data-meta="order-date"]');
    expect(dates.length).toBe(3);

    expect(dates[0].textContent).toBe('Dispatch : 16 Apr 2022');
    expect(dates[1].textContent).toBe('Dispatch : 17 Apr 2022');
    expect(dates[2].textContent).toBe('Dispatch : 18 Apr 2022');
  });
});
