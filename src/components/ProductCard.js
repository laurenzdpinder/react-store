import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import Pagination from './Pagination';
import getHdImage from '../helpers/hdImage';
import calculateDiscount from '../helpers/calculateDiscount';
import '../assets/css/ProductCard.css';

function ProductCard({ paging, products }) {
  const { filters: { input } } = useContext(MyContext);

  // render original price
  const getOriginalPrice = (originalPrice) => `R$ ${(originalPrice).toFixed(2)}`;

  return (
    <>
      <div className="product-card-container">
        { products.length > 0
          ? products.filter(({ price }) => price)
            .map((product) => {
              const {
                id, price, thumbnail, title, original_price: originalPrice,
              } = product;
              return (

                <Link
                  className="product-card"
                  key={`ProductCard-${id}`}
                  to={`/productDetails/${id}`}
                >
                  <img src={getHdImage(thumbnail)} alt={title} />
                  <div className="product-price">
                    <div>
                      {
                        originalPrice > price
                        && (
                          <>
                            <h5>{getOriginalPrice(originalPrice, price)}</h5>
                            <h5>{`-${calculateDiscount(1, originalPrice, price)}%`}</h5>
                          </>
                        )
                      }

                    </div>

                    <h3>{ `R$ ${(price).toFixed(2)}` }</h3>
                  </div>
                  <div className="product-name">
                    <h5>{ title }</h5>
                  </div>
                </Link>

              );
            }) : (
              <div className="product-not-found">
                <h2>{ `Nenhum resultado encontrado para "${input}"` }</h2>
                <div>
                  <ul>
                    <li>Verifique a ortografia da palavra.</li>
                    <li>Utilize palavras ou termos mais genéricos.</li>
                    <li>
                      Tente outro produto ou navegue pelos departamentos
                      para encontrar o que você precisa.
                    </li>
                  </ul>
                </div>
              </div>
          )}
      </div>

      {
        products.length > 0
        && (
          <>
            <Pagination paging={paging} />

            <div className="product-cart-bottom">
              <a href="#header-anchor">Voltar ao início</a>
            </div>
          </>
        )
      }
    </>
  );
}

ProductCard.propTypes = {
  paging: PropTypes.objectOf(PropTypes.number).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductCard;
