import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';
import {
  RiBankLine, RiBarcodeLine, RiMastercardLine, RiVisaLine,
} from 'react-icons/ri';
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
    cep: '',
    address: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    paymentMethod: '',
  });
  const [isValidInfo, setIsValidInfo] = useState({
    firstname: 0,
    surname: 0,
    cpf: 0,
    email: 0,
    phone: 0,
    cep: 0,
    address: 0,
    number: 0,
    complement: 0,
    city: 0,
    state: 0,
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
  const checkCEP = () => inputsOnChange.cep.length < 10;

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
    checkValidation('cep', checkCEP());
    checkValidation('address', false);
    checkValidation('number', false);
    checkValidation('city', false);
    checkValidation('state', false);
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

  console.log(inputsOnChange.paymentMethod);
  // console.log(document.querySelector('#firstname').value);
  // console.log(document.querySelector('input[name="payment-method"]:checked').value);

  const handleRadioOnClick = () => {
    const radioValue = document.querySelector('input[name="payment-method"]:checked').value;
    setInputsOnChange((prev) => ({ ...prev, paymentMethod: radioValue }));
  };

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
        <div className="purchcase-container-titles">
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
          <div className="purchcase-container-titles">
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
                value={inputsOnChange.email}
              />
              <input
                autoComplete="off"
                id="phone"
                onChange={handleInputOnChange}
                name="phone"
                placeholder="Telefone"
                type="tel"
                value={inputsOnChange.phone}
              />
            </div>

            <div className="buyer-info-inputs-i1">
              <div>{isValidInput('firstname')}</div>
              <div>{isValidInput('surname')}</div>
              <div>{isValidInput('cpf', 'CPF')}</div>
              <div>{isValidInput('email', 'Email')}</div>
              <div>{isValidInput('phone', 'Telefone')}</div>
            </div>

            <div className="buyer-info-inputs-l2">
              <input
                autoComplete="off"
                id="cep"
                onChange={handleInputOnChange}
                name="cep"
                placeholder="CEP"
                type="text"
                value={inputsOnChange.cep}
              />
              <input
                autoComplete="off"
                id="address"
                onChange={handleInputOnChange}
                name="address"
                placeholder="Endereço"
                type="text"
                value={inputsOnChange.address.toLocaleUpperCase()}
              />
            </div>

            <div className="buyer-info-inputs-i2">
              <div>{isValidInput('cep', 'CEP')}</div>
              <div>{isValidInput('address')}</div>
            </div>

            <div className="buyer-info-inputs-l3">
              <input
                autoComplete="off"
                id="number"
                onChange={handleInputOnChange}
                name="number"
                placeholder="Número"
                type="text"
                value={inputsOnChange.number}
              />
              <input
                autoComplete="off"
                id="complement"
                onChange={handleInputOnChange}
                name="complement"
                placeholder="Complemento"
                type="text"
                value={inputsOnChange.complement}
              />
              <input
                autoComplete="off"
                id="city"
                onChange={handleInputOnChange}
                name="city"
                placeholder="Cidade"
                type="text"
                value={inputsOnChange.city.toLocaleUpperCase()}
              />
              <select
                id="state"
                name="state"
                onChange={handleInputOnChange}
                value={inputsOnChange.state}
              >
                <option value="">Estado</option>
                <option value="AC">ACRE</option>
                <option value="AL">ALAGOAS</option>
                <option value="AP">AMAPÁ</option>
                <option value="AM">AMAZONAS</option>
                <option value="BA">BAHIA</option>
                <option value="CE">CEARÁ</option>
                <option value="DF">DISTRITO FEDERAL</option>
                <option value="ES">ESPÍRITO SANTO</option>
                <option value="GO">GOIÁS</option>
                <option value="MA">MARANHÃO</option>
                <option value="MT">MATO GROSSO</option>
                <option value="MS">MATO GROSSO DO SUL</option>
                <option value="MG">MINAS GERAIS</option>
                <option value="PA">PARÁ</option>
                <option value="PB">PARAÍBA</option>
                <option value="PR">PARANÁ</option>
                <option value="PE">PERNAMBUCO</option>
                <option value="PI">PIAUÍ</option>
                <option value="RJ">RIO DE JANEIRO</option>
                <option value="RN">RIO GRANDE DO NORTE</option>
                <option value="RS">RIO GRANDE DO SUL</option>
                <option value="RO">RONDÔNIA</option>
                <option value="RR">RORAIMA</option>
                <option value="SC">SANTA CATARINA</option>
                <option value="SP">SÃO PAULO</option>
                <option value="SE">SERGIPE</option>
                <option value="TO">TOCANTINS</option>
                <option value="EX">ESTRANGEIRO</option>
              </select>
            </div>

            <div className="buyer-info-inputs-i3">
              <div>{isValidInput('number')}</div>
              <div />
              <div>{isValidInput('city')}</div>
              <div>{isValidInput('state')}</div>
            </div>
          </div>
        </form>
      </div>

      <div className="payment-method-container">
        <div className="purchcase-container-titles">
          <h3>Método de Pagamento</h3>
        </div>
        <form className="payment-methods-form">
          <div className="payment-method">
            <label htmlFor="bank-slip">
              <input
                id="bank-slip"
                name="payment-method"
                onClick={handleRadioOnClick}
                type="radio"
                value="Boleto"
              />
              <div className="payment-method-type">
                <div><h6><RiBarcodeLine /></h6></div>
                <div>
                  <h5>Boleto</h5>
                  <p>Aprovação em até 2 dias úteis</p>
                </div>
              </div>
            </label>
          </div>
          <div className="payment-method">
            <label htmlFor="credit">
              <input
                id="credit"
                name="payment-method"
                onClick={handleRadioOnClick}
                type="radio"
                value="Crédito"
              />
              <div className="payment-method-type">
                <div>
                  <h6 id="mastercard"><RiMastercardLine /></h6>
                  <h6 id="visa"><RiVisaLine /></h6>
                </div>
                <div>
                  <h5>Crédito</h5>
                  <p>Até 12 vezes sem juros</p>
                </div>
              </div>
            </label>
          </div>
          <div className="payment-method">
            <label htmlFor="debit">
              <input
                id="debit"
                name="payment-method"
                onClick={handleRadioOnClick}
                type="radio"
                value="Débito"
              />
              <div className="payment-method-type">
                <div><h6><MdPayment /></h6></div>
                <div>
                  <h5>Débito</h5>
                  <p>Aprovação imediata</p>
                </div>
              </div>
            </label>
          </div>
          <div className="payment-method">
            <label htmlFor="bank-transfer">
              <input
                id="bank-transfer"
                name="payment-method"
                onClick={handleRadioOnClick}
                type="radio"
                value="Transferência Bancária"
              />
              <div className="payment-method-type">
                <div><h6><RiBankLine /></h6></div>
                <div>
                  <h5>Transferência Bancária</h5>
                  <p>Aprovação em até 2 horas</p>
                </div>
              </div>
            </label>
          </div>
        </form>
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
