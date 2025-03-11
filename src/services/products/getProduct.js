import api from "../api";

export async function getProduct(id) {
	try {
		const response = await api.get(`/products/byId?id=${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}
