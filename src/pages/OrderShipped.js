import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { getBuyerInfo, getProductsCart } from '../helpers/localStorageCart';
import '../assets/css/OrderShipped.css';

function OrderShipped() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const retrieverOrderInfo = async () => {
      setLoading(true);

      const [buyerInfo, productsCart] = await Promise.all([
        getBuyerInfo(), getProductsCart(),
      ]);

      // setTimeout(() => setLoading(false), 1000);
      setLoading(false);
      console.log(buyerInfo);
      console.log(productsCart);
    };
    retrieverOrderInfo();
  }, []);

  return (
    <div>
      {
      loading
        ? <Loading />
        : (
          <div className="order-shipped-container">
            <div className="order-shipped-info">
              <h1>Order Info</h1>
            </div>
            <div>
              <h1>Seu pedido foi enviado</h1>
            </div>
          </div>
        )
    }
    </div>
  );
}

export default OrderShipped;
