const BASE_URL = 'https://dummyjson.com';

export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}
