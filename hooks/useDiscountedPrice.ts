export const useDiscountedPrice = (price: number, discountPercent: number) => {
  return Number((price * (1 - discountPercent / 100)).toFixed(2));
}
