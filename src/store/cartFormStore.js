import { create } from 'zustand';

const initialFormData = {
	sales_channel: '',
	isKiosk: false,
	kioskId: '',
	kiosk_name: '',
	influencerId: '',
	coupon: '',
	payment_method: '',
	customer: {
		name: '',
		document: '',
		email: '',
		phone: '',
	},
	address: {
		zip_code: '',
		city: '',
		state: '',
		neighborhood: '',
		line_1: '',
		number: '',
		complement: '',
	},
	credit_card: {
		cardName: '',
		cardNumber: '',
		cvv: '',
		expiration: '',
		installments: '',
	},
	items: [],
};

const useCartFormStore = create((set) => ({
	formData: initialFormData,
	setFormData: (update) =>
		set((state) => ({
			formData: {
				...state.formData,
				...update,
			},
		})),
	resetFormData: () => set({ formData: initialFormData }),
}));

export default useCartFormStore;
