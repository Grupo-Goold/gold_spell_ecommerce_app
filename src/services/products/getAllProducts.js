import api from "../api";

export const getAllProducts = async () => {
    try {
      const response = await api.get("/products/reviews");

      return response.data;
    } catch (error) {
      console.log(error);
    }
}
