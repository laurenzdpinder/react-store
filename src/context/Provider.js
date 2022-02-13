import React, { useEffect, useState } from 'react';
import { getProductsQuantity } from '../helpers/localStorageCart';
import MyContext from './MyContext';

function Provider({ children }) {

  const [filters, setFilters] = useState({ input: 'Computador', select: '' });
  const [productsQuantity, setProductsQuantity] = useState(0);

  // get products quantity from localStorage & set it to context
  useEffect(() => {
    const productsQuantity = getProductsQuantity();
    setProductsQuantity(productsQuantity)
  },[])

  const context = {
    filters,
    setFilters,
    productsQuantity,
    setProductsQuantity
  };

  return(
    <MyContext.Provider value={context}>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
