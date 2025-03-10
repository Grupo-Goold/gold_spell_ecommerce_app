import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";

const useCartStore = create()(
	persist(
		(set, get) => ({
			productsInCart: [],
			count: 1,
			coupon: null,
			totalCart: 0,

			increase: () =>
				set((state) => (state.count < 3 ? { count: state.count + 1 } : state)),
			decrease: () =>
				set((state) => (state.count > 1 ? { count: state.count - 1 } : state)),
			resetCount: () => set({ count: 1 }),

			updateTotalPrice: () => {
				const total = get().productsInCart.reduce(
					(total, item) => total + item.discountPrice * item.quantity,
					0,
				);
				set({ totalCart: total });
			},

			addItem: (newItem) => {
				set((state) => {
					const itemExistente = state.productsInCart.find(
						(productsInCart) => productsInCart.id === newItem.id,
					);
					const totalitems = state.productsInCart.reduce(
						(total) => total + state.count,
						0,
					);

					if (totalitems + state.count > 9) {
						Toast.show({
							type: 'erroToast',
							text1: 'Maximo 9 produtos por compra.',
							visibilityTime: 3000,
						});
						return state;
					}

					let newItems;
					if (itemExistente) {
						if (itemExistente.quantity + state.count > 3) {
							Toast.show({
								type: 'erroToast',
								text1: 'Máximo de 3 unidades',
								visibilityTime: 3000,
							});
							return state;
						}
						newItems = state.productsInCart.map((item) =>
							item.id === newItem.id
								? { ...item, quantity: item.quantity + state.count }
								: item,
						);
					} else {
						const discountPrice =
							state.coupon &&
							state.coupon.products.some((product) => product.id === newItem.id)
								? newItem.price * (1 - state.coupon.discount / 100)
								: newItem.price;

						newItems = [
							...state.productsInCart,
							{ ...newItem, quantity: state.count, discountPrice },
						];
					}

					return { productsInCart: newItems, count: 1 };
				});
				get().updateTotalPrice();
			},

			removeItem: (id) => {
				set((state) => ({
					productsInCart: state.productsInCart
						.map((item) =>
							item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
						)
						.filter((item) => item.quantity > 0),
				}));
				get().updateTotalPrice();
			},

			resetCart: () =>
				set(() => ({
					productsInCart: [],
					count: 1,
					coupon: null,
					totalPrice: 0,
				})),

			applyCoupon: (coupon) => {
				set((state) => {
					const updatedProducts = state.productsInCart.map((product) => {
						if (!coupon) {
							return {
								...product,
								discountPrice: product.price,
							};
						}

						const isProductInCoupon = coupon.products.some(
							(couponProduct) => couponProduct.id === product.id,
						);

						const discountPrice = isProductInCoupon
							? product.price * (1 - coupon.discount / 100)
							: product.price;

						return {
							...product,
							discountPrice,
						};
					});

					return { coupon, productsInCart: updatedProducts };
				});
				get().updateTotalPrice();
			},

			removeCoupon: () => {
				set((state) => ({
					coupon: null,
					productsInCart: state.productsInCart.map((product) => ({
						...product,
						discountPrice: product.price,
					})),
				}));
				get().updateTotalPrice();
			},
		}),
		{
			name: '@itemsInCart',
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state) => ({
				productsInCart: state.productsInCart,
				totalCart: state.totalCart,
			}),
		},
	),
);

export default useCartStore;
