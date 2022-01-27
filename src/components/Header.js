import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { getCategories } from '../services/api';
import react_hooks_icon from '../assets/images/react_hooks_icon.png';
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

  // clear input & select values after click on ProductDetails buttons ('Comprar agora', 'Adicionar ao carrinho' )
  useEffect(() => {
    setFiltersOnChange({ input: '', select: '' })
  },[productsQuantity])

  // change input and select values
  const handleFilterOnChange = ({ target: { name, value } }) => {
    setFiltersOnChange((prev) => ({ ...prev, [name]: value }))
  };

  // clear input and select values & set filters to context & redirect Home page
  const handleLogoBtnOnClick = () => {
    setFiltersOnChange({ input: '', select: '' })
    setFilters({ input: 'Computador', select: '' })
    history.push("/");
  }
  
  // enable search button
  const isDelBtnDisabled = () => input || select;
  
  // set filters to context & redirect Home page
  const handleSearchBtnOnClick = (e) => {
    e.preventDefault();
    setFilters(filtersOnChange);
    history.push("/");
  }

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
          <img src={ react_hooks_icon } alt="react hooks icon" />
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
            <i className="fas fa-search"></i>
          </button>
        </form>
        
        <div className="user-access">
          <h5>olá, faça seu login</h5>
          <div className="sing-up">
            <h5>ou cadastre-se</h5>
            <p>v</p>
          </div>
        </div>

        <Link className="cart-icon" to="/cart">
          <p>{ productsQuantity }</p>
          <i className="fas fa-shopping-cart"></i>
        </Link>
      </div>
    </>
  );
}

export default Header;
