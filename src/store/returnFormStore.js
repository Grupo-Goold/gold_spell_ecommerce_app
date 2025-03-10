import { create } from 'zustand';

const useReturnFormStore = create((set) => ({
	returnData: {
		cpf: '',
		order: '',
		mail: '',
		phone: '',
		name: '',
		address: {
			zip_code: '',
			city: '',
			state: '',
			neighborhood: '',
			line_1: '',
			number: '',
			complement: '',
		},
		reason: '',
		quantity: '',
		description: '',
		refundType: '',
		deliveryMethod: '',
	},
	setReturnData: (update) =>
		set((state) => ({
			returnData: {
				...state.returnData,
				...update,
			},
		})),
	resetReturnData: () =>
		set({
			returnData: {
				cpf: '',
				order: '',
				mail: '',
				phone: '',
				name: '',
				address: {
					zip_code: '',
					city: '',
					state: '',
					neighborhood: '',
					line_1: '',
					number: '',
					complement: '',
				},
				reason: '',
				quantity: '',
				description: '',
				refundType: '',
				deliveryMethod: '',
			},
		}),
}));

export default useReturnFormStore;
