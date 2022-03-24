const PRODUCTS_CART_KEY = 'products_cart';
const LOGIN = 'login';

if (!JSON.parse(localStorage.getItem(PRODUCTS_CART_KEY))) {
  localStorage.setItem(PRODUCTS_CART_KEY, JSON.stringify([]));
}

if (!JSON.parse(localStorage.getItem(LOGIN))) {
  localStorage.setItem(LOGIN, JSON.stringify(''));
}

const getItem = (key) => JSON.parse(localStorage
  .getItem(key)) || [];

const setItem = (key, productsCart) => localStorage
  .setItem(key, JSON.stringify(productsCart));

export const addUsername = (username) => {
  setItem(LOGIN, username);
};

export const getUsername = () => {
  const login = getItem(LOGIN);
  return login;
};

export const addProduct = (product) => {
  const productsCart = getItem(PRODUCTS_CART_KEY);
  if (!productsCart.some((productCart) => productCart.id === product.id)) {
    setItem(PRODUCTS_CART_KEY, [...productsCart, product]);
  } else {
    const productCart = productsCart
      .find((p) => p.id === product.id);
    productCart.quantity += product.quantity;
    setItem(PRODUCTS_CART_KEY, [...productsCart]);
  }
};

export const getProductsCart = () => {
  const productsCart = getItem(PRODUCTS_CART_KEY);
  return productsCart;
};

export const getProductsQuantity = () => {
  const productsCart = getItem(PRODUCTS_CART_KEY);
  return productsCart.reduce((acc, { quantity }) => acc + quantity, 0);
};

export const increaseProductQuantity = (id) => {
  const productsCart = getItem(PRODUCTS_CART_KEY);
  const productCart = productsCart.find((p) => p.id === id);
  productCart.quantity += 1;
  setItem(PRODUCTS_CART_KEY, [...productsCart]);
};

export const decreaseProductQuantity = (id) => {
  const productsCart = getItem(PRODUCTS_CART_KEY);
  const productCart = productsCart.find((p) => p.id === id);
  if (productCart.quantity > 1) {
    productCart.quantity -= 1;
    setItem(PRODUCTS_CART_KEY, [...productsCart]);
  } else {
    let newProductsCart = getItem(PRODUCTS_CART_KEY);
    newProductsCart = productsCart.filter((p) => p.id !== id);
    setItem(PRODUCTS_CART_KEY, [...newProductsCart]);
  }
};

export const removeProduct = (id) => {
  let productsCart = getItem(PRODUCTS_CART_KEY);
  productsCart = productsCart.filter((productCart) => productCart.id !== id);
  setItem(PRODUCTS_CART_KEY, [...productsCart]);
};
