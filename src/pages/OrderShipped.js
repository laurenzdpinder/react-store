/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import lottieJson from '../animationData.json';
import Loading from '../components/Loading';
import getTotalPrice from '../helpers/getTotalPrice';
// eslint-disable-next-line import/named
import { getBuyerInfo, getProductsCart } from '../helpers/localStorageCart';
import getHdImage from '../helpers/hdImage';
import '../assets/css/OrderShipped.css';

function OrderShipped() {
  const [buyer, setBuyer] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOnMouseOver, setIsOnMouseOver] = useState(false);

  const {
    address, city, complement, cep, cpf, email, firstname, number,
    orderDate, orderNumber, paymentMethod, phone, state, surname,
  } = buyer;

  useEffect(() => {
    const retrieverOrderInfo = async () => {
      setLoading(true);

      const [buyerInfo, productsCart] = await Promise.all([
        getBuyerInfo(), getProductsCart(),
      ]);

      // setTimeout(() => setLoading(false), 1000);
      setBuyer(buyerInfo);
      setProducts(productsCart);
      setLoading(false);
    };
    retrieverOrderInfo();
  }, []);

  const checkComplement = () => {
    if (complement) {
      return `COMPLEMENTO: ${complement.toUpperCase()},`;
    }
    return '';
  };

  const increaseSpeed = () => setIsOnMouseOver(true);
  const decreaseSpeed = () => setIsOnMouseOver(false);

  const speed = () => {
    if (isOnMouseOver) return 3.5;
    return 1.5;
  };

  return (
    <div>
      {
      loading
        ? <Loading />
        : (
          <div className="order-shipped">
            <div className="order">
              <div className="delivery-data">
                <h3>DADOS DE ENTREGA</h3>

                <div>
                  <h5>{`NÚMERO DO PEDIDO: ${orderNumber}`}</h5>
                  <h5>{`DATA DA COMPRA: ${orderDate}`}</h5>
                </div>

                <h4>INFORMAÇÕES PESSOAIS</h4>

                <div className="personal-info">
                  <div>
                    <h5>NOME COMPLETO</h5>
                    <hr />
                    <h5>{`${firstname.toUpperCase()}  ${surname.toUpperCase()}`}</h5>
                  </div>

                  <div>
                    <h5>CPF</h5>
                    <hr />
                    <h5>{cpf.replace(/[^0-9.-]/g, '')}</h5>
                  </div>

                  <div>
                    <h5>EMAIL</h5>
                    <hr />
                    <h5>{email.toUpperCase()}</h5>
                  </div>

                  <div>
                    <h5>TELEFONE</h5>
                    <hr />
                    <h5>{phone.replace(/[^0-9()-]/g, '')}</h5>
                  </div>
                </div>

                <h4>ENDEREÇO</h4>

                <div className="address">
                  <h5>
                    {
                      `${address.toUpperCase()},
                      NÚMERO: ${number.replace(/[^0-9]/g, '')},
                      ${checkComplement()}
                      MUNICÍPIO: ${city.toUpperCase()},
                      UF: ${state},
                      CEP: ${cep.replace(/[^0-9.-]/g, '')}`
                    }
                  </h5>
                </div>
              </div>

              <div className="purchcase-details">
                <h3>DETALHES DA COMPRA</h3>
                <div className="purchcase-details-title">
                  <h5>Produtos</h5>
                  <h5>Qtd.</h5>
                  <h5>Valor</h5>
                  <h5>Total</h5>
                </div>
                {
                  products.length
                  && products.map(({
                    id, quantity, price, thumbnail, title,
                  }) => (
                    <div
                      className="order-shipped-product"
                      key={`order-shipped-${id}`}
                    >
                      <div className="order-shipped-product-image">
                        <img src={getHdImage(thumbnail)} alt={title} />
                      </div>
                      <div className="order-shipped-product-title">
                        <h6>{title}</h6>
                      </div>
                      <div className="order-shipped-product-quantity">
                        <h6>{quantity}</h6>
                      </div>
                      <div className="order-shipped-product-price">
                        <h6>{ `R$ ${price.toFixed(2)}` }</h6>
                      </div>
                      <div className="order-shipped-product-price">
                        <h6>{ `R$ ${(quantity * price).toFixed(2)}` }</h6>
                      </div>
                    </div>
                  ))
                }
                <div className="order-shipped-product-total">
                  <h5>TOTAL</h5>
                  <h5>{`R$ ${getTotalPrice(products)}`}</h5>
                </div>

                <div className="order-shipped-payment">
                  <h5>MÉTODO DE PAGAMENTO</h5>
                  <hr />
                  <h5>{paymentMethod.toUpperCase()}</h5>
                </div>
              </div>
            </div>

            <div className="lottie">
              <div className="lottie-title">
                <h1>Parabéns! Sua compra foi aprovada e seu pedido está indo até você!</h1>
              </div>
              <div className="lottie-component">
                <Lottie
                  loop
                  animationData={lottieJson}
                  play
                  speed={speed()}
                  onMouseOver={increaseSpeed}
                  onMouseOut={decreaseSpeed}
                  style={{ width: 350, height: 350 }}
                />
              </div>

            </div>
          </div>
        )
      }
      <div className="order-shipped-btn">
        <button
          type="button"
        >
          Home
        </button>
      </div>

    </div>
  );
}

export default OrderShipped;
