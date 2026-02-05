// base
import React from 'react';

// components
import ScreenLayout from '@/components/layout/ScreenLayout';
import LoadingState from '@/components/feedback/LoadingState';
import ErrorState from '@/components/feedback/ErrorState';
import ThemedView from '@/components/ui/ThemedView';
import Header from '@/components/home/Header';
import Filters from '@/components/home/Filters';
import ProductList from '@/components/home/ProductList';

// hooks
import { useProducts } from '@/api/useProducts';
import { useHomeFilters } from '@/hooks/useHomeFilters';

export default function HomeScreen() {
  const { data, isLoading, error, refetch } = useProducts();
  const { search, setSearch, category, setCategory, filteredProducts } = useHomeFilters(
    data?.products ?? [],
  );

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingState />
      </ScreenLayout>
    );
  }

  if (error) {
    return (
      <ScreenLayout>
        <ErrorState onRetry={refetch} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout padded={false}>
      <ThemedView>
        <Header
          search={search}
          category={category}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
        />
        <Filters count={filteredProducts.length} />
      </ThemedView>
      <ProductList products={filteredProducts} />
    </ScreenLayout>
  );
}
