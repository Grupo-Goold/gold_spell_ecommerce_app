import api from "../api";

export const createReviews = async (productId, data) => {
    try {
      await api.post(`/reviews/${productId}`, data);
      Toast.show({
        type: "sucessoToast",
        text1: "Sucesso",
        text2: `Review cirada com sucesso!`,
        visibilityTime: 3000,
      });
    } catch (error) {
      console.log(error);
      console.log(error.message);
      Toast.show({
        type: "erroToast",
        text1: "Erro",
        text2: "Não foi possivel fazer uma review",
        visibilityTime: 3000,
      });
    }
  };
