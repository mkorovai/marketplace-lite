export type Category = 'all' | 'beauty' | 'fragrances' | 'furniture' | 'groceries';

export type SortOption = 'default' | 'price_asc' | 'price_desc' | 'rating_desc' | 'newest';

export type PriceRange = { min: number; max: number };

export type FilterState = {
  sortBy: SortOption;
  priceRange: PriceRange;
  minRating: number | null;
  inStockOnly: boolean;
};
