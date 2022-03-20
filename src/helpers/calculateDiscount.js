const calculateDiscount = (quantity, originalPrice, price) => {
  const x = (quantity * originalPrice).toFixed(2);
  const y = (quantity * price).toFixed(2);
  const discount = Math.round(((x - y) * 100) / x);
  return discount;
};

export default calculateDiscount;
