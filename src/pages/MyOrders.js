import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { addOrderShippedProducts, addBuyerInfo, getUsername } from '../helpers/localStorageCart';
import getHdImage from '../helpers/hdImage';
import '../assets/css/MyOrders.css';

function MyOrders() {
  const [history, setHistory] = useState([{ username: '', orders: '' }]);

  const navigate = useNavigate();

  useEffect(() => {
    const retrieverOrders = async () => {
      const myOrders = await getUsername();
      setHistory(myOrders);
    };
    retrieverOrders();
  }, []);

  const handleBtnOnClick = ({ target }) => {
    const { id } = target;
    const orderShipped = history[0].orders[id].order;
    const [buyerInfo, products] = [orderShipped[0], orderShipped[1]];
    addBuyerInfo(buyerInfo);
    addOrderShippedProducts(products);
    navigate('/ordershipped');
  };

  return (
    <>
      <Header />
      <div className="my-orders-container">
        {
          history[0].orders.length
            ? (
              <div className="my-orders">
                {
                  history[0].orders.map(({ order }, index) => (
                    <div className="my-order" key={`my-orders-${order[0].orderNumber}-${order[0].orderDate}`}>
                      <div className="my-order-Date">
                        <div><h4>{`Pedido nº ${order[0].orderNumber} -`}</h4></div>
                        <div><h4>{`${(order[0].orderDate).split('-')[0].replace(/\//g, ' de ')}`}</h4></div>
                      </div>

                      <div className="my-order-info">
                        <div>
                          {
                          history[0].orders[index].order[1].map(({
                            id, thumbnail, title,
                          }) => (
                            <div className="my-order-summary" key={`my-order${id}`}>
                              <div className="my-order-image"><img src={getHdImage(thumbnail)} alt={title} /></div>
                              <div className="my-order-title"><h4>{title}</h4></div>
                            </div>
                          ))
                        }
                        </div>
                        <div className="my-order-button">
                          <button
                            id={index}
                            onClick={handleBtnOnClick}
                            type="button"
                          >
                            Ver Compra
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
            : (
              <div className="empty-orders"><h2>Você ainda não possui nenhuma compra!</h2></div>
            )
        }
      </div>
    </>
  );
}

export default MyOrders;
