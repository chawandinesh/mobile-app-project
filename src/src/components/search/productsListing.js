import { ListView } from './listView';
import { GridView } from './gridView';
import { T } from '../translation/index';

const ProductsListing = ({ productData, viewType }) => {
  if (!productData) {
    return null;
  }

  if (productData.error) {
    return (
      <p className="text-error">
        <T strProp={productData.error} />
      </p>
    );
  }

  if (productData && productData.length === 0) {
    return (
      <p className="text-error">
        <T strProp="searchViewErrorNoItems" />
      </p>
    );
  }

  return viewType === 'list' ? (
    <ListView productData={productData} />
  ) : (
    <GridView productData={productData} />
  );
};

export { ProductsListing };
