// react-native
import AsyncStorage from '@react-native-async-storage/async-storage';

// expo

// zustand
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// types
import { AuthState, User } from '@/types/auth';

interface AuthStore extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
  _hasHydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      login: (user: User, token: string) => {
        console.log('Logging in | Store', { user, token });
        set({
          user,
          token,
        });
      },
      logout: () => set(initialState),
      _hasHydrated: false,
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
        }
      },
    },
  ),
);
