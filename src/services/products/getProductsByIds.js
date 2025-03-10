import api from "../api";

export const getProductsByIds = async (productsIds) => {
    try {
      const queryString = productsIds
        .map((id) => `id=${encodeURIComponent(id)}`)
        .join("&");
      const response = await api.get(`/products/cart/?${queryString}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
}
