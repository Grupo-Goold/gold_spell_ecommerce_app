import { create } from 'zustand';

const initialFreightData = {
	freightData: {
		codeService: [],
		deadline: '',
		price: 'R$ 0,00',
		priceNumber: 0,
		services: 'R$ 0,00',
	},
};

const useFreightStore = create((set) => ({
	...initialFreightData,
	setFreightData: (update) =>
		set(() => ({
			freightData: update,
		})),
	resetFreightData: () => set({ ...initialFreightData }),
}));

export default useFreightStore;
