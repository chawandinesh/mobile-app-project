import { T } from '../translation/index';

const FilterNav = ({ productViewType, updateViewType, setSort, setFilterMenuOpen }) => {
  return (
    <ol className="filter-nav">
      <li className="filter-nav__item">
        <button className="btn btn__hollow filter-nav__btn" onClick={() => setFilterMenuOpen(true)}>
          <svg className="svg-filter">
            <use href="#svg-filter" />
          </svg>
          <span className="filter-nav__btn-text">
            <T strProp="searchFilterFilter" />
          </span>
        </button>
      </li>
      <li>
        <button className="btn btn__hollow filter-nav__btn" onClick={setSort}>
          <svg className="svg-sortby">
            <use href="#svg-sortby" />
          </svg>
          <span className="filter-nav__btn-text">
            <T strProp="searchFilterSortBy" />
          </span>
        </button>
      </li>
      <li>
        <div className="filter-nav__view-select">
          <button
            className="filter-nav__view-select__btn"
            onClick={updateViewType}
            data-selected-filter={productViewType === 'grid'}
            data-view-type="grid"
          >
            <svg className="svg-gridview">
              <use href="#svg-gridview" />
            </svg>
            <span className="visually-hidden">
              <T strProp="searchFilterGridView" />
            </span>
          </button>
          <button
            className="filter-nav__view-select__btn"
            onClick={updateViewType}
            data-selected-filter={productViewType === 'list'}
            data-view-type="list"
          >
            <svg className="svg-listview">
              <use href="#svg-listview" />
            </svg>
            <span className="visually-hidden">
              <T strProp="searchFilterListView" />
            </span>
          </button>
        </div>
      </li>
    </ol>
  );
};

export { FilterNav };
