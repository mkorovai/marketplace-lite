export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  image: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  image: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
