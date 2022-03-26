import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import lottieJson from '../animationData.json';
import Loading from '../components/Loading';
import { getBuyerInfo, getProductsCart } from '../helpers/localStorageCart';
import '../assets/css/OrderShipped.css';

function OrderShipped() {
  const [buyer, setBuyer] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    address, city, complement, cep, cpf, email, firstname,
    // eslint-disable-next-line no-unused-vars
    number, paymentMethod, phone, state, surname,
  } = buyer;

  useEffect(() => {
    const retrieverOrderInfo = async () => {
      setLoading(true);

      const [buyerInfo, productsCart] = await Promise.all([
        getBuyerInfo(), getProductsCart(),
      ]);

      // setTimeout(() => setLoading(false), 1000);
      setBuyer(buyerInfo);
      setProduct(productsCart);
      // console.log(productsCart);
      setLoading(false);
    };
    retrieverOrderInfo();
  }, []);

  const checkComplement = () => {
    if (complement) {
      return `COMPLEMENTO: ${complement.toUpperCase()},`;
    }
    return '';
  };

  return (
    <div>
      {
      loading
        ? <Loading />
        : (
          <div className="order-shipped-container">
            <div className="order-shipped">
              <div>
                <div>
                  <h3>ORDER INFO</h3>
                </div>
                {/* <div>
                  <h5>NÚMERO DO PEDIDO</h5>
                  <h5>DATA DA COMPRA</h5>
                </div> */}
                <h4>INFORMAÇÕES PESSOAIS</h4>
                <div className="order-shipped-buyer">
                  <div>
                    <h5>NOME</h5>
                    <hr />
                    <h5>{`${firstname.toUpperCase()}  ${surname.toUpperCase()}`}</h5>
                  </div>
                  <div>
                    <h5>CPF</h5>
                    <hr />
                    <h5>{cpf.replace(/[^0-9]/g, '')}</h5>
                  </div>
                  <div>
                    <h5>EMAIL</h5>
                    <hr />
                    <h5>{email.toUpperCase()}</h5>
                  </div>
                  <div>
                    <h5>TELEFONE</h5>
                    <hr />
                    <h5>{phone.replace(/[^0-9]/g, '')}</h5>
                  </div>
                </div>

                <h4>ENDEREÇO</h4>
                <div className="order-shipped-address">
                  <h5>
                    {
                      `${address.toUpperCase()},
                      NÚMERO: ${number.replace(/[^0-9]/g, '')},
                      ${checkComplement()}
                      MUNICÍPIO: ${city.toUpperCase()},
                      UF: ${state},
                      CEP: ${cep.replace(/[^0-9]/g, '')}`
                    }
                  </h5>
                </div>

                <div className="order-shipped-payment">
                  <h5>MÉTODO DE PAGAMENTO</h5>
                  <hr />
                  <h5>{paymentMethod.toUpperCase()}</h5>
                </div>
              </div>
            </div>

            <div className="lottie">
              <div>
                <h1>Parabéns! Sua compra foi aprovada e seu pedido está indo até você!</h1>
              </div>
              <Lottie
                loop
                animationData={lottieJson}
                play
                speed="1.5"
                style={{ width: 300, height: 300 }}
                // rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
              />
            </div>
          </div>
        )
    }
    </div>
  );
}

export default OrderShipped;
