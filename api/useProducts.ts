import { useQuery } from '@tanstack/react-query';
import { getProducts } from './products';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 60 * 1000, // cache time to live
    refetchOnReconnect: true, // auto-refresh when online
    refetchOnWindowFocus: false, // auto-refresh on return (focus)
  });
}
