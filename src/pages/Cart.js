import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Loading from "../components/Loading";
import { decreaseProductQuantity, increaseProductQuantity, getProductsCart, removeProduct } from '../helpers/localStorageCart';
import getHdImage from '../helpers/hdImage';
import '../assets/css/Cart.css';

function Cart() {
  const {productsQuantity, setProductsQuantity} = useContext(MyContext);

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // get products from localStorage;
  // update individual/total products quantity/price & remove product;
  // update totalPrice
  useEffect(() => {
    const retrieveProductsCart = async () => {
      setLoading(true);

      const productsCart = await getProductsCart();
      setProducts(productsCart)

      setLoading(false);
    }
    retrieveProductsCart();
  }, [productsQuantity]);

  const getTotalOriginalPrice = () => {
    const totalOriginalPrice = products.map(({ original_price, price, quantity }) => {
      if(original_price) {
        return original_price * quantity;
      } else {
        return price * quantity;
      }
    }).reduce((acc, cur) => acc + cur, 0);
    return `R$ ${totalOriginalPrice.toFixed(2)}`;
  }

  const getTotalPrice = () => {
    const totalPrice = products.map(({ price, quantity }) => price * quantity)
      .reduce((acc, cur) => acc + cur, 0);
    return `R$ ${totalPrice.toFixed(2)}`;
  }

  const createCartContainer  = () => {
    if(products.length > 0) {
      return(
        <div className="cart-container">
        <div className="cart-product-container">
        {
          products.map((product) => {
            const { id, quantity, original_price, price, thumbnail, title } = product;
            return (
              <div
                className="cart-product"
                key={ `Cart-${id}` }
              >
                <Link
                  className="cart-image"
                  to={ `/productDetails/${id}` }
                >
                  <img src={ getHdImage(thumbnail) } alt={title} />
                </Link>

                <div className="cart-title">
                  <h5>{ title }</h5>

                  <div className="cart-quantity-container">
                    <h5>Quantidade:</h5>
                    
                    <div className="cart-quantity-buttons">
                      <div className="cart-quantity">
                        <button
                          onClick={
                            () => {
                              decreaseProductQuantity(id);
                              setProductsQuantity(productsQuantity - 1);
                            } }
                            type="button"
                        >
                          -
                        </button>

                        <p>{ quantity }</p>

                        <button
                          onClick={ () => {
                            increaseProductQuantity(id);
                            setProductsQuantity(productsQuantity + 1);
                          } }
                          type="button"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={ () => {
                          removeProduct(id);
                          setProductsQuantity(productsQuantity - quantity);
                        } }
                        type="button"
                      >
                        remover
                      </button>
                    </div>
                  </div>
                </div>

                <div className="subtotal-container">
                  <div className="subtotal-original-price">
                    { original_price &&
                      <h5>{ `R$ ${(quantity * original_price).toFixed(2)}` }</h5>
                    }
                  </div>
                  <h3 className="subtotal-price">{ `R$ ${(quantity * price).toFixed(2)}` }</h3>
                </div>
              </div>
            )
          })
        }
        </div>

        <div className="order-summary-container">
          <div className="order-summary">
            <h2>Resumo do Pedido</h2>
            <div className="order-summary-price">
              {
                productsQuantity > 1
                  ? <h3>{ `Total (${productsQuantity} itens):` }</h3>
                  : <h3>{ `Total (${productsQuantity} item):` }</h3>
              }
              {
                getTotalPrice() !== getTotalOriginalPrice()
                  && <h5>{ getTotalOriginalPrice() }</h5>
              }
              <h3>{ getTotalPrice() }</h3>
            </div>
            <button type="button">Finalizar Compra</button>
          </div>
        </div>
        </div>
      );
    }
    return (
      <div className="empty-cart">
        <h2>Você ainda não possui nenhum produto em seu carrinho de compras!</h2>
      </div>
    )
  }

  return(
    <>
    {
      loading
        ? <Loading />
        : createCartContainer()
    }
    </>
  );
}

export default Cart;
