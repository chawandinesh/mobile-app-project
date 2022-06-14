import { Link } from 'react-router-dom';
import { T } from '../translation';

const BackArrowLink = ({ additionalClass = '' }) => {
  return (
    <Link
      to={-1}
      className={`back-link ${additionalClass}`}
      data-meta="back-to-search"
    >
      <svg className="svg-back-arrow">
        <use href="#svg-back-arrow" />
      </svg>
      <span className="back-link__text">
        <T strProp="backToLinkText" />
        <span className="visually-hidden">
          <T strProp="backToLinkTextHidden" />
        </span>
      </span>
    </Link>
  );
};

export { BackArrowLink };
