import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { getProductFromId } from '../services/api';
import Loading from '../components/Loading';
import getHdImage from '../helpers/hdImage';
import { addProduct, getProductsQuantity } from '../helpers/localStorageCart';
import '../assets/css/ProductDetails.css';
import Header from '../components/Header';

function ProductDetails() {
  const { setFilters, setOffset, setProductsQuantity } = useContext(MyContext);

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isSelectOn, setIsSelectOn] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    attributes,
    available_quantity: availableQuantity,
    original_price: originalPrice,
    price,
    thumbnail,
    title,
  } = product;

  // fetch/render product
  useEffect(() => {
    const fetchProduct = async () => {
      const productAPI = await getProductFromId(id);
      setProduct(productAPI);
    };
    fetchProduct();
  }, [id]);

  // toggle from select to input
  useEffect(() => {
    if (quantity === 6) {
      setIsSelectOn(false);
    }
  }, [quantity, isSelectOn]);

  // set product to localStorage & set filters/products quantity to Context
  // set 0 to offset & redirect Home or Cart page
  const handleBtnOnClick = ({ target }) => {
    if (quantity > 0) {
      addProduct({
        id, originalPrice, price, quantity, thumbnail, title,
      });
      setFilters({ input: 'Computador', select: '' });

      const productsQuantity = getProductsQuantity();
      setProductsQuantity(productsQuantity);

      setOffset(0);

      if (target.innerText === 'Adicionar ao carrinho') {
        navigate('/');
      } else {
        navigate('/cart');
      }
    }
  };

  // create array of numbers - from 1 to 5
  const arrayOfNumbers = [...Array(6).keys()];
  arrayOfNumbers.shift();

  return (
    <>
      <Header />
      <div className="product-details-page">
        {
        Object.keys(product).length > 0
          ? (
            <div className="product-details-container">
              <div className="product-details-image">
                <img src={getHdImage(thumbnail)} alt={title} />
              </div>

              <div className="product-details">
                <h2>{ title }</h2>
                <div className="product-details-price">
                  {originalPrice && originalPrice !== price
                    && <h5>{ `R$ ${(originalPrice).toFixed(2)}` }</h5>}
                  <h3>{ `R$ ${(price).toFixed(2)}` }</h3>
                </div>

                { attributes.map(({ name, value_name: valueName }, index) => (
                  <div
                    className="product-info"
                    // eslint-disable-next-line react/no-array-index-key
                    key={`ProductDetails-${index}`}
                  >
                    <p>{ `${name} - ` }</p>
                    <p>{ valueName }</p>
                  </div>
                )) }
              </div>

              <div className="product-details-order">
                <div className="order-original-price">
                  { originalPrice && originalPrice !== price
                    && <h5>{ `R$ ${(originalPrice).toFixed(2)}` }</h5> }
                </div>
                <h3>{ `R$ ${(price).toFixed(2)}` }</h3>

                {
                  availableQuantity > 1
                    ? <h4>{ `${availableQuantity} unidades disponíveis` }</h4>
                    : <h4>Última unidade disponível</h4>
                }
                <div className="product-details-quantity">
                  <h4>Quantidade:</h4>
                  { isSelectOn
                    ? (
                      <select
                        // set select value
                        onChange={(({ target: { value } }) => setQuantity(Number(value)))}
                        value={quantity}
                      >
                        {
                          arrayOfNumbers.map((number) => (
                            <option key={`option${number}`} value={number}>
                              { `0${number}` }
                            </option>
                          ))
                        }
                        <option value="6">+ 6</option>
                      </select>
                    )
                    : (
                      <input
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                        // set input value
                        onChange={(({ target: { value } }) => setQuantity(Number(value)))}
                        type="number"
                        value={quantity > 0 ? quantity : ''}
                      />
                    ) }
                </div>

                <div className="product-details-buttons">
                  <button
                    onClick={handleBtnOnClick}
                    type="button"
                  >
                    Comprar agora
                  </button>
                  <button
                    onClick={handleBtnOnClick}
                    type="button"
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          ) : <Loading />
      }
      </div>
    </>
  );
}

export default ProductDetails;
