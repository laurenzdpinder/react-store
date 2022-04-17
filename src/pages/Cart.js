import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyContext from '../context/MyContext';
import {
  decreaseProductQuantity, increaseProductQuantity, getProductsCart, removeProduct,
} from '../helpers/localStorageCart';
import getHdImage from '../helpers/hdImage';
import calculateDiscount from '../helpers/calculateDiscount';
import getTotalOriginalPrice from '../helpers/getTotalOriginalPrice';
import getTotalPrice from '../helpers/getTotalPrice';
import '../assets/css/Cart.css';
import Header from '../components/Header';

function Cart() {
  const { productsQuantity, setProductsQuantity } = useContext(MyContext);

  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState(0);

  const navigate = useNavigate();

  // get products from localStorage;
  // update individual/total products quantity/price & remove product;
  // update totalPrice
  useEffect(() => {
    const retrieveProductsCart = async () => {
      const productsCart = await getProductsCart();
      setProducts(productsCart);
    };
    retrieveProductsCart();
  }, [productsQuantity]);

  useEffect(() => {}, [units]);

  const renderAlert = () => {
    const alert = document.querySelector('.cart-alert');
    alert.style.visibility = 'visible';
    alert.parentNode.style.visibility = 'visible';
  };

  const handleRemoveBtn = (id, quantity) => {
    removeProduct(id);
    setProductsQuantity(productsQuantity - quantity);
  };

  const handleMinusBtn = (id) => {
    decreaseProductQuantity(id);
    setProductsQuantity(productsQuantity - 1);
  };

  const handlePlusBtn = (id, quantity, availableQuantity) => {
    if (quantity + 1 > availableQuantity) {
      setUnits(availableQuantity);
      return renderAlert(availableQuantity);
    }
    increaseProductQuantity(id);
    setProductsQuantity(productsQuantity + 1);
    return null;
  };

  const handleAlertBtn = () => {
    const alert = document.querySelector('.cart-alert');
    alert.style.visibility = 'hidden';
    alert.parentNode.style.visibility = 'hidden';
  };

  const handleBtnOnClick = () => navigate('/purchcase');

  return (
    <>
      <Header />
      {
      products.length > 0
        ? (
          <div className="cart">
            <div className="cart-alert-container">
              <div className="cart-alert">
                {
                  units
                    ? <h3>{`Apenas ${units} unidades deste produto estão disponíveis!`}</h3>
                    : <h3>{`Apenas ${units} unidade deste produto está disponível!`}</h3>
                }
                <button
                  onClick={handleAlertBtn}
                  type="button"
                >
                  Ok
                </button>
              </div>
            </div>

            <main className="cart-products">
              {
                products.map(({
                  availableQuantity, id, originalPrice, price, quantity, thumbnail, title,
                }) => (
                  <div
                    className="cart-product"
                    key={`Cart-${id}`}
                  >
                    <Link
                      className="cart-product-image"
                      to={`/productDetails/${id}`}
                    >
                      <img src={getHdImage(thumbnail)} alt={title} />
                    </Link>

                    <div className="cart-product-title">
                      <h5>{ title }</h5>

                      <div>
                        <h5>Quantidade:</h5>

                        <div className="cart-product-title-quantity">
                          <div className="cart-product-title-quantity-amount">
                            <button
                              onClick={() => handleMinusBtn(id)}
                              type="button"
                            >
                              -
                            </button>

                            <p>{ quantity }</p>

                            <button
                              onClick={() => handlePlusBtn(id, quantity, availableQuantity)}
                              type="button"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveBtn(id, quantity)}
                            type="button"
                          >
                            remover
                          </button>
                        </div>
                      </div>
                    </div>

                    <section className="cart-product-subtotal">
                      <div className="cart-product-subtotal-original-price">
                        {
                          originalPrice && originalPrice !== price
                            && (
                              <>
                                <h5>{`- ${calculateDiscount(quantity, originalPrice, price)}%`}</h5>
                                <h5>{ `R$ ${(quantity * originalPrice).toFixed(2)}` }</h5>
                              </>
                            )
                        }
                      </div>
                      <h3 className="cart-product-subtotal-price">{ `R$ ${(quantity * price).toFixed(2)}` }</h3>
                    </section>
                  </div>
                ))
              }
            </main>

            <div className="cart-summary-container">
              <div className="order-summary">
                <div className="order-summary-price">
                  {
                  productsQuantity > 1
                    ? <h3>{ `Total (${productsQuantity} itens):` }</h3>
                    : <h3>{ `Total (${productsQuantity} item):` }</h3>
                  }
                  <div className="order-summary-original-price">
                    {
                    getTotalPrice(products) !== getTotalOriginalPrice(products)
                      && <h5>{ `R$ ${getTotalOriginalPrice(products)}` }</h5>
                    }
                  </div>
                  <h3>{ `R$ ${getTotalPrice(products)}` }</h3>
                </div>
                <button
                  onClick={handleBtnOnClick}
                  type="button"
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        )
        : (
          <section className="empty-cart">
            <h2>Você ainda não possui nenhum produto em seu carrinho de compras!</h2>
          </section>
        )
      }
    </>
  );
}

export default Cart;
