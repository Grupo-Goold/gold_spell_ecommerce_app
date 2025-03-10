import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFavoritesStore = create()(
	persist(
		(set, get) => ({
			favorites: {},
			toggleFavorite: (productId) => {
				set((state) => {
					const newFavorites = { ...state.favorites };
					if (newFavorites[productId]) {
						delete newFavorites[productId];
					} else {
						newFavorites[productId] = true;
					}
					return { favorites: newFavorites };
				});
			},
			isFavorite: (productId) => !!get().favorites[productId],
		}),
		{
			name: '@favorites',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
