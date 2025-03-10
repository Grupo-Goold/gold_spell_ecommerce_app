import { apiOrders } from "../api";
import Toast from "react-native-toast-message";

export const getReturnRequestsByDocument = async ({ document, setIsLoading, setReturnRequests }) => {
    try {
      setIsLoading(true);

      const response = await apiOrders.get(
        `/orders/document?document=${document}`
      );

      if (!response.data) {
        Toast.show({
          type: "erroToast",
          text1: "Erro",
          text2: "Nenhum pedido encontrado.",
          visibilityTime: 3000,
        });
      }

      setReturnRequests(response.data);
    } catch (error) {
      return Toast.show({
        type: "erroToast",
        text1: "Erro",
        text2: error.response.data.message,
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };
