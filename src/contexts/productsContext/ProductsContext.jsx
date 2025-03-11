import React, { createContext, useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { api } from "../../services/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [newReview, setNewReview] = useState(false);

  const createReviews = async (
    productId,
    data,
    setModalVisible,
    navigation,
    setNewReview
  ) => {
    try {
      await api.post(`/reviews/${productId}`, data);
      setModalVisible(false);
      setNewReview((elm) => !elm);
      navigation.navigate("InitialScreen");
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

  return (
    <ProductContext.Provider
      value={{
        createReviews,
        newReview,
        setNewReview,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContextHook = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContextHook must be used within a ProductProvider"
    );
  }
  return context;
};
