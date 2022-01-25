import React, { useEffect, useState } from 'react';
import { getProductsCart } from '../helpers/localStorageCart';

function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const teste = async () => {
      const productsCart = await getProductsCart();
      setProducts(productsCart)
    }
    teste();
  }, [])

  const increaseProductQuantity = () => {
    return
  }

  return(
    <div>
      {
        products.map((product) => {
          const { id, quantity, title } = product;
          return (
            <div key={ `Cart-${id}` }>
              <h4>{ title }</h4>
              <div className="d-flex">
                <button>-</button>
                <p>{ quantity }</p>
                <button
                  onClick={ increaseProductQuantity }
                  type="button"
                >
                  +
                </button>
              </div>
              <p>remover</p>
            </div>
          )
        })
      }
      <button type="button">Finalizar Compra</button>
    </div>
  );
}

export default Cart;
