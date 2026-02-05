// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, Pressable, FlatList } from 'react-native';

// expo
import { useRouter } from 'expo-router';

// components
import ProductCard from '@/components/product/ProductCard';

// types
import { Product } from '@/types/product';

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  const router = useRouter();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ gap: 16 }}
      contentContainerStyle={{ gap: 16, padding: 16 }}
      renderItem={({ item }) => (
        <Pressable
          style={styles.pressable as ViewStyle}
          onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
        >
          <ProductCard product={item} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
});
