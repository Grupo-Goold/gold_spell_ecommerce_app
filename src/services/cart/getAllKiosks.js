import { apiBackOffice } from "../api";

export const getAllKiosks = async ({ setKiosks }) => {
    try {
      const { data } = await apiBackOffice.get("/kiosks");

      setKiosks(data);
    } catch (error) {
      let mensagemErro = "Ocorreu um erro ao buscar os quiosques.";

      if (error.response && error.response.data) {
        mensagemErro = error.response.data.message;
      }

      console.log(mensagemErro);
    }
  };
