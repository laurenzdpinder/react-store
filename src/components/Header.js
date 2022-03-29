import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiUserCircle, BiSearch } from 'react-icons/bi';
import { BsCart } from 'react-icons/bs';
import { FaReact } from 'react-icons/fa';
import { getCategories } from '../services/api';
import { addUsername, getUsername } from '../helpers/localStorageCart';
import MyContext from '../context/MyContext';
import '../assets/css/Header.css';

function Header() {
  const { productsQuantity, setFilters, setOffset } = useContext(MyContext);

  const [categories, setCategories] = useState([{}]);
  const [filtersOnChange, setFiltersOnChange] = useState({ input: '', select: '' });
  const [login, setLogin] = useState({ username: '', password: '' });
  const [loadingAccess, setLoadingAccess] = useState(true);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const { input, select } = filtersOnChange;
  const { username, password } = login;

  // fetch & render select categories
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesFromAPI = await getCategories();
      setCategories(categoriesFromAPI);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const retrieverUsername = async () => {
      setLoadingAccess(true);
      const name = await getUsername();
      if (name.length) setUser(name);
      if (!name.length) setUser('');
      setLoadingAccess(false);
    };
    retrieverUsername();
  }, [login]);

  // change input and select values
  const handleFiltersOnChange = ({ target: { name, value } }) => {
    setFiltersOnChange((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginOnChange = ({ target: { name, value } }) => {
    const allowedValue = value.replace(/[^a-zA-Z0-9*]/g, '');
    const secretValue = [];
    if (name === 'password') {
      for (let i = 0; i < allowedValue.length; i += 1) {
        secretValue.push('*');
      }
      return setLogin((prev) => ({ ...prev, [name]: secretValue.join('') }));
    }
    return setLogin((prev) => ({ ...prev, [name]: value }));
  };

  // clear input & select values after click on ProductDetails buttons
  useEffect(() => {
    setFiltersOnChange({ input: '', select: '' });
  }, [productsQuantity]);

  // clear input and select values & set filters to Context
  // set 0 to offset & redirect Home page
  const handleLogoBtnOnClick = () => {
    setFiltersOnChange({ input: '', select: '' });
    setFilters({ input: 'Computador', select: '' });
    setOffset(0);
    navigate('/');
  };

  // enable search button
  const isDelBtnDisabled = () => input || select;

  // set filters to Context & redirect Home page & set 0 to offset
  const handleSearchBtnOnClick = (e) => {
    e.preventDefault();
    setFilters(filtersOnChange);
    setOffset(0);
    navigate('/');
  };

  // set userName to localStorage
  const handleLoginBtnOnClick = () => {
    if (username && password) {
      addUsername({ username, orders: '' });
      setLogin({ username, password: '' });
    }
  };

  // set userName to localStorage
  const handleLoginOutBtnOnClick = () => {
    localStorage.removeItem('login');
    // addUsername('');
    setLogin({ username: '', password: '' });
  };

  const handleMyOrdersBtnOnClick = () => {
    navigate('/myorders');
  };

  const createUserAccessJSX = () => {
    if (loadingAccess) return null;
    if (user.length) {
      // console.log(user.length);
      return (
        <div className="user-access welcome">
          <h4>Boas-Vindas</h4>
          <h4>{`${user[0].username} !`}</h4>
        </div>
      );
    }
    return (
      <>
        <h3><BiUserCircle /></h3>
        <div className="user-access">
          <h5>olá, faça seu login</h5>
          <div className="sing-up">
            <h5>ou cadastre-se</h5>
            <p>v</p>
          </div>
        </div>
      </>
    );
  };

  return (
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
            name="select"
            onChange={handleFiltersOnChange}
            value={select}
          >
            <option value="">Todos</option>
            { categories.map(({ id, name }) => (
              <option
                key={`Header-${id}`}
                value={id}
              >
                { name }
              </option>
            )) }
          </select>

          <input
            autoComplete="off"
            name="input"
            onChange={handleFiltersOnChange}
            placeholder="Busque aqui seu produto"
            type="text"
            value={input}
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
            disabled={!isDelBtnDisabled()}
            onClick={handleSearchBtnOnClick}
            type="submit"
          >
            <h3><BiSearch /></h3>
          </button>
        </form>

        <div className="user-cart">
          <div className="user-access-container">
            {createUserAccessJSX()}
            {
              user
                ? (
                  <div id="acess-box">
                    <button
                      onClick={handleMyOrdersBtnOnClick}
                      type="button"
                    >
                      Meus Pedidos
                    </button>
                    <button
                      onClick={handleLoginOutBtnOnClick}
                      type="button"
                    >
                      Sair
                    </button>
                  </div>
                )
                : (
                  <div id="acess-box">
                    <h4>Usuário</h4>
                    <input
                      autoComplete="off"
                      onChange={handleLoginOnChange}
                      name="username"
                      type="text"
                      value={login.username}
                    />
                    <h4>Senha</h4>
                    <input
                      autoComplete="off"
                      onChange={handleLoginOnChange}
                      maxLength="8"
                      name="password"
                      type="text"
                      value={login.password}
                    />
                    <button
                      onClick={handleLoginBtnOnClick}
                      type="button"
                    >
                      Entrar
                    </button>
                  </div>
                )
            }
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
