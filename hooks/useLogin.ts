// react-query
import { useMutation } from '@tanstack/react-query';

// expo
import { router } from 'expo-router';

// store
import { useAuthStore } from '@/store/useAuthStore';

// hooks
import { loginRequest } from '@/api/auth';

// types
import { LoginCredentials } from '@/types/auth';

export function useLogin() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginRequest(credentials),
    onSuccess: (response) => {
      login(
        {
          id: response.id,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          username: response.username,
          gender: response.gender,
          image: response.image,
        },
        response.accessToken,
      );
      router.replace('/(tabs)');
    },
  });
}
