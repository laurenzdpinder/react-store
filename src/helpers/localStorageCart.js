const PRODUCTS_CART_KEY = 'products_cart';

if (!JSON.parse(localStorage.getItem(PRODUCTS_CART_KEY))) {
  localStorage.setItem(PRODUCTS_CART_KEY, JSON.stringify([]));
}

const getItem = () => JSON.parse(localStorage
  .getItem(PRODUCTS_CART_KEY)) || [];

const setItem = (productsCart) => localStorage
  .setItem(PRODUCTS_CART_KEY, JSON.stringify(productsCart));

export const addProduct = (product) => {
  const productsCart = getItem();
  if (!productsCart.some((productCart) => productCart.id === product.id)) {
    setItem([...productsCart, product]);
  } else {
    const productCart = productsCart
      .find((p) => p.id === product.id);
    productCart.quantity += product.quantity;
    setItem([...productsCart]);
  }
};

export const getProductsCart = () => {
  const productsCart = getItem();
  return productsCart;
};

export const getProductsQuantity = () => {
  const productsCart = getItem();
  return productsCart.reduce((acc, { quantity }) => acc + quantity, 0);
};

export const increaseProductQuantity = (id) => {
  const productsCart = getItem();
  const productCart = productsCart.find((p) => p.id === id);
  productCart.quantity += 1;
  setItem([...productsCart]);
};

export const decreaseProductQuantity = (id) => {
  const productsCart = getItem();
  const productCart = productsCart.find((p) => p.id === id);
  if (productCart.quantity > 1) {
    productCart.quantity -= 1;
    setItem([...productsCart]);
  } else {
    let newProductsCart = getItem();
    newProductsCart = productsCart.filter((p) => p.id !== id);
    setItem([...newProductsCart]);
  }
};

export const removeProduct = (id) => {
  let productsCart = getItem();
  productsCart = productsCart.filter((productCart) => productCart.id !== id);
  setItem([...productsCart]);
};
