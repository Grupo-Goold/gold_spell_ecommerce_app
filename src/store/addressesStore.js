import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAddressesStore = create(
  persist(
    (set) => ({
        addresses: [],
        addAddress: (address) =>
        set((state) => ({
            addresses: [...state.addresses, { ...address, id: Date.now().toString() }],
        })),
        deleteAddress: (id) =>
            set((state) => ({
                addresses: state.addresses.filter((address) => address.id !== id),
            })),
        updateAddress: (id, newAddressData) =>
            set((state) => ({
                addresses: state.addresses.map((address) => 
                address.id === id ? { ...address, ...newAddressData } : address
                ),
            })),
        }),
    {
      name: '@addressesStore',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        addresses: state.addresses,
      }),
    }
  )
);

export default useAddressesStore;