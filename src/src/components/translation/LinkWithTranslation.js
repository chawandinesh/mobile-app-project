import { Link } from 'react-router-dom';
import { T } from './';

const LinkWithTranslation = ({ strProp, href, cssClasses = [] }) => {
  return (
    <Link
      to={href}
      className={Array.isArray(cssClasses) ? cssClasses.join(' ') : cssClasses}
    >
      <T strProp={strProp} />
    </Link>
  );
};

export { LinkWithTranslation };
