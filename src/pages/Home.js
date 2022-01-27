import React, { useContext, useEffect, useState } from "react";
import MyContext from '../context/MyContext';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from "../components/Loading";

function Home() {
  const { filters } = useContext(MyContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // fetch produts & render Loading component & render ProductCard component(not found answer)
  useEffect(()=> {
    const { input, select } = filters;
    const fetchProducts = async () => {
      setLoading(true);
      const productsFromAPI = await getProductsFromCategoryAndQuery(select, input);
      setProducts(productsFromAPI);
      if(productsFromAPI.length === 0) {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [filters])

  // render ProductCard component(cards answer)
  useEffect(()=> {
    if(products.length > 0) {
      setLoading(false);
    }
  },[products])

  return(
    <>
      { loading ?  <Loading /> : <ProductCard products={ products } /> }
    </>
  );
}

export default Home;
