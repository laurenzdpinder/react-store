import React from 'react';
import { Link } from 'react-router-dom'
import getHdImage from '../helpers/hdImage';

function ProductCard({ products }) {
  return(
    <>
    {
      products.length > 0 
        ? products.map((product) => {
          const { id, price, thumbnail, title } = product;
          return (
            <Link key={ `ProductCard-${id}` } to={ `/productDetails/${id}` }>
              <div style={ {border: '1px solid black'} }>
                <img src={ getHdImage(thumbnail) } alt={title} />
                <h3>{ title }</h3>
                <h3>{ `R$ ${price}` }</h3>
              </div>
            </Link>
          );
        }
      ) : <h1>Nenhum produto encontrado</h1>
    }
  </>
  );
}

export default ProductCard;