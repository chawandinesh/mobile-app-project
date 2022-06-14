import { Link } from 'react-router-dom';
import { T } from '../translation/index';

const BreadCrumb = () => {
  return (
    <nav aria-label="Breadcrumb Site hierarchy">
      <ol className="crumb">
        <li className="crumb__item">
          <Link to="/">
            <svg className="svg-home crumb__icon">
              <use href="#svg-home" />
            </svg>
            <span className="visually-hidden">
              <T strProp="home" />
            </span>
          </Link>
        </li>
        <li className="crumb__item">
          <Link to="/">All Photovoltaic</Link>
        </li>
        <li className="crumb__item">
          <Link to="/" aria-current="location">
            AC Components
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export { BreadCrumb };
