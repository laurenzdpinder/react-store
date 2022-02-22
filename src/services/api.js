export const getCategories = async () => {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const categories = await fetch(URL)
    .then((response) => response.json());
  return categories;
};

export const getProductsFromCategoryAndQuery = async (categoryId, query, offset) => {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}&offset=${offset}&limit=20`;
  const data = await fetch(URL)
    .then((response) => response.json());
  return data;
};

export const getProductFromId = async (id) => {
  const URL = `https://api.mercadolibre.com/items/${id}`;
  const product = await fetch(URL)
    .then((response) => response.json());
  return product;
};
