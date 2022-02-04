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

export const increaseProductQuantity = (id) => {
  const productsCart = getItem();
  const productCart = productsCart.find((productCart) => productCart.id === id )
  productCart.quantity += 1;
  setItem([...productsCart]);
}

export const decreaseProductQuantity = (id) => {
  const productsCart = getItem();
  const productCart = productsCart.find((productCart) => productCart.id === id )
  if(productCart.quantity > 1) {
    productCart.quantity -= 1;
    setItem([...productsCart]);
  } else {
    let productsCart = getItem();
    productsCart = productsCart.filter((productCart) => productCart.id !== id );
    setItem([...productsCart]);
  }
}

export const removeProduct = (id) => {
  let productsCart = getItem();
  productsCart = productsCart.filter((productCart) => productCart.id !== id );
  setItem([...productsCart]);
}
