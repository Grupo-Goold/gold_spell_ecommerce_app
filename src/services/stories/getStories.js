import api from "../api";

export const getStories = async () => {
    try {
      const response = await api.get("/stories");

      return response.data;
    } catch (error) {
      console.log("ERRO AO OBTER STORIES", error);
    }
};
