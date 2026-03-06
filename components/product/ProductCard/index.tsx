// base
import React from 'react';

// react-native
import { StyleSheet } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ProductImage from '@/components/product/ProductCard/ProductImage';
import ProductInfo from '@/components/product/ProductCard/ProductInfo';

// types
import { Product } from '@/types/product';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { id, title, discountPercentage = 0, thumbnail } = product;

  return (
    <ThemedView style={styles.root}>
      <ProductImage
        showFavorite
        id={id}
        title={title}
        thumbnail={thumbnail}
        discountPercentage={discountPercentage}
      />
      <ProductInfo showCartButton product={product} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 16,
    overflow: 'hidden',
  },
});
