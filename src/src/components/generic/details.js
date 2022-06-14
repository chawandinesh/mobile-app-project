import { T } from '../translation';
import PropTypes from 'prop-types';

const Details = ({
  strProp,
  detailsClass,
  summaryClass,
  children,
  noBorder
}) => {
  const classes = noBorder
    ? `${detailsClass} additionalInfo--no-border`
    : detailsClass;
  return (
    <details className={classes}>
      <summary className={summaryClass}>
        <T strProp={strProp} />
      </summary>
      {children}
    </details>
  );
};

Details.propTypes = {
  children: PropTypes.element.isRequired,
  strProp: PropTypes.string.isRequired,
  detailsClass: PropTypes.string,
  summaryClass: PropTypes.string,
  noBorder: PropTypes.bool
};

Details.defaultProps = {
  detailsClass: 'additionalInfo',
  summaryClass: 'additionalInfo__summary',
  noBorder: false
};

export { Details };
