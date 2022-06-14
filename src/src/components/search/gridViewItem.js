import { T } from '../translation';
import { createPriceFromValue } from '../../utils/i18utils';
import { Link } from 'react-router-dom';
import { StockMessage } from '../generic/stockMessage';

const GridViewItem = ({ item, currency }) => {
  const { productCode } = item;
  return (
    <>
      <div className="grid-view__image-holder">
        {item.productImageUrl ? (
          <img
            className="grid-view__image"
            src={item.productImageUrl}
            alt={item.description}
          />
        ) : (
          <div className="grid-view__no-image">
            <svg className="svg-noimage">
              <use href="#svg-noimage" />
            </svg>
            <p className="grid-view__no-image-text">No image available</p>
          </div>
        )}
      </div>

      <div className="grid-view__item-info">
        <div className="grid-view__flex">
          <dl>
            <dt className="visually-hidden">
              <T strProp="listViewManufacture" />
            </dt>
            <dd className="grid-view__dd">
              {item.manufacturer ? item.manufacturer : '-'}
            </dd>
          </dl>

          <dl>
            <dt className="visually-hidden">
              <T strProp="price" />:
            </dt>
            <dd className="grid-view__dd">
              <b>{createPriceFromValue(item.unitPrice.amount, currency)}</b>
            </dd>
          </dl>
        </div>
        <div className="grid-view__flex">
          <dl>
            <dt className="visually-hidden">
              <T strProp="partNumber" />
            </dt>
            <dd className="grid-view__dd grid-view__dd--small">
              <Link className="link-alt" to={`/products/${productCode}`}>
                {productCode}
              </Link>
            </dd>
          </dl>
        </div>
        <p className="grid-view__text grid-view__text--truncated">
          {item.description}
        </p>
        <div>
          <StockMessage stock={item.stockLevels} />
        </div>
        <div className="grid-view__flex grid-view__info">
          <Link to="/">
            <svg className="svg-info">
              <use href="#svg-info" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export { GridViewItem };
