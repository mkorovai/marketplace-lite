// base
import { useMemo } from 'react';

export const useCartIcon = (isInCart: boolean) => {
  return useMemo(() => (isInCart ? 'shopping.cart.checkout' : 'shopping.cart.fill'), [isInCart]);
};
