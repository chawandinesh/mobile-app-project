import { GridViewItem } from './gridViewItem';

const GridView = ({ productData }) => {
  const currency = productData[0].unitPrice.currency;
  return (
    <ol data-meta="grid-view" className="grid-view">
      {productData.map((item) => {
        return (
          <li className="grid-view__item" key={item.productCode}>
            <GridViewItem item={item} currency={currency} />
          </li>
        );
      })}
    </ol>
  );
};

export { GridView };
