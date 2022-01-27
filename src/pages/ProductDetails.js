import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import { useHistory } from 'react-router-dom';
import { getProductFromId } from '../services/api';
import getHdImage from '../helpers/hdImage';
import { addProduct, getProductsQuantity } from '../helpers/localStorageCart'
import '../assets/css/ProductDetails.css';

function ProductDetails({ match: { params: { id } } }) {
  const { setFilters, setProductsQuantity } = useContext(MyContext);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1)
  const [isSelectOn, setIsSelectOn] = useState(true);

  let history = useHistory();

  const { attributes, price, thumbnail, title } = product;

  // fetch/render product  
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductFromId(id);
      setProduct(product)
    }
    fetchProduct();
  }, [id])

  // toggle from select to input
  useEffect(() => {
    if(quantity === "10") {
      setIsSelectOn(false);
    }
  }, [quantity, isSelectOn])

  // set product to localStorage & set filters/products quantity to context & redirect Home or Cart page
  const handleBtnOnClick = ({ target }) => {
    addProduct({ id, price, quantity, thumbnail, title });
    setFilters({ input: 'Computador', select: '' });

    const productsQuantity = getProductsQuantity();
    setProductsQuantity(productsQuantity);

    target.innerText === 'Adicionar ao carrinho' 
      ? history.push("/") : history.push("/cart")
  }

  // create array of numbers - from 1 to 9
  const arrayOfNumbers = [...Array(10).keys()];
  arrayOfNumbers.shift();

  return(
    <div className="product-details-container">
    {
      Object.keys(product).length > 0
        && (
          <>
            <div className="product-image">
              <img src={ getHdImage(thumbnail) } alt={title} />
            </div>

            <div className="product-details">
              <h3>{ title }</h3>
              <h3>{ `R$ ${(price).toFixed(2)}` }</h3>
              { attributes.map(({ name, value_name }, index) => (
                <div key={ `ProductDetails-${index}` } style={{ display: 'flex' }}>
                  <p style={{ margin: '2px' }}>{ `${name} - ` }</p>
                  <p style={{ margin: '2px' }}>{ value_name }</p>
                </div>
              )) }
            </div>

            <div className="product-order">
            <h3>{ `R$ ${(price).toFixed(2)}` }</h3>
              <div className="product-quantity">
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
