import { useState } from 'react';
import { FilterNav } from './filterNav';
import { ProductsListing } from './productsListing';
import { SearchForm } from './searchForm';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/globalContext';
import { globalActionsTypes } from '../../hooks/globalReducer';
import { FilterMenu } from '../menus';

const ProductListingOuter = ({ productData }) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(null);
  const { state, dispatch } = useContext(GlobalContext);
  const { productViewType } = state;
  const updateViewType = (evt) => {
    const { currentTarget } = evt;
    const { selectedFilter, viewType } = currentTarget.dataset;
    if (selectedFilter === 'true') {
      return;
    }

    dispatch({
      type: globalActionsTypes.setProductViewType,
      data: viewType
    });
  };

  const setSort = () => {
    dispatch({
      type: globalActionsTypes.setProductSortType
    });
  };

  return (
    <>
      <SearchForm />
      <FilterNav
        productViewType={productViewType}
        updateViewType={updateViewType}
        setSort={setSort}
        setFilterMenuOpen={setFilterMenuOpen}
      />
      <FilterMenu
        filterMenuOpen={filterMenuOpen}
        setFilterMenuOpen={setFilterMenuOpen}
      />
      <ProductsListing productData={productData} viewType={productViewType} />
    </>
  );
};

export { ProductListingOuter };
