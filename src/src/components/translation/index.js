import { useContext } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Il8Context } from '../../contexts/i18context';

/**
 * takes a str and returns translation based on it
 * t is a partially applicated component
 * @param  {string} - strProp
 */
const T = ({ strProp }) => {
  const { t } = useContext(Il8Context);

  return <>{t(strProp)}</>;
};

/**
 * simple component to translate those strings that require
 * plurals ie interpolation hence IT interpolation translation
 * @param {number} - value
 * @param  {string} - strProp
 * @param {string} - timestamp ie '2021-12-12T00:00:00' or anything that can create date
 */
const IT = ({ value, strProp, dateStr = null }) => {
  const { it } = useContext(Il8Context);
  return <>{it(value, strProp, dateStr)}</>;
};

/**
 * only returns a string
 * @param strProp
 * @returns {*}
 * @constructor
 */
const STR = (strProp) => {
  const { t } = useContext(Il8Context);
  const str = renderToStaticMarkup(<>{t(strProp)}</>);
  return str;
};

export { T, IT, STR };
