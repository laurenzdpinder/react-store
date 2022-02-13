import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { getCategories } from '../services/api';
import { BiUserCircle, BiSearch } from 'react-icons/bi';
import { BsCart } from 'react-icons/bs';
import { FaReact } from 'react-icons/fa';
import '../assets/css/Header.css';

function Header() {

  const { productsQuantity, setFilters } = useContext(MyContext);

  const [categories, setCategories] = useState([{}]);
  const [filtersOnChange, setFiltersOnChange] = useState({ input: '', select: '' });

  let history = useHistory();

  const { input, select } = filtersOnChange;

  // fetch & render select categories
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesFromAPI = await getCategories();
      setCategories(categoriesFromAPI);
    }
    fetchCategories();
  }, []);

  // change input and select values
  const handleFilterOnChange = ({ target: { name, value } }) => {
    setFiltersOnChange((prev) => ({ ...prev, [name]: value }));
  };

  // clear input & select values after click on ProductDetails buttons
  useEffect(() => {
    setFiltersOnChange({ input: '', select: '' });
  },[productsQuantity]);

  // clear input and select values & set filters to Context & redirect Home page
  const handleLogoBtnOnClick = () => {
    setFiltersOnChange({ input: '', select: '' });

    setFilters({ input: 'Computador', select: '' });
    history.push("/");
  };
  
  // enable search button
  const isDelBtnDisabled = () => input || select;
  
  // set filters to Context & redirect Home page
  const handleSearchBtnOnClick = (e) => {
    e.preventDefault();

    setFilters(filtersOnChange);
    history.push("/");
  };

  return(
    <>
      <div id="header-anchor" />
      <div className="header-container">
        <button 
          className="logo" 
          onClick={handleLogoBtnOnClick}
          type="button" 
        >
          <h1>React St</h1>
          <p><FaReact /></p> 
          <h1>re</h1>
        </button>

        <form className="search-bar">
          <select
            name= "select"
            onChange={ handleFilterOnChange }
            value={ select }
          >
            <option value="">Todos</option>
            { categories.map(({ id, name }) => (
              <option
                key={ `Header-${id}` }
                value={ id }
              >
                { name }
              </option>
            )) }
          </select>

          <input
            name= "input"
            onChange={ handleFilterOnChange }
            placeholder="Busque aqui seu produto"
            type="text"
            value={ input }
          />

          <button 
            onClick={
              // clear input value
              () => setFiltersOnChange((prev) => ({ ...prev, input: '' }))
            }
            type="button" 
          >
            X
          </button>

          <button
            className="search-button"
            disabled={ !isDelBtnDisabled()  }
            onClick={ handleSearchBtnOnClick }
            type="submit"
          >
            <h3><BiSearch /></h3>
          </button>
        </form>

        <div className="user-cart">
          <div className="user-access-container">
              <h3><BiUserCircle /></h3>
              <div className="user-access">
                <h5>olá, faça seu login</h5>
                <div className="sing-up">
                  <h5>ou cadastre-se</h5>
                  <p>v</p>
                </div>
              </div>
            </div>

            <Link className="cart-icon" to="/cart">
              <p>{ productsQuantity }</p>
              <h3><BsCart /></h3>
            </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
