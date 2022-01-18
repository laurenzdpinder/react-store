import React, { useContext } from 'react';
import { Route, Switch } from "react-router-dom";
import MyContext from './context/MyContext';
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const { setFilters } = useContext(MyContext);

  return (
    <>
      <Header changeFilters={ filters => setFilters(filters) } />
      <Switch>
        <Route path="/cart" component={ Cart } />
        <Route path="/productdetails/:id" component={ ProductDetails } />
        <Route path="/" component={ Home } />
      </Switch>
    </>
  );
}

export default App;
