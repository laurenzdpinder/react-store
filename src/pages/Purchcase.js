import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { getProductsCart } from '../helpers/localStorageCart';
import getHdImage from '../helpers/hdImage';
import getTotalPrice from '../helpers/getTotalPrice';
import '../assets/css/Purchcase.css';

function Purchcase() {
  const [products, setProducts] = useState([]);
  const [inputsOnChange, setInputsOnChange] = useState({
    firstname: '',
    surname: '',
    cpf: '',
    email: '',
    phone: '',
  });
  const [isValidInfo, setIsValidInfo] = useState({
    firstname: 0,
    surname: 0,
    cpf: 0,
    email: 0,
    phone: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const retrieveProductsCart = async () => {
      const productsCart = await getProductsCart();
      setProducts(productsCart);
    };
    retrieveProductsCart();
  }, []);

  const handleInputOnChange = ({ target: { name, value } }) => {
    setInputsOnChange((prev) => ({ ...prev, [name]: value }));
  };

  const checkCPF = () => inputsOnChange.cpf.length < 11 && inputsOnChange.cpf.length > 0;
  const checkEmail = () => !inputsOnChange.email.includes('com');
  const checkPhone = () => inputsOnChange.phone.length < 7;

  const checkValidation = (key, func) => {
    if (inputsOnChange[key].length === 0) {
      setIsValidInfo((prev) => ({ ...prev, [key]: 1 }));
    } else if (func) {
      setIsValidInfo((prev) => ({ ...prev, [key]: 2 }));
    } else {
      setIsValidInfo((prev) => ({ ...prev, [key]: 0 }));
    }
  };

  const handleBuyBtnOnClick = () => {
    checkValidation('firstname', false);
    checkValidation('surname', false);
    checkValidation('cpf', checkCPF());
    checkValidation('email', checkEmail());
    checkValidation('phone', checkPhone());
  };

  const isValidInput = (key, h5) => {
    if (isValidInfo[key] === 1) {
      return <h5>Campo Obrigatório</h5>;
    }
    if (isValidInfo[key] === 2) {
      return <h5>{`${h5} Inválido`}</h5>;
    }
    return null;
  };

  // console.log(inputsOnChange.firstname);
  // console.log(document.querySelector('#firstname').value);

  return (
    <div className="purchcase-container">
      <button
        className="purchcase-back-btn"
        onClick={() => navigate('/cart')}
        type="button"
      >
        <BsBoxArrowLeft />
      </button>

      <div className="products-review">
        <div className="products-review-title">
          <h3>Revise seus produtos</h3>
        </div>
        <div>
          {
            products.length
              && products.map(({
                id, quantity, price, thumbnail, title,
              }) => (
                <div
                  className="product-review"
                  key={`purchcase-${id}`}
                >
                  <div className="product-review-image">
                    <img src={getHdImage(thumbnail)} alt={title} />
                  </div>
                  <div className="product-review-title">
                    <h5>{title}</h5>
                  </div>
                  <div className="product-review-quantity">
                    <h5>{ `Quantidade: ${quantity}` }</h5>
                  </div>
                  <div className="product-review-price">
                    <h5>{ `R$ ${(quantity * price).toFixed(2)}` }</h5>
                  </div>
                </div>
              ))
          }
        </div>
        <div className="product-review-total">
          <h3>{ `Total: R$ ${getTotalPrice(products)}` }</h3>
        </div>
      </div>

      <div className="buyer-info">
        <form>
          <div className="buyer-info-title">
            <h3>Informações do Comprador</h3>
          </div>

          <div className="buyer-info-inputs">
            <div className="buyer-info-inputs-l1">
              <input
                autoComplete="off"
                id="firstname"
                onChange={handleInputOnChange}
                placeholder="Nome"
                name="firstname"
                type="text"
                value={inputsOnChange.firstname.toUpperCase()}
              />
              <input
                autoComplete="off"
                id="surname"
                onChange={handleInputOnChange}
                placeholder="Sobrenome"
                name="surname"
                type="text"
                value={inputsOnChange.surname.toUpperCase()}
              />
              <input
                autoComplete="off"
                id-="cpf"
                onChange={handleInputOnChange}
                placeholder="CPF"
                maxLength="14"
                name="cpf"
                type="text"
                value={inputsOnChange.cpf}
              />
              <input
                autoComplete="off"
                id="email"
                onChange={handleInputOnChange}
                name="email"
                placeholder="Email"
                type="email"
              />
              <input
                autoComplete="off"
                onChange={handleInputOnChange}
                name="phone"
                placeholder="Telefone"
                type="tel"
                // value
              />
            </div>

            <div className="buyer-info-inputs-i1">
              <div>{isValidInput('firstname')}</div>
              <div>{isValidInput('surname')}</div>
              <div>{isValidInput('cpf', 'CPF')}</div>
              <div>{isValidInput('email', 'Email')}</div>
              <div>{isValidInput('phone', 'Telefone')}</div>
            </div>

            <div className="buyer-info-inputs-2">
              <input
                placeholder="CEP"
                // type="Number"
              />
              <input
                placeholder="Endereço"
                type="text"
              />
            </div>

            <div className="buyer-info-inputs-i2">
              <div><h5>oi</h5></div>
              <div><h5>oi</h5></div>
            </div>

            <div className="buyer-info-inputs-l3">
              <input
                placeholder="Número"
                type="text"
              />
              <input
                placeholder="Complemento"
                type="text"
              />
              <input
                placeholder="Cidade"
                type="text"
              />
              <select>
                <option value="">Estado</option>
              </select>
            </div>

            <div className="buyer-info-inputs-i3">
              <div><h5>oi</h5></div>
              <div><h5>oi</h5></div>
              <div><h5>oi</h5></div>
              <div><h5>oi</h5></div>
            </div>
          </div>

        </form>
      </div>

      <div className="payment-method">
        <h3>Método de Pagamento</h3>
      </div>

      <button
        className="purchcase-buy-btn"
        onClick={handleBuyBtnOnClick}
        type="button"
      >
        Comprar
      </button>
    </div>
  );
}

export default Purchcase;
