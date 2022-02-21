import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getProductsQuantity } from '../helpers/localStorageCart';
import MyContext from './MyContext';

function Provider({ children }) {
  const [filters, setFilters] = useState({ input: 'Computador', select: '' });
  const [productsQuantity, setProductsQuantity] = useState(0);

  // get products quantity from localStorage & set it to context
  useEffect(() => {
    const quantity = getProductsQuantity();
    setProductsQuantity(quantity);
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    filters,
    setFilters,
    productsQuantity,
    setProductsQuantity,
  };

  return (
    <MyContext.Provider value={context}>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Provider;
