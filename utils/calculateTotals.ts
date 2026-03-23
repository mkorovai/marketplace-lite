// hooks
import { getDiscountedPrice } from '@/utils/getDiscountedPrice';

// types
import { CartItem } from '@/types/cart';

export const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items
    .reduce((sum, item) => {
      const price = item.discountPercentage
        ? getDiscountedPrice(item.price, item.discountPercentage)
        : item.price;

      return sum + price * item.quantity;
    }, 0)
    .toFixed(2);

  return { totalItems, totalPrice };
};
