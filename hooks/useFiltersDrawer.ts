// base
import { useState, useCallback } from 'react';

// constants
import { DEFAULT_FILTER_STATE } from '@/constants/filters';

// types
import { FilterState } from '@/types/filters';

export const useFiltersDrawer = () => {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);

  const applyFilters = useCallback((newFilters: FilterState) => setFilters(newFilters), []);
  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTER_STATE), []);

  return { filters, applyFilters, resetFilters };
};
