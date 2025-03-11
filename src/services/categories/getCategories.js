import { api } from "../api";

export const getCategories = async () => {
    try {
      const response = await api.get("/categories");

      return response.data;
    } catch (error) {
      console.log(error);
    }
};
