const getTotalPrice = (products) => {
  const totalPrice = products.map(({ price, quantity }) => price * quantity)
    .reduce((acc, cur) => acc + cur, 0);
  return `R$ ${totalPrice.toFixed(2)}`;
};

export default getTotalPrice;
