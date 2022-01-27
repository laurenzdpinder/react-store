import React from 'react';
import { Link } from 'react-router-dom';
import getHdImage from '../helpers/hdImage';
import '../assets/css/ProductCard.css'

function ProductCard({ products }) {

  const getFullPrice = (fullPrice, price) => {
    if(fullPrice > price) return `R$ ${(fullPrice).toFixed(2)}`
  }

  return(
    <>
      <div className="product-card-container">
        { products.length > 0 
          ? products.map((product) => {
            const { id, price, thumbnail, title, prices: { prices: fullPrice } } = product;
            return (

              <Link className="product-card" key={ `ProductCard-${id}` } to={ `/productDetails/${id}` }>
                <img src={ getHdImage(thumbnail) } alt={title} />
                <div className="product-price">
                  <h5>{ getFullPrice(fullPrice[0].amount, price) }</h5>
                  <h3>{ `R$ ${(price).toFixed(2)}` }</h3>
                </div>
                <div className="product-name">
                  <h5>{ title }</h5>
                </div>
              </Link>

            );
          }) : <h1>Nenhum produto encontrado</h1>
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
