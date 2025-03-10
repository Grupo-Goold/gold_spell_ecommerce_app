import { createContext, useContext, useState } from "react";
import api from "../../services/api";

const InstagramContext = createContext();

export const InstagramProvider = ({ children }) => {
  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    try {
      const response = await api.get("/stories");

      setStories(response.data);
    } catch (error) {
      console.log("ERRO AO OBTER STORIES", error);
    }
  };

  return (
    <InstagramContext.Provider value={{ fetchStories, stories }}>
      {children}
    </InstagramContext.Provider>
  );
};

export const UseInstagramContextHook = () => {
  const context = useContext(InstagramContext);
  if (!context) {
    throw new Error(
      "useInstagramContext must be used within an InstagramProvider"
    );
  }
  return context;
};
