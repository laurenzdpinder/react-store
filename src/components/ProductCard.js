import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import { Link } from 'react-router-dom';
import getHdImage from '../helpers/hdImage';
import '../assets/css/ProductCard.css'

function ProductCard({ products }) {

  const { filters: { input } } = useContext(MyContext);

  // render original price if product has a discount
  const getOriginalPrice = (originalPrice, price) => {
    if(originalPrice > price) return `R$ ${(originalPrice).toFixed(2)}`
  }

  return(
    <>
      <div className="product-card-container">
        { products.length > 0 
          ? products.map((product) => {
            const { id, price, thumbnail, title, prices: { prices: originalPrice } } = product;
            return (

              <Link
                className="product-card"
                key={ `ProductCard-${id}` }
                to={ `/productDetails/${id}` }
              >
                <img src={ getHdImage(thumbnail) } alt={title} />
                <div className="product-price">
                  <h5>{ getOriginalPrice(originalPrice[0].amount, price) }</h5>
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
                  <li>Tente outro produto ou navegue pelos departamentos para encontrar o que você precisa.</li>
                </ul>
              </div>
            </div>
          )
      }
      </div>

      <div className="product-cart-bottom">
        { 
          products.length > 0 
          &&  <a href="#header-anchor">Voltar ao início</a>
        }
      </div>
    </>
  );
}

export default ProductCard;
