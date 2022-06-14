import { Link } from 'react-router-dom';
import { T } from '../translation/index';
import { createPriceFromValue } from '../../utils/i18utils';
import { useState } from 'react';
import { StockMessage } from '../generic/stockMessage';
import { QuantityIncrement } from '../quantityIncrement';

const ListViewItem = ({ item, currency }) => {
  const [count, setCount] = useState(1);
  const { productCode } = item;

  return (
    <>
      <div className="list-view__flex">
        <dl>
          <dt className="visually-hidden">
            <T strProp="listViewManufacture" />
          </dt>
          <dd className="list-view__dd">
            {item.manufacturer ? item.manufacturer : '-'}
          </dd>
        </dl>

        <dl>
          <dt className="visually-hidden">
            <T strProp="price" />:
          </dt>
          <dd className="list-view__dd">
            <b>{createPriceFromValue(item.unitPrice.amount, currency)}</b>
          </dd>
        </dl>
      </div>
      <div className="list-view__flex">
        <dl>
          <dt className="visually-hidden">
            <T strProp="partNumber" />
          </dt>
          <dd className="list-view__dd list-view__dd--small">
            <Link className="link-alt" to={`/product/${productCode}`}>
              {productCode}
            </Link>
          </dd>
        </dl>
        <form id={`form-${productCode}`}>
          <input type="hidden" defaultValue={count} />
          <QuantityIncrement
            callback={setCount}
            id={productCode}
            labelClass="list-view__text list-view__text--label"
          />
        </form>
      </div>
      <p className="list-view__text list-view__text--truncated">
        {item.description}
      </p>
      <div className="list-view__flex">
        <StockMessage stock={item.stockLevels} />
        <div className="list-view__buttons">
          <button
            form={`form-${productCode}`}
            type="submit"
            className="btn btn__small btn__icon--orange"
          >
            <T strProp="basket" />
          </button>
          <button
            form={`form-${productCode}`}
            type="submit"
            className="btn btn__small"
          >
            <T strProp="quote" />
          </button>
        </div>
      </div>
    </>
  );
};

export { ListViewItem };
