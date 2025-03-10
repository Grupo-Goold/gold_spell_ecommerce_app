import { apiOrders } from "../api";
import Toast from "react-native-toast-message";

export const getShipmentsByDocument = async ({ document, setIsLoading }) => {
    try {
      setIsLoading(true);

      const response = await apiOrders.get(
        `/orders/document?document=${document}`
      );

      console.log(response.data)

      if (!response.data) {
        Toast.show({
          type: "erroToast",
          text1: "Erro",
          text2: "Nenhum pedido encontrado.",
          visibilityTime: 3000,
        });
      }

      return response.data;
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
