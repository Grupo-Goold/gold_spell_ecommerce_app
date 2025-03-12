import { api } from "../api";

export const getAllProducts = async () => {
    try {
      const response = await api.get("/products");

      return response.data;
    } catch (error) {
      console.log(error);
    }
}
