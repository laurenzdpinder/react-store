import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getCategories } from '../services/api';
import react_hooks_icon from '../assets/images/react_hooks_icon.png';

function Header({ changeFilters }) {
  const [categories, setCategories] = useState([{}]);
  const [filters, setFilters] = useState({ input: '', select: '' });
  let history = useHistory();

  const { input, select } = filters;

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesFromAPI = await getCategories();
      setCategories(categoriesFromAPI);
    }
    fetchCategories();
  }, [])

  const handleFilterOnChange = ({ target: { name, value } }) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  };

  const isDelBtnDisabled = () => input || select;

  const handleSearchBtnOnClick = (e) => {
    e.preventDefault();
    changeFilters(filters);
    history.push("/");
  }

  return(
    <div className="d-flex">
      <Link to="/">
        <h1>Frontend Online Store</h1>
        <img src={ react_hooks_icon } alt="react hooks icon" style={ { width: '40px' } }/>
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
        className="input"
          name= "input"
          onChange={ handleFilterOnChange }
          placeholder="Busque aqui seu produto"
          type="text"
          value={ input }
        />

        <button 
          onClick={
            () => setFilters((prev) => ({ ...prev, input: '' }))
          }
          type="button" 
        >
          X
        </button>

        <button
          className="search-btn"
          disabled={ !isDelBtnDisabled()  }
          onClick={ handleSearchBtnOnClick }
          type="submit"
        >
          <i className="fas fa-search"></i>
        </button>
      </form>
      
      <div>
        <h4>Olá, faça o seu login ou cadastre-se</h4>
      </div>

      <Link to="/cart">
        <p>0</p>
        <button type="button" className="car-btn"><i className="fas fa-shopping-cart"></i></button>
      </Link>
    </div>
  );
}

export default Header;

