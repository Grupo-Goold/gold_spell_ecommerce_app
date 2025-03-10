import React, { createContext, useState, useContext, useCallback } from "react";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriteProductsContext = createContext();

export const FavoriteProductsProvider = ({ children }) => {
  const [customerFavorites, setCustomerFavorites] = useState([]);

  const toggleCustomerFavoriteProduct = async (customerId, productId) => {
    try {
      const response = await api.put(
        `/favorites/customer/${customerId}/product/${productId}`
      );

      console.log("toggleCustomerFavoriteProduct RESPONSE", response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getFavoritesByCustomer = useCallback(async (customerId) => {
    try {
      const response = await api.get(`/favorites/customer/${customerId}`);
      setCustomerFavorites(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const totalFavoriteProducts = customerFavorites.length;

  const handleFavorite = async (customerId, productId) => {
    await toggleCustomerFavoriteProduct(customerId, productId);
    await getFavoritesByCustomer(customerId);
  };
  //

  const [favoriteList, setFavoriteList] = useState([]);
  const [favoriteFilter, setFavoriteFilter] = useState([]);

  const getFavorites = async () => {
    const favorites = await AsyncStorage.getItem("favorites");
    setFavoriteList(JSON.parse(favorites));
  };

  const addFavorite = async (id) => {
    const oldFavorites = await AsyncStorage.getItem("favorites");
    const oldFavoritesArray = JSON.parse(oldFavorites);

    if (oldFavoritesArray) {
      const newFavorites = [...oldFavoritesArray, id];
      setFavoriteList(newFavorites);
      AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      setFavoriteList([id]);
      AsyncStorage.setItem("favorites", JSON.stringify([id]));
    }
  };

  const removeFavorite = async (id) => {
    const oldFavorites = await AsyncStorage.getItem("favorites");
    const oldFavoritesArray = JSON.parse(oldFavorites);

    const newFavorites = oldFavoritesArray.filter((item) => {
      return item != id;
    });
    setFavoriteList(newFavorites);
    AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <FavoriteProductsContext.Provider
      value={{
        totalFavoriteProducts,
        toggleCustomerFavoriteProduct,
        getFavoritesByCustomer,
        customerFavorites,
        handleFavorite,
        setCustomerFavorites,
        //
        favoriteList,
        setFavoriteList,
        favoriteFilter,
        setFavoriteFilter,
        getFavorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoriteProductsContext.Provider>
  );
};

export const useFavoriteProductsContextHook = () => {
  const context = useContext(FavoriteProductsContext);
  if (!context) {
    throw new Error(
      "useFavoriteProductsContextHook must be used within a FavoriteProductsProvider"
    );
  }
  return context;
};
