import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { getProductsCart } from '../helpers/localStorageCart';
import getHdImage from '../helpers/hdImage';
import '../assets/css/Purchcase.css';

function Purchcase() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const retrieveProductsCart = async () => {
      const productsCart = await getProductsCart();
      setProducts(productsCart);
    };
    retrieveProductsCart();
  }, []);

  const getTotalPrice = () => {
    const totalPrice = products.map(({ price, quantity }) => price * quantity)
      .reduce((acc, cur) => acc + cur, 0);
    return `R$ ${totalPrice.toFixed(2)}`;
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
        <div><h3>Revise seus produtos</h3></div>
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
          <h3>{ `Total: ${getTotalPrice()}` }</h3>
        </div>
      </div>

      <div className="buyer-info">
        <form>
          <h3>Informações do Comprador</h3>
          <input
            placeholder="Nome Completo"
            type="text"
          />
          <input
            placeholder="CPF"
            type="number"
          />
          <input
            placeholder="Email"
            type="email"
          />
          <input
            placeholder="Telefone"
            type="tel"
          />
          <input
            placeholder="CEP"
            type="Number"
          />
          <input
            placeholder="Endereço"
            type="text"
          />
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
        </form>
      </div>

      <div className="payment-method">
        <h3>Método de Pagamento</h3>
      </div>

      <button
        style={{ margin: '30px' }}
        type="button"
      >
        Comprar
      </button>
    </div>
  );
}

export default Purchcase;
