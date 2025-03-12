import { api } from "../api";

export const getHighlights = async () => {
	try {
		const response = await api.get('/highlights');

		return response.data;
	} catch (error) {
		console.log(error);
	}
}
