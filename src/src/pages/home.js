import Layout from '../components/layout/layout';
import { Link } from 'react-router-dom';
import { KeyContacts } from '../components/home/keyContacts';
import { SearchForm } from '../components/search/searchForm';
import { OrdersOrShipmentsDue } from '../components/home/ordersOrShipmentsDue';

function Home() {
  return (
    <Layout
      title="segenWholeSale"
      h1="segenWholeSale"
      isHiddenHeading={true}
      showBreadCrumb={true}
    >
      <div className="home-page">
        <SearchForm />
        <div className="home-page__carousel">
          <img src="caro_placeholder.png" />
        </div>
        <div className="home-page__item">
          <h2 className="heading-level-two">latest product</h2>
          <div className="card latest-product">
            <Link to="/product/CS3L-365MS-MC4" className="latest-product__link">
              <p>CS3L-365MS-MC4</p>
            </Link>
            <div className="latest-product__info">
              <img
                src="spacer.gif"
                aria-hidden="true"
                alt=""
                width="68px"
                height="68px"
                className="dummy-image latest-product__image"
              />
              <p className="latest-product__text latest-product__text--no-margin">
                Canadian Solar 365W Super High Power Mono PERC HiKU with
                MC4-EVO2
              </p>
            </div>
            <div className="latest-product__price">
              <p className="latest-product__text">
                <b>£95.23</b> / Unit (with 11%)
              </p>
              <Link to="/products/CS3L-365MS-MC4" className="btn btn__small">
                View product
              </Link>
            </div>
          </div>
        </div>
        <div className="home-page__item">
          <h2 className="heading-level-two">latest news</h2>
          <div className="card placeholder">
            <p>Placeholder</p>
          </div>
        </div>
        <OrdersOrShipmentsDue type="orders" />
        <OrdersOrShipmentsDue type="shipments" />
        <div className="home-page__item home-page__item--rel">
          <KeyContacts />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
