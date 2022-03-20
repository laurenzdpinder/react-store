const getTotalOriginalPrice = (products) => {
  const totalOriginalPrice = products
    .map(({ originalPrice, price, quantity }) => {
      if (originalPrice) {
        return originalPrice * quantity;
      }
      return price * quantity;
    }).reduce((acc, cur) => acc + cur, 0);
  return totalOriginalPrice.toFixed(2);
};

export default getTotalOriginalPrice;
