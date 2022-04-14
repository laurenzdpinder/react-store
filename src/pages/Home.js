import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import '../assets/css/Home.css';

function Home() {
  const { filters, offset } = useContext(MyContext);

  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState({});
  const [products, setProducts] = useState([]);

  // fetch produts & render Loading component || render ProductCard component & setPaging
  useEffect(() => {
    const { input, select } = filters;

    const fetchProducts = async () => {
      setLoading(true);

      const productsFromAPI = await getProductsFromCategoryAndQuery(select, input, offset);
      setProducts(productsFromAPI.results);
      setPaging(productsFromAPI.paging);

      setLoading(false);
    };
    fetchProducts();
  }, [filters, offset]);

  return (
    <>
      <Header />
      {loading
        ? <Loading />
        : (
          <div className="home-container">
            <ProductCard
              paging={paging}
              products={products}
            />
          </div>
        )}
    </>
  );
}

export default Home;
