import PropTypes from 'prop-types';
import { T } from '../translation';

/**
 * default simple label
 */
const Label = ({ strProp, isFor }) => {
  return (
    <label className="label" htmlFor={isFor}>
      <T strProp={strProp} />
    </label>
  );
};

Label.propTypes = {
  strProp: PropTypes.string.isRequired,
  isFor: PropTypes.string.isRequired
};

export { Label };
