import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AdditionalInfo } from './additionalInfo';
import { T, IT } from '../translation';
import { ButtonWithSvg } from '../buttons';
import { createPriceFromObject } from '../../utils/utils';
import { StockPill } from '../generic/stockMessage';
import { DiscountText } from './discountText';
import { Warranties } from './warranties';
import { BulkOptions } from './bulkOptions';
import { stockStatuses } from '../../utils/constants';
import { ProductStocks } from './productStocks';
import { BackArrowLink } from '../generic/backArrowLink';
import { QuantityIncrement } from '../quantityIncrement';

const categories = ['category', 'subCategory'];
const buttonClasses = ['btn', 'btn__full', 'btn__hollow', 'btn-hollow--dark'];
const buttonClassesDisabled = [...buttonClasses, 'isDisabled'];

const ProductInfo = ({
  submissionError,
  productData,
  handleSubmit,
  showAddedMessage,
  submittedQuantity,
  discount
}) => {
  const [count, setCount] = useState(1);
  /**
   * the link to buynow need to be prevented from
   * working if there is a count of zero
   * @param evt
   */
  const checkCount = (evt) => {
    if (count === 0) {
      evt.preventDefault();
    }
  };

  const checkSubmit = (e) => {
    e.preventDefault();
    if (count > 0) {
      handleSubmit(e);
    }
  };

  const {
    bulkOptions,
    description,
    productImageUrl,
    productCode,
    category,
    availability,
    amount,
    currency,
    warranties
  } = productData;

  const { status, quantityInStock } = availability;

  return (
    <div className="product-details">
      <div className="product-details__image">
        <img
          loading="eager"
          alt={description}
          src={productImageUrl}
          width="50%"
        />

        <BackArrowLink additionalClass="product-details__back-link" />
      </div>

      <div className="card card--white">
        <h1 className="product-details__heading">{description}</h1>
        <dl className="product-details__dl">
          <div className="product-details__parts">
            <dt className="product-details__dt">
              <T strProp="partNumber" /> :
            </dt>
            <dd className="product-details__dd">{productCode}</dd>
          </div>
          {categories?.length && (
            <div>
              <dt className="product-details__dt visually-hidden">
                Categories:
              </dt>
              {categories.map(
                (cat, i) =>
                  productData[cat] && (
                    <dd
                      className="product-details__dd product-details__dd--alt"
                      key={cat}
                    >
                      {productData[cat]}
                      {i < categories.length - 1 && ' - '}
                    </dd>
                  )
              )}
            </div>
          )}
        </dl>
      </div>

      <div className="card card--white">
        {showAddedMessage && (
          <p className="product-details__added" data-meta="add-to-basket">
            <IT strProp="productsAddedToBasket" value={submittedQuantity} />
          </p>
        )}
        {submissionError && <T strProp="unableToAddToBasket" />}
        <form
          className="product-details__form"
          action="/add-to-basket"
          method="post"
          noValidate
          onSubmit={checkSubmit}
          id="add-product-form"
        >
          <input type="hidden" name="productCode" value={productCode} />
          <input type="hidden" name="category" value={category} />

          <div className="product-controls">
            <QuantityIncrement callback={setCount} />
          </div>
        </form>
        <div className="product-controls">
          <div>
            <p className="product-details__price">
              <span className="visually-hidden">
                <T strProp="price" />:
              </span>
              <span className="value">
                {createPriceFromObject(productData, currency)}
              </span>
              /
              <T strProp="item" />
            </p>
            <ProductStocks stockLevels={availability} />
          </div>
          <DiscountText
            amount={amount}
            discount={discount}
            count={count}
            currency={currency}
          />
        </div>
        <div className="product-details__complicated-layout">
          {status === stockStatuses.IN_STOCK_MORE_DUE ||
          status === stockStatuses.IN_STOCK_NO_MORE_DUE ? (
            <StockPill
              additionalClass="product-details__pill"
              quantityInStock={quantityInStock}
            />
          ) : null}
          <hr />
        </div>

        <BulkOptions bulkOptions={bulkOptions} />
      </div>

      <AdditionalInfo productData={productData} />
      <Warranties warranties={warranties} />

      <div className="product-details__actions">
        <ButtonWithSvg
          form="add-product-form"
          strProp="addToBasket"
          type="submit"
          svgClasses={['svg-product-basket', 'svg__button']}
          svgHref="svg-product-basket"
          disabled={count === 0}
        />
        <ButtonWithSvg
          form="add-product-form"
          strProp="addToOrder"
          svgClasses={['svg-product-quote svg__button']}
          svgHref="svg-product-quote"
          isAlt={true}
        />
        <Link
          to={`/order/confirm/${productCode}/${count}`}
          className={
            count > 0
              ? buttonClasses.join(' ')
              : buttonClassesDisabled.join(' ')
          }
          onClick={checkCount}
        >
          <>
            <svg className="svg-product-buynow svg__button">
              <use href="#svg-product-buynow" />
            </svg>
            <T strProp="buyNow" />
          </>
        </Link>
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  submissionError: PropTypes.bool,
  productData: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  showAddedMessage: PropTypes.bool,
  submittedQuantity: PropTypes.number,
  searchTerm: PropTypes.string,
  discount: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default ProductInfo;
