import PropTypes from 'prop-types';
import { T } from '../translation';
import { Details } from '../generic/details';

const Warranties = ({ warranties = [] }) => {
  return (
    <div className="card additional__card">
      <Details strProp="additionalInfoTitlewarranties" noBorder={true}>
        <div className="additionalInfo__text additional__spacing">
          {warranties && warranties.length > 0 ? (
            <table className="product-table">
              <caption className="product-table__caption">
                <T strProp="warrantiesStandard" />
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="product-table__th">
                    <T strProp="warrantiesPart" />
                  </th>
                  <th
                    scope="col"
                    className="product-table__th product-table__right"
                  >
                    <T strProp="warrantiesYears" />
                  </th>
                </tr>
              </thead>

              <tbody>
                {warranties.map((warranty) => {
                  const { productCode, years } = warranty;
                  return (
                    <tr
                      key={productCode + years}
                      className="additional__item--bordered"
                    >
                      <td>{productCode}</td>
                      <td className="product-table__right">{years}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="additionalInfo__text additionalInfo__text-error">
              <T strProp={`additionalInfoNoDatawarranties`} />
            </p>
          )}
        </div>
      </Details>
    </div>
  );
};

Warranties.propTypes = {
  warranties: PropTypes.arrayOf(
    PropTypes.shape({
      productCode: PropTypes.string.isRequired,
      years: PropTypes.number.isRequired,
      isExtended: PropTypes.bool.isRequired
    })
  )
};

export { Warranties };
