import axios from "axios";

export const api = axios.create({
  // baseURL: "http://192.168.1.6:8080", // localhost
  baseURL: "https://goldspell-ecommerce-backend-api-2bfdc.ondigitalocean.app",
  timeout: 3000,
});

export const apiBackOffice = axios.create({
	// baseURL: "http://localhost:8083",
	baseURL: 'https://goldspell-backoffice-backend-api-3mevm.ondigitalocean.app/',
	timeout: 30000,
});

export const apiOrders = axios.create({
  // baseURL: "http://192.168.1.5:8084",
  baseURL: "https://goldspell-orders-backend-api-t8qlu.ondigitalocean.app",
  timeout: 3000,
});
