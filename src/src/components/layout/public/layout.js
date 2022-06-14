import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import SiteHeader from './siteheader';
import Brandline from '../brandline';
import { Modal } from '../../modal';
import { SvgSprite } from '../SvgSprite';
import { useContext } from 'react';
import { Il8Context } from '../../../contexts/i18context';

const createTitle = (title) => {
  return Array.isArray(title)
    ? `${title.join(' - ')} - Segen Wholesale`
    : `${title} - Segen Wholesale`;
};

/**
 * Layout component that contains site header/nav/footer.
 * page title - array or string [allows us to create the titles in same format]
 * @param children
 * @param title
 * @param h1 - [array] | string
 * @returns {JSX.Element}
 * @constructor
 */

/**
 * h1 and title should be the same at the beginning ie xxxxx | segan
 * - occasionally they will need to be translated ie quotation/basket - contact form.
 * Others like products won't need
 */
const Layout = ({
  children,
  title,
  h1 = false,
  translate = true,
  isHiddenHeading,
  pageClassName
}) => {
  // need context to get locale
  // need to get
  const { t, dir } = useContext(Il8Context);
  let heading = h1;
  let titleText = title;

  if (translate && h1) {
    heading = h1 && t(h1);
    titleText = t(title);
  }

  const createdTitleText = createTitle(titleText);
  return (
    <div className={pageClassName ? `page page--${pageClassName}` : "page"} dir={dir}>
      <Helmet>
        <title>{createdTitleText}</title>
        <meta name="description" content="Segen" />
      </Helmet>
      <SvgSprite />
      <Modal />
      <SiteHeader />
      <Brandline />
      <main className="main">
        {heading ? (
          <h1 className={isHiddenHeading ? 'visually-hidden' : 'heading-main'}>
            {heading}
          </h1>
        ) : null}
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  h1: PropTypes.string || PropTypes.bool
};

export default Layout;
