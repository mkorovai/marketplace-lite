// react
import { useMemo, useState } from 'react';

// types
import { Product } from '@/types/product';
import { Category } from '@/types/filters';

export function useHomeFilters(products: Product[]) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  return {
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    filteredProducts,
  };
}
