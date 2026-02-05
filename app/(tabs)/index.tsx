// base
import React from 'react';

// components
import ScreenLayout from '@/components/layout/ScreenLayout';
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import Header from '@/components/home/Header';
import Filters from '@/components/home/Filters';
import ProductList from '@/components/home/ProductList';

// hooks
import { useProducts } from '@/api/useProducts';
import { useHomeFilters } from '@/hooks/useHomeFilters';

export default function HomeScreen() {
  const { data, isLoading, error } = useProducts();
  const { search, setSearch, category, setCategory, filteredProducts } = useHomeFilters(
    data?.products ?? [],
  );

  if (isLoading) {
    return (
      <ScreenLayout>
        <ThemedText>Loading...</ThemedText>
      </ScreenLayout>
    );
  }

  if (error) {
    return (
      <ScreenLayout>
        <ThemedText>Something went wrong</ThemedText>
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
