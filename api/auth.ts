// API client
import { apiPost } from './client';

// types
import { LoginCredentials, LoginResponse } from '@/types/auth';

const AUTH_ENDPOINTS = { login: '/auth/login' } as const;

export async function loginRequest(credentials: LoginCredentials): Promise<LoginResponse> {
  return apiPost<LoginResponse>(AUTH_ENDPOINTS.login, {
    username: credentials.username,
    password: credentials.password,
  });
}
