import * as SecureStore from "expo-secure-store";

// Token gerado após o login do Customer
export const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};

export const formatPrice = (price) => {
  return price.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export const truncateString = (str, num) => {
  console.log(str, "STRING");

  if (!str) return "";

  if (str && str.length <= num) {
    return str;
  }
  return str.substring(0, num) + "...";
};
