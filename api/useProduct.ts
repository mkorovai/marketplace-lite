import { useQuery } from '@tanstack/react-query';
import { getProduct } from './products';

export function useProduct(id?: string | string[]) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id as string),
    enabled: !!id, // don’t send a request without an ID
  });
}
