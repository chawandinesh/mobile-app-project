import PropTypes from 'prop-types';
import { T } from '../translation';
import { createPriceFromValue } from '../../utils/i18utils';
import { basketAndQuoteActionTypes } from '../../reducers/basketAndQuoteReducer';

const QuoteOrBasketItem = ({ item, quote, i, dispatch, modalOpen }) => {
  const { productCode } = item;
  return (
    <>
      <dl className="quote__item-details">
        <div className="quote__item-details-whatever">
          <dt className="name visually-hidden">
            <T strProp="quotename" />
          </dt>
          <dd className="name">{productCode}</dd>
        </div>
        <div>
          <dt className={i > 0 ? 'price visually-hidden' : 'price'}>
            <T strProp="quotetotalPrice" />
          </dt>
          <dd className="price">
            {createPriceFromValue(
              item.totalPrice.amount,
              item.totalPrice.currency
            )}
          </dd>
        </div>
        <div>
          <dt className="description visually-hidden">
            <T strProp="quotedescription" />
          </dt>
          <dd className="description">{item.description}</dd>
        </div>
      </dl>
      {productCode !== 'DELIVERY' ? (
        <>
          <dl className="quote__item-details quote__item-details--unit">
            <div className="unit-price">
              <dt>
                <T strProp="quoteunitPrice" />
              </dt>
              <dd>
                {createPriceFromValue(
                  item.grossPrice.amount,
                  item.grossPrice.currency
                )}
              </dd>
            </div>
            <div className="discount">
              <dt>
                <T strProp="quotediscount" />
              </dt>
              <dd>{quote.totalsResponse?.discount?.percentage}%</dd>
            </div>
            <div className="net-unit-price">
              <dt>
                <T strProp="quotenetPrice" />
              </dt>
              <dd>
                {createPriceFromValue(
                  item.netPrice.amount,
                  item.netPrice.currency
                )}
              </dd>
            </div>
          </dl>
          <div className="quote__item-details quote__item-details--quantity">
            {/*<label*/}
            {/*  className="quote__quantity-name"*/}
            {/*  htmlFor={`quantity-${quote.items.reference}-${item.productCode}`}*/}
            {/*>*/}
            {/*  Quantity*/}
            {/*</label>*/}
            {/*<button*/}
            {/*  className="quote__quantity-increment"*/}
            {/*  onClick={(event) => {*/}
            {/*    event.preventDefault();*/}
            {/*    //handleQuantityIncrement(item.productCode, item.quantity, -1);*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <span>-</span>*/}
            {/*</button>*/}
            {/*<input*/}
            {/*  className="quote__quantity-value"*/}
            {/*  type="text"*/}
            {/*  pattern="[0-9]*"*/}
            {/*  inputMode="numeric"*/}
            {/*  value={item.quantity}*/}
            {/*  id={`quantity-${quote.items.reference}-${item.productCode}`}*/}
            {/*  name="quantity"*/}
            {/*  onChange={(event) =>*/}
            {/*    handleQuantityChange(item.productCode, event.target.value)*/}
            {/*  }*/}
            {/*/>*/}
            {/*<button*/}
            {/*  className="quote__quantity-increment"*/}
            {/*  onClick={() =>*/}
            {/*    handleQuantityIncrement(item.productCode, item.quantity, 1)*/}
            {/*  }*/}
            {/*>*/}
            {/*  <span>+</span>*/}
            {/*</button>*/}
            <button
              className="quote__delete-item"
              onClick={() =>
                dispatch({
                  type: basketAndQuoteActionTypes.setModalAndProduct,
                  data: {
                    productNo: productCode,
                    modalOpen: true
                  }
                })
              }
              disabled={modalOpen}
            >
              <span className="visually-hidden">
                <T strProp="delete" />
              </span>
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

QuoteOrBasketItem.propTypes = {
  item: PropTypes.object
};

export { QuoteOrBasketItem };
