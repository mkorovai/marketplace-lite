// types
import { FilterState } from '@/types/filters';

type ApplyFiltersToProducts = <T extends { price: number; rating: number }>(
  products: T[],
  filters: FilterState,
) => T[];

export const applyFiltersToProducts: ApplyFiltersToProducts = (products, filters) => {
  let result = [...products];

  // Price range
  result = result.filter(
    (item) => item.price >= filters.priceRange.min && item.price <= filters.priceRange.max,
  );

  // Min rating
  if (filters.minRating !== null)
    result = result.filter((item) => item.rating >= filters.minRating!);

  // Sort
  switch (filters.sortBy) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating_desc':
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return result;
};
