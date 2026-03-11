// types
import { FilterState } from '@/types/filters';

export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'rating_desc', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

export const PRICE_PRESETS = [
  { label: 'Under $25', range: { min: 0, max: 25 } },
  { label: '$25 – $50', range: { min: 25, max: 50 } },
  { label: '$50 – $100', range: { min: 50, max: 100 } },
  { label: '$100 – $250', range: { min: 100, max: 250 } },
  { label: '$250+', range: { min: 250, max: 9999 } },
];

export const RATING_OPTIONS = [4, 3, 2];

export const DEFAULT_FILTER_STATE: FilterState = {
  sortBy: 'default',
  priceRange: { min: 0, max: 1000 },
  minRating: null,
  inStockOnly: false,
};
