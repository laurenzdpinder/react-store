import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import { useHistory } from 'react-router-dom';
import { getProductFromId } from '../services/api';
import getHdImage from '../helpers/hdImage';
import { addProduct } from '../helpers/localStorageCart'

function ProductDetails({ match: { params: { id } } }) {
  const { setFilters } = useContext(MyContext);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1)

  let history = useHistory();

  const { attributes, price, thumbnail, title } = product;

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductFromId(id);
      setProduct(product)
    }
    fetchProduct();
  }, [id])

  return(
    <>
    {
      Object.keys(product).length > 0
        && (
          <>
            <img src={ getHdImage(thumbnail) } alt={title} />
            <h3>{ title }</h3>
            <h3>{ price }</h3>
            { attributes.map(({ name, value_name }, index) => (
              <div key={ `ProductDetails-${index}` } style={{ display: 'flex' }}>
                <h3 style={{ margin: '2px' }}>{ `${name} - ` }</h3>
                <h3 style={{ margin: '2px' }}>{ value_name }</h3>
              </div>
            )) }
            <div style={{ display: 'flex' }}>
              <p>Quantidade</p>
              <select
                name= "select"
                onChange={ (({ target: { value } }) => setQuantity(value)) }
                value={ quantity }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button
                onClick={ () => {
                  addProduct({
                    id,
                    price,
                    quantity,
                    thumbnail,
                    title,
                  });
                  history.push("/cart")
                } }
                type="button"
              >
                Comprar agora
              </button>
              <button
                onClick={ () => {
                  addProduct({
                    id,
                    price,
                    quantity,
                    thumbnail,
                    title,
                  });
                  setFilters({ input: 'Computador', select: '' })
                  history.push("/")
                } }
                type="button"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </>
        )
    }
    </>
  );
}

export default ProductDetails;
