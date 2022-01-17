export const getCategories = async () => {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const categories = await fetch(URL)
    .then((response) => response.json());
  return categories;
}