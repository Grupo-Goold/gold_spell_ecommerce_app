import { createContext, useContext, useState } from "react";
import { apiOrders } from "../../services/api";
import Toast from "react-native-toast-message";

export const OrderTrackingContext = createContext();

export const OrderTrackingProvider = ({ children }) => {
  const [shipments, setShipments] = useState([]);

  const getShipmentsByDocument = async ({ document, setIsLoading }) => {
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

      setShipments(response.data);
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

  return (
    <OrderTrackingContext.Provider
      value={{
        shipments,
        getShipmentsByDocument,
      }}
    >
      {children}
    </OrderTrackingContext.Provider>
  );
};

export const useOrderTrackingContextHook = () => {
  const context = useContext(OrderTrackingContext);
  if (!context) {
    throw new Error(
      "useOrderTrackingContextHook must be used within a ProductProvider"
    );
  }
  return context;
};
