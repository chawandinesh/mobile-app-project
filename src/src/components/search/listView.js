import { ListViewItem } from './listViewItem';

const ListView = ({ productData }) => {
  const currency = productData[0].unitPrice.currency;

  return (
    <ol data-meta="list-view" className="list-view">
      {productData.map((item) => {
        return (
          <li className="list-view__item" key={item.productCode}>
            <ListViewItem item={item} currency={currency} />
          </li>
        );
      })}
    </ol>
  );
};

export { ListView };
