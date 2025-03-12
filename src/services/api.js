import axios from "axios";

export const api = axios.create({
  // baseURL: "http://192.168.1.6:8080", // localhost
  baseURL: "https://goldspell-ecommerce-api-dcluz.ondigitalocean.app/",
  timeout: 3000,
});

export const apiBackOffice = axios.create({
	// baseURL: "http://localhost:8083",
	baseURL: 'https://backoffice-api-tsjvi.ondigitalocean.app/',
	timeout: 30000,
});

export const apiOrders = axios.create({
  // baseURL: "http://192.168.1.5:8084",
  baseURL: "https://goldspell-checkout-api-iya2c.ondigitalocean.app/",
  timeout: 3000,
});
