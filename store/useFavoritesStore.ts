// react-native
import AsyncStorage from '@react-native-async-storage/async-storage';

// zustand
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type FavoritesState = {
  ids: number[];
  toggle: (id: number) => void;
};

export const useFavoritesStore = create(
  persist<FavoritesState>(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids.filter((i) => i !== id) : [...state.ids, id],
        })),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
