import React, { createContext, useState, useContext, useCallback } from "react";
import api from "../../services/api";
import Toast from "react-native-toast-message";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productQuantities, setProductQuantities] = useState({});
  const [selectedProduct, setSelectedProduct] = useState();
  const [newReview, setNewReview] = useState(false);

  const fetchProductsForHomePage = useCallback(async () => {
    try {
      const response = await api.get("/products/reviews");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Recupera produtos por ID. Aceita um array de IDs.
  const fetchProductsByIdByParams = useCallback(async (productsIds) => {
    try {
      console.log(productsIds);
      const queryString = productsIds
        .map((id) => `id=${encodeURIComponent(id)}`)
        .join("&");
      const response = await api.get(`/products/cart/?${queryString}`);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateProductQuantity = (productId, quantity) => {
    setProductQuantities((prevProductAmount) => ({
      ...prevProductAmount,
      [productId]: quantity,
    }));
  };

  const handlePlusClick = (productId, quantity) => {
    if (quantity == 3) {
      return Toast.show({
        type: "erroToast",
        text1: "Limite excedido",
        text2: "É permitido apenas 3 itens iguais por compra",
        visibilityTime: 3000,
      });
    }

    const newQuantity = quantity + 1;

    updateProductQuantity(productId, newQuantity);
  };

  const handleMinusClick = (productId, quantity) => {
    if (quantity == 0) {
      // updateCartQuantity(productId, 0);
      return updateProductQuantity(productId, 0);
    }

    const newQuantity = quantity - 1;
    updateProductQuantity(productId, newQuantity);
  };

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
        productQuantities,
        selectedProduct,
        setSelectedProduct,
        updateProductQuantity,
        handlePlusClick,
        handleMinusClick,
        fetchProductsForHomePage,
        fetchProductsByIdByParams,
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
