import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Basket from './pages/basket';
import Quote from './pages/quote';
import Buynow from './pages/order/buynow';
import ContactForm from './pages/contactform';
import Product from './pages/product';
import SearchHome from './pages/search';
import Login from './Login';
import Welcome from './pages/welcome';
import Orders from './pages/orders';
import Shipments from './pages/shipments';
import QuickAdd from './pages/basket/quickadd';

const PageRoutes = ({ loggedIn }) => {
  return loggedIn ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contactform" element={<ContactForm />} />

      <Route path="/basket" element={<Basket />} />
      <Route path="/product/:productId/*" element={<Product />} />
      <Route path="/quote/:quoteReference" element={<Quote />} />
      <Route path="/quickadd" element={<QuickAdd />} />

      <Route
        path="/order/confirm/:productCode/:quantity"
        element={<Buynow />}
      />
      {/* this version of react router does not support conditional params so we need multiple routers*/}
      <Route path="/products/search" element={<SearchHome />} />
      <Route path="/products/search/:category" element={<SearchHome />} />
      <Route
        path="/products/search/:category/:subcategory"
        element={<SearchHome />}
      />
      <Route path="/orders/:orderno" element={<Orders />} />
      <Route path="/shipments/:shipmentno" element={<Shipments />} />

      <Route path="/product/:productId" element={<Product />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export { PageRoutes };
