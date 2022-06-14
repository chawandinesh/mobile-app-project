import PropTypes from 'prop-types';
import { createPriceWithDiscountFromObject } from '../../utils/i18utils';

const DiscountText = ({ amount, discount, count, currency }) => {
  let acutalCount = parseFloat(count);

  if (!acutalCount) {
    acutalCount = 1;
  }

  const { discountAmount, fullAmount } = createPriceWithDiscountFromObject(
    amount * acutalCount,
    currency,
    discount
  );

  return (
    <p className="discount-text">
      <span className="discount-text__discount">{discountAmount}</span>{' '}
      <span className="discount-text__amount">{`${discount}% of ${fullAmount}`}</span>
    </p>
  );
};

DiscountText.propTypes = {
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired
};

export { DiscountText };
