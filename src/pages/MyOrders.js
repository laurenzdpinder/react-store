import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getUsername } from '../helpers/localStorageCart';
import '../assets/css/MyOrders.css';

function MyOrders() {
  const [history, setHistory] = useState([{ username: '', orders: '' }]);

  useEffect(() => {
    const retrieverOrders = async () => {
      const myOrders = await getUsername();
      setHistory(myOrders);
    };
    retrieverOrders();
  }, []);

  if (history[0].orders.length) {
    console.log(history[0].orders.map(({ order }) => order[0].orderNumber));
  }

  return (
    <>
      <Header />
      <div className="my-orders">
        {
          history[0].orders.length
            ? (
              <div><h1>Tenho produtos</h1></div>
            )
            : (
              <div><h1>Nao tenho produtos</h1></div>
            )
        }
      </div>
    </>
  );
}

export default MyOrders;
