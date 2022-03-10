import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Provider from './context/Provider';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Provider>
      <Header />
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Provider>
  );
}

export default App;
