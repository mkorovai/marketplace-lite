// base
import React from 'react';

// react-native
import { FlatList, RefreshControl } from 'react-native';

// expo
import { useRouter } from 'expo-router';

// components
import EmptyState from '@/components/ui/EmptyState';
import ProductListItem from '@/components/home/ProductList/ProductListItem';

// types
import { Product } from '@/types/product';

type Props = {
  isFetching: boolean;
  products: Product[];
  onRetry?: () => void;
};

const ProductList = ({ isFetching, products, onRetry }: Props) => {
  const router = useRouter();

  const handlePress = (id: number) => () => {
    router.push({ pathname: '/product/[id]', params: { id } });
  };

  if (!products.length) {
    return <EmptyState title="No products found" description="Try another search" />;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ gap: 16 }}
      contentContainerStyle={{ gap: 16, padding: 16 }}
      /* TODO check if there is a patch for react-native types */
      renderItem={({ item }) => <ProductListItem product={item} onPress={handlePress(item.id)} />}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={onRetry} />}
    />
  );
};

export default ProductList;
