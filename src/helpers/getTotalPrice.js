const getTotalPrice = (products) => {
  const totalPrice = products.map(({ price, quantity }) => price * quantity)
    .reduce((acc, cur) => acc + cur, 0);
  return totalPrice.toFixed(2);
};

export default getTotalPrice;
