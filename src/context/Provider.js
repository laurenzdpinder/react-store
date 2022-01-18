import React, { useState } from 'react';
import MyContext from './MyContext';

function Provider({ children }) {
  const [filters, setFilters] = useState({ input: 'Computador', select: '' });
  const context = {
    filters,
    setFilters
  };

  return(
    <MyContext.Provider value={context}>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;
