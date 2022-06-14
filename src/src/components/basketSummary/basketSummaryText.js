import { IT } from '../translation';

const BasketSummaryText = ({ length }) => {
  return (
    <p className="main-header__text">
      <span className="">Cart</span>
      {length !== null ? (
        <span className="visually-hidden">
          <IT strProp="basketItems" value={length} />
        </span>
      ) : null}
    </p>
  );
};

export { BasketSummaryText };
