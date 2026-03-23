// base
import React from 'react';

// api
import { useProducts } from '@/api/useProducts';

// hooks
import { useHomeFilters } from '@/hooks/useHomeFilters';
import { useDrawer } from '@/hooks/useDrawer';
import { useFiltersDrawer } from '@/hooks/useFiltersDrawer';

// utils
import { applyFiltersToProducts } from '@/utils/filterProducts';

// components
import ScreenLayout from '@/components/layout/ScreenLayout';
import LoadingState from '@/components/feedback/LoadingState';
import ErrorState from '@/components/feedback/ErrorState';
import ThemedView from '@/components/ui/ThemedView';
import Header from '@/components/home/Header';
import Filters from '@/components/home/Filters';
import ProductList from '@/components/home/ProductList';
import FiltersDrawer from '@/components/home/FiltersDrawer';

const HomeScreen = () => {
  const { data, isLoading, isFetching, error, refetch } = useProducts();
  const { search, setSearch, activeCategory, setActiveCategory, filteredProducts } = useHomeFilters(
    data?.products ?? [],
  );
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const { filters, applyFilters, resetFilters } = useFiltersDrawer();
  const displayedProducts = applyFiltersToProducts(filteredProducts, filters);

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
          activeCategory={activeCategory}
          setSearch={setSearch}
          setActiveCategory={setActiveCategory}
        />
        <Filters count={displayedProducts.length} openDrawer={openDrawer} />
      </ThemedView>
      <ProductList isFetching={isFetching} products={displayedProducts} onRetry={refetch} />
      <FiltersDrawer
        visible={isOpen}
        filters={filters}
        onClose={closeDrawer}
        onApply={applyFilters}
        onReset={resetFilters}
      />
    </ScreenLayout>
  );
};

export default HomeScreen;
