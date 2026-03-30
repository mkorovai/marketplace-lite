// base
import { useEffect } from 'react';

// expo
import { router } from 'expo-router';

// store
import { useAuthStore } from '@/store/useAuthStore';

/**
 * Protects a route by redirecting to login if user is not authenticated
 * Use this hook in screens that require authentication
 */
export function useProtectedRoute(): void {
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    // waiting for hydration
    if (!_hasHydrated) return;

    // checking access
    if (!token) {
      router.replace('/(auth)/login');
    }
  }, [_hasHydrated, token]);
}
