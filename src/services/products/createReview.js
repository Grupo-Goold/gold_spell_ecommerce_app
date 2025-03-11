import { apiBackOffice } from "../api";

export const createReview = async (productId, data) => {
    try {
      await apiBackOffice.post(`/reviews/${productId}`, data);

      return true;
    } catch (error) {
      console.log(error);
    }
  };
