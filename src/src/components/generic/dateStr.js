import PropTypes from 'prop-types';
import { Il8Context } from '../../contexts/i18context';
import { useContext } from 'react';
import { createDate } from '../../utils/i18utils';

/**
 * simple component to return a date string in the correct format
 * using the locale
 * @param {string} - timestamp
 * @returns {JSX.Element}
 * @constructor
 */
const DateStr = ({ timestamp }) => {
  const { locale } = useContext(Il8Context);
  return <>{createDate(timestamp, locale)}</>;
};

DateStr.propTypes = {
  timestamp: PropTypes.string.isRequired
};
export { DateStr };
