import { createContext, useContext } from "react";
import api from "../../services/api";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const fetchAllCategories = async () => {
    try {
      const response = await api.get("/categories");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoriesContext.Provider value={{ fetchAllCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContextHook = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error(
      "useCategoriesContextHook must be used within a ProductProvider"
    );
  }
  return context;
};
