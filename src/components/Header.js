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

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesFromAPI = await getCategories();
      setCategories(categoriesFromAPI);
    }
    fetchCategories();
    // console.log(document.querySelector('input').value);
  }, []);

  const handleFilterOnChange = ({ target: { name, value } }) => {
    setFiltersOnChange((prev) => ({ ...prev, [name]: value }))
  };

  const isDelBtnDisabled = () => input || select;

  const handleSearchBtnOnClick = (e) => {
    e.preventDefault();
    setFilters(filtersOnChange);
    history.push("/");
  }

  return(
    <div 
      className="header">
      <Link className="logo" to="/">
        <h1>React</h1>
        <h1>St</h1>
        <img src={ react_hooks_icon } alt="react hooks icon" style={ { width: '60px' } }/>
        <h1>re</h1>
      </Link>

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
      
      <div>
        <p>Olá, faça o seu login</p>
        <p>ou cadastre-se </p>
      </div>

      <Link to="/cart" className="d-flex">
        <p>{ productsQuantity }</p>
        <button 
          type="button"
        >
          <i className="fas fa-shopping-cart"></i>
        </button>
      </Link>
    </div>
  );
}

export default Header;
