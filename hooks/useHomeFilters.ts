// react
import { useMemo, useState } from 'react';

// types
import { Product } from '@/types/product';

export function useHomeFilters(products: Product[]) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === 'All' || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return {
    search,
    setSearch,
    category,
    setCategory,
    filteredProducts,
  };
}
