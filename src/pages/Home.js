import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import '../assets/css/Home.css';

function Home() {
  const { filters } = useContext(MyContext);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // fetch produts & render Loading component & render ProductCard component
  useEffect(() => {
    const { input, select } = filters;
    const fetchProducts = async () => {
      setLoading(true);

      const productsFromAPI = await getProductsFromCategoryAndQuery(select, input);
      setProducts(productsFromAPI);

      setLoading(false);
    };
    fetchProducts();
  }, [filters]);

  return (
    loading
      ? <Loading />
      : (
        <div className="home-container">
          <ProductCard products={products} />
        </div>
      )
  );
}

export default Home;
