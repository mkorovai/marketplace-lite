// react-native
import AsyncStorage from '@react-native-async-storage/async-storage';

// zustand
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// utils
import { calculateTotals } from '@/store/cart.utils';

// types
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';

export type CartState = {
  items: CartItem[];

  totalItems: number;
  totalPrice: number;

  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
};

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          const updateItems = existing
            ? state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              )
            : [...state.items, { ...product, quantity: 1 }];

          return {
            items: updateItems,
            ...calculateTotals(updateItems),
          };
        });
      },

      removeItem: (id) => {
        set((state) => {
          const updateItems = state.items.filter((item) => item.id !== id);

          return {
            items: updateItems,
            ...calculateTotals(updateItems),
          };
        });
      },

      increment: (id) => {
        set((state) => {
          const updateItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          );

          return {
            items: updateItems,
            ...calculateTotals(updateItems),
          };
        });
      },

      decrement: (id) => {
        set((state) => {
          const updateItems = state.items
            .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
            .filter((item) => item.quantity > 0);

          return {
            items: updateItems,
            ...calculateTotals(updateItems),
          };
        });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    },
  ),
);
