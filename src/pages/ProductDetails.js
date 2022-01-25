import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import { useHistory } from 'react-router-dom';
import { getProductFromId } from '../services/api';
import getHdImage from '../helpers/hdImage';
import { addProduct, getProductsQuantity } from '../helpers/localStorageCart'

function ProductDetails({ match: { params: { id } } }) {
  const { setFilters, setProductsQuantity } = useContext(MyContext);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1)
  const [isSelectOn, setIsSelectOn] = useState(true);

  let history = useHistory();

  const { attributes, price, thumbnail, title } = product;

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductFromId(id);
      setProduct(product)
    }
    fetchProduct();
  }, [id])

  useEffect(() => {
    if(quantity === "10") {
      setIsSelectOn(false);
    }
  }, [quantity, isSelectOn])

  const handleBtnOnClick = ({ target }) => {
    addProduct({ id, price, quantity, thumbnail, title });

    setFilters({ input: 'Computador', select: '' });

    const productsQuantity = getProductsQuantity();
    setProductsQuantity(productsQuantity);

    target.innerText === 'Adicionar ao carrinho' 
      ? history.push("/") : history.push("/cart")
  }

  const arrayOfNumbers = [...Array(10).keys()];
  arrayOfNumbers.shift();

  return(
    <div className="d-flex">
    {
      Object.keys(product).length > 0
        && (
          <>
            <div>
              <img src={ getHdImage(thumbnail) } alt={title} />
            </div>

            <div>
              <h3>{ title }</h3>
              <h3>{ price }</h3>
              { attributes.map(({ name, value_name }, index) => (
                <div key={ `ProductDetails-${index}` } style={{ display: 'flex' }}>
                  <p style={{ margin: '2px' }}>{ `${name} - ` }</p>
                  <p style={{ margin: '2px' }}>{ value_name }</p>
                </div>
              )) }
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }}>
                <h5>Quantidade:</h5>
                { isSelectOn 
                    ? 
                      <select
                        onChange={ (({ target: { value } }) => setQuantity(value)) }
                        value={ quantity }
                      >
                        {
                          arrayOfNumbers.map((number, index) => {
                            return (
                              <option key={ index }value={ number }>{ `0${number}` }</option>
                          )})
                        }
                        <option value="10">+ 10</option>
                      </select> : 
                      <input
                        onChange={ (({ target: { value } }) => setQuantity(value)) }
                        type="number"
                        value={ quantity }
                      />
                }
              </div>
              <button
                onClick={ handleBtnOnClick }
                type="button"
              >
                Comprar agora
              </button>
              <button
                onClick={ handleBtnOnClick }
                type="button"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </>
        )
    }
    </div>
  );
}

export default ProductDetails;
