const PRODUCTS_CART_KEY = 'products_cart';

if(!JSON.parse(localStorage.getItem(PRODUCTS_CART_KEY))) {
  localStorage.setItem(PRODUCTS_CART_KEY, JSON.stringify([]));
}

const getItem = () => JSON.parse(localStorage
  .getItem(PRODUCTS_CART_KEY)) || [];

const setItem =(productsCart) => localStorage
  .setItem(PRODUCTS_CART_KEY, JSON.stringify(productsCart));

export const addProduct = (product) => {
  const productsCart = getItem();
  if(!productsCart.some((productCart) => productCart.id === product.id)) {
    product.quantity = Number(product.quantity)
    setItem([...productsCart, product]);
  }
  else {
    const productCart = productsCart
      .find((productCart) => productCart.id === product.id);
    productCart.quantity += Number(product.quantity);
    setItem([...productsCart]);
  }
}

export const getProductsCart = () => {
  const productsCart = getItem();
  return productsCart;
}

export const getProductsQuantity = () => {
  const productsCart = getItem();
  return productsCart.reduce((acc, { quantity }) => acc + quantity, 0);
}
