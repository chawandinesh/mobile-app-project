import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RelatedParts = ({ additionalData }) => {
  const length = additionalData.length - 1;

  return (
    <ul className="additional__list">
      {additionalData.map((info, i) => {
        const {
          comment,
          alternateProduct: { supplierProductCode, description }
        } = info;

        return (
          <li className="additional__item" key={supplierProductCode}>
            <div
              className={
                i < length
                  ? 'additional__inner additional__inner--col'
                  : 'additional__inner additional__inner--col additional__inner--no-border'
              }
            >
              <h2 className="additional__heading">{comment}</h2>
              <p>{description}</p>
              <Link
                className="link-secondary-alt"
                to={`/product/${supplierProductCode}`}
              >
                {supplierProductCode}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

// note some of these might return null
RelatedParts.propTypes = {
  additionalData: PropTypes.arrayOf(
    PropTypes.shape({
      comment: PropTypes.string,
      alternateProduct: PropTypes.shape({
        category: PropTypes.string,
        categoryId: PropTypes.number,
        description: PropTypes.string,
        productCode: PropTypes.string,
        stockLevels: PropTypes.array,
        subCategory: PropTypes.string,
        subCategoryId: PropTypes.number,
        unitPrice: PropTypes.shape({
          amount: PropTypes.number,
          currency: PropTypes.string
        }),
        unitPricePerWatt: PropTypes.shape({
          amount: PropTypes.number,
          currency: PropTypes.string
        }),
        pricePerWatt: PropTypes.string,
        price: PropTypes.string,
        portalUrl: PropTypes.string,
        supplierProductCode: PropTypes.string,
        weight: PropTypes.number,
        manufacturer: PropTypes.string,
        productImageUrl: PropTypes.string,
        isNew: PropTypes.bool,
        isClearance: PropTypes.bool,
        standardWarrantyInYears: PropTypes.number
      })
    })
  )
};

export { RelatedParts };
