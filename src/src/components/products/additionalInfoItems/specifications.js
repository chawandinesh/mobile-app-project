import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { T } from '../../translation';

const Specifications = ({ additionalData }) => {
  const length = additionalData.length - 1;
  return (
    <>
      <div className="additional__spacing">
        <p>
          <T strProp="productSpecificationsIntro" />
        </p>
        <Link to="contactus" className="link-with-text-colour">
          <T strProp="contactUs" />
        </Link>
      </div>
      <dl className="additional__item">
        {additionalData.map((data, i) => {
          const { name, value, unit } = data;
          return (
            <div
              key={name.replace(' ', '')}
              className={
                i < length
                  ? 'additional__inner'
                  : 'additional__inner additional__inner--no-border'
              }
            >
              <dt className="specification__title">{name}</dt>
              <dd className="specification__item">{value}</dd>
              <dd className="specification__item specification__item--unit">
                {unit}
              </dd>
            </div>
          );
        })}
      </dl>
    </>
  );
};

Specifications.propTypes = {
  additionalData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      unit: PropTypes.string
    })
  ).isRequired
};

export { Specifications };
