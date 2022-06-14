import { useState, useEffect, Fragment } from 'react';
import { callApi } from '../../utils/call-api';
import { useSessionHook } from '../../hooks/useSessionHook';
import { useNavigate } from 'react-router-dom';
import { PageLoader } from '../generic/pageLoader';
import { T, IT } from '../translation';

const FilterMenu = ({ filterMenuOpen, setFilterMenuOpen }) => {
  const [openCategories, setOpenCategories] = useState([]);
  const [initialSelectedFilters, setInitialSelectedFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterAPIData, setFilterAPIData] = useState(null);
  const [filterAPIQueryString, setFilterAPIQueryString] = useState(null);
  const [newPageHref, setNewPageHref] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode] = useState(getQueryStringValue('mode'));

  const sessionHelpers = useSessionHook();
  const { token } = sessionHelpers.getStatusAndToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (filterMenuOpen === true) {
      const initialFilterValues = getInitialFilters(filterTypes);
      setInitialSelectedFilters(initialFilterValues);
      setSelectedFilters(initialFilterValues);
    }
  }, [filterMenuOpen]);

  useEffect(() => {
    if (selectedFilters.length > 0) {
      const extraQueryStringArray = getAllowedQueryStrings(
        [
          'New',
          'Clearance',
          'Discontinued',
          'Bulkpacks',
          'Recent',
          'searchTerm',
          'technologyId'
        ],
        window.location.search
      );
      setFilterAPIQueryString(
        createFilterAPIQueryString(selectedFilters, extraQueryStringArray)
      );
      let path = [];
      let qs = [];
      selectedFilters.forEach((filterType) => {
        if (
          filterType.pageUrlPathIndex !== false &&
          filterType.value !== null
        ) {
          path[filterType.pageUrlPathIndex] =
            filterType.value + '-' + filterType.slug;
        } else if (
          filterType.pageUrlQueryStringKey !== false &&
          filterType.value !== null
        ) {
          qs.push(filterType.pageUrlQueryStringKey + '=' + filterType.value);
        }
      });
      let href = '/products/search/' + path.join('/');
      qs = qs.concat(extraQueryStringArray);
      href += qs.length > 0 ? '?' + qs.join('&') : '';
      setNewPageHref(href);
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (filterAPIQueryString !== null) {
      if (token) {
        fetchFilterAPIData();
      }
    }

    async function fetchFilterAPIData() {
      setLoading(true);
      const response = await callApi(
        'filters',
        { token },
        filterAPIQueryString
      );
      setLoading(false);
      if (!response.error) {
        setFilterAPIData(response.body.result);
      }
    }
  }, [token, filterAPIQueryString]);

  // event handlers
  const showHideCategory = (value) => () => {
    setOpenCategories((previousState) => {
      let newState = [...previousState];
      newState[value] =
        newState[value] === undefined ? false : !newState[value];
      return newState;
    });
  };

  const updateFilters = (displayName, filter) => () => {
    setSelectedFilters((previousState) => {
      let newState = [...previousState];
      let filterTypeIndex = newState.findIndex(
        (item) => item.displayName === displayName
      );
      newState[filterTypeIndex] = { ...newState[filterTypeIndex] };
      if (newState[filterTypeIndex].value === null) {
        newState[filterTypeIndex].value = filter.value;
        newState[filterTypeIndex].slug = filter.displayName
          .toLowerCase()
          .split(' ')
          .join('-');
      } else {
        newState[filterTypeIndex].value = null;
        newState[filterTypeIndex].slug = null;
      }
      return newState;
    });
  };

  return (
    <div className={openCloseCssClass('filter-menu', filterMenuOpen)}>
      <form
        className={openCloseCssClass('filter-menu__filters', filterMenuOpen)}
      >
        <h2 className="filter-menu__heading">
          <T strProp="filters" />
        </h2>
        <button
          className="filter-menu__close"
          onClick={(event) => {
            event.preventDefault();
            setFilterMenuOpen(false);
          }}
        >
          <span>
            <T strProp="Close" />
          </span>
        </button>
        <div className="filter-menu__filter-groups">
          {loading ? (
            <PageLoader loading={loading} />
          ) : (
            filterAPIData &&
            filterAPIData.items.map((filterGroup, i) =>
              filterGroup.displayName === 'Categories' ? (
                filterGroup.items.length === 1 ? (
                  <Fragment key={`filter-menu__filter-${i}`}>
                    <fieldset
                      className={openCloseCssClass(
                        'filter-menu__filter-group',
                        openCategories[i]
                      )}
                    >
                      <legend
                        className="filter-menu__filter-group-heading"
                        onMouseUp={showHideCategory(i)}
                      >
                        {filterGroup.displayName}
                      </legend>
                      <div className="filter-menu__filter-group-body">
                        {filterGroup.items.map((filter, i) => (
                          <label
                            className="filter-menu__filter"
                            htmlFor={`filter-menu__filter-${i}`}
                            key={`filter-menu__filter-${i}`}
                          >
                            <input
                              type="checkbox"
                              id={`filter-menu__filter-${i}`}
                              checked={filterIsSelected(
                                selectedFilters,
                                'Categories',
                                filter.value
                              )}
                              disabled={
                                mode !== '1' &&
                                filterIsSelected(
                                  initialSelectedFilters,
                                  'Categories',
                                  filter.value
                                )
                              }
                              onChange={updateFilters('Categories', filter)}
                            />
                            <span>{`${filter.displayName} (${filter.count})`}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset
                      className={openCloseCssClass(
                        'filter-menu__filter-group',
                        openCategories[100]
                      )}
                    >
                      <legend
                        className="filter-menu__filter-group-heading"
                        onMouseUp={showHideCategory(100)}
                      >
                        <T strProp="subCategories" />
                      </legend>
                      <div className="filter-menu__filter-group-body">
                        {filterGroup.items[0].items.map((filter, ii) => (
                          <label
                            className="filter-menu__filter"
                            htmlFor={`filter-menu__filter-${i}-${ii}`}
                            key={`filter-menu__filter-${i}-${ii}`}
                          >
                            <input
                              type="checkbox"
                              id={`filter-menu__filter-${i}-${ii}`}
                              checked={filterIsSelected(
                                selectedFilters,
                                'Sub Categories',
                                filter.value
                              )}
                              disabled={
                                mode !== '1' &&
                                filterIsSelected(
                                  initialSelectedFilters,
                                  'Sub Categories',
                                  filter.value
                                )
                              }
                              onChange={updateFilters('Sub Categories', filter)}
                            />
                            <span>{`${filter.displayName} (${filter.count})`}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </Fragment>
                ) : (
                  <fieldset
                    className={openCloseCssClass(
                      'filter-menu__filter-group',
                      openCategories[i]
                    )}
                    key={`filter-menu__filter-${i}`}
                  >
                    <legend
                      className="filter-menu__filter-group-heading"
                      onMouseUp={showHideCategory(i)}
                    >
                      {filterGroup.displayName}
                    </legend>
                    <div className="filter-menu__filter-group-body">
                      {filterGroup.items.map((filter, ii) => (
                        <label
                          className="filter-menu__filter"
                          htmlFor={`filter-menu__filter-${i}-${ii}`}
                          key={`filter-menu__filter-${i}-${ii}`}
                        >
                          <input
                            type="checkbox"
                            id={`filter-menu__filter-${i}-${ii}`}
                            checked={filterIsSelected(
                              selectedFilters,
                              filterGroup.displayName,
                              filter.value
                            )}
                            onChange={updateFilters(
                              filterGroup.displayName,
                              filter
                            )}
                          />
                          <span>{`${filter.displayName} (${filter.count})`}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )
              ) : (
                <fieldset
                  className={openCloseCssClass(
                    'filter-menu__filter-group',
                    openCategories[i]
                  )}
                  key={`filter-menu__filter-${i}`}
                >
                  <legend
                    className="filter-menu__filter-group-heading"
                    onMouseUp={showHideCategory(i)}
                  >
                    {filterGroup.displayName}
                  </legend>
                  <div className="filter-menu__filter-group-body">
                    {filterGroup.items.map((filter, ii) => (
                      <label
                        className="filter-menu__filter"
                        htmlFor={`filter-menu__filter-${i}-${ii}`}
                        key={`filter-menu__filter-${i}-${ii}`}
                      >
                        <input
                          type="checkbox"
                          id={`filter-menu__filter-${i}-${ii}`}
                          checked={filterIsSelected(
                            selectedFilters,
                            filterGroup.displayName,
                            filter.value
                          )}
                          onChange={updateFilters(
                            filterGroup.displayName,
                            filter
                          )}
                        />
                        <span>{`${filter.displayName} (${filter.count})`}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )
            )
          )}
        </div>
        {filterAPIData && (
          <div className="filter-menu__controls">
            <button
              type="reset"
              onMouseDown={(event) => {
                event.preventDefault();
                setSelectedFilters((previousState) => {
                  let newState = [...previousState];
                  previousState.forEach((item, i) => {
                    if (
                      initialSelectedFilters[i].value === null ||
                      item.pageUrlPathIndex === false
                    ) {
                      newState[i].value = null;
                    }
                  });
                  return newState;
                });
              }}
            >
              <T strProp="clearFilters" />
            </button>
            <button
              className="btn"
              onClick={(event) => {
                event.preventDefault();
                setNewPageHref('');
                setFilterAPIQueryString(null);
                setFilterAPIData(null);
                setSelectedFilters([]);
                setFilterMenuOpen(false);
                navigate(newPageHref);
              }}
            >
              <IT
                strProp="filterViewResults"
                value={filterAPIData.totalCount}
              />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FilterMenu;

const filterIsSelected = (filterState, displayName, value) => {
  let checked = false;
  const targetValue = filterState.find(
    (item) => item.displayName === displayName
  ).value;
  checked = targetValue === value;
  return checked;
};

function openCloseCssClass(base, state) {
  let cssClass = base;
  if (state !== null && state !== undefined) {
    if (state === true) {
      cssClass += ` ${base}--open`;
    } else if (state === false) {
      cssClass += ` ${base}--closed`;
    }
  }
  return cssClass;
}

function createFilterAPIQueryString(filters, extraQSArray) {
  let qsArray = [];
  filters.forEach((filterType, i) => {
    if (filterType.value !== null) {
      qsArray.push(filterType.filterAPIQueryStringKey + '=' + filterType.value);
    }
  });
  qsArray = qsArray.concat(extraQSArray);
  const qs = qsArray.length > 0 ? '?' + qsArray.join('&') : '';
  return qs;
}

function getInitialFilters(filterTypes) {
  let newFilters = [];
  const searchParams = new URLSearchParams(window.location.search);
  const path = window.location.pathname;
  const pathArray = path.split('/').filter((item) => item !== '');
  if (path.indexOf('/products/search' !== -1)) {
    filterTypes.forEach((filterType) => {
      let newFilter = { ...filterType };
      if (
        filterType.pageUrlPathIndex !== false &&
        pathArray[filterType.pageUrlPathIndex + 2]
      ) {
        const part = pathArray[filterType.pageUrlPathIndex + 2];
        const index = part.indexOf('-');
        newFilter.value = part.slice(0, index);
        newFilter.slug = part.slice(index + 1);
      } else if (filterType.pageUrlQueryStringKey !== false) {
        const value = searchParams.get(filterType.pageUrlQueryStringKey);
        if (value !== null) {
          newFilter.value = searchParams.get(filterType.pageUrlQueryStringKey);
        }
      }
      newFilters.push(newFilter);
    });
  }
  return newFilters;
}

function getAllowedQueryStrings(allowed, queryString) {
  let keyValueStrings = [];
  const queryArray = queryString
    .substring(1)
    .split('&')
    .map((item) => item.split('='));
  queryArray.forEach((item) => {
    const [key, value] = item;
    if (allowed.indexOf(key) !== -1) {
      keyValueStrings.push(key + '=' + value);
    }
  });
  return keyValueStrings;
}

function getQueryStringValue(key, qs) {
  const searchParams = new URLSearchParams(qs || window.location.search);
  return searchParams.get(key);
}

const filterTypes = [
  {
    key: 'category',
    displayName: 'Categories',
    pageUrlQueryStringKey: false,
    pageUrlPathIndex: 0, // 0 means 1st part of path after /products/search e.g. 'categoryname' in /products/search/categoryname
    filterAPIQueryStringKey: 'CategoryId',
    searchAPIQueryStringKey: 'CategoryId',
    value: null,
    slug: null
  },
  {
    key: 'subcategory',
    displayName: 'Sub Categories',
    pageUrlQueryStringKey: false,
    pageUrlPathIndex: 1, // 1 means 2nd part of path after /products/search e.g. 'subcategoryname' in /products/search/categoryname/subcategoryname
    filterAPIQueryStringKey: 'SubCategoryId',
    searchAPIQueryStringKey: 'SubCategoryId',
    value: null,
    slug: null
  },
  {
    key: 'brand',
    displayName: 'Brands',
    pageUrlQueryStringKey: 'BrandId',
    pageUrlPathIndex: false,
    filterAPIQueryStringKey: 'BrandId',
    searchAPIQueryStringKey: 'BrandId',
    value: null
  },
  {
    key: 'market',
    displayName: 'Markets',
    pageUrlQueryStringKey: 'Market',
    pageUrlPathIndex: false,
    filterAPIQueryStringKey: 'Market',
    searchAPIQueryStringKey: 'Market',
    value: null
  },
  {
    key: 'range',
    displayName: 'Range',
    pageUrlQueryStringKey: 'Range',
    pageUrlPathIndex: false,
    filterAPIQueryStringKey: 'Range',
    searchAPIQueryStringKey: 'Range',
    value: null
  }
];
