import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Provider from './context/Provider';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Purchcase from './pages/Purchcase';
import OrderShipped from './pages/OrderShipped';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchcase" element={<Purchcase />} />
        <Route path="/ordershipped" element={<OrderShipped />} />
      </Routes>
    </Provider>
  );
}

export default App;
