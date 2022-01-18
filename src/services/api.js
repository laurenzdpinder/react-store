export const getCategories = async () => {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const categories = await fetch(URL)
    .then((response) => response.json());
  return categories;
}

export const getProductsFromCategoryAndQuery = async (categoryId, query) => {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const { results } = await fetch(URL)
    .then((response) => response.json());
  return results;
}