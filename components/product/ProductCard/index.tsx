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
  const { title, category, price, discountPercentage = 0, reviews = [], thumbnail } = product;

  return (
    <ThemedView style={styles.root}>
      <ProductImage showFavorite thumbnail={thumbnail} discountPercentage={discountPercentage} />
      <ProductInfo
        showCartButton
        title={title}
        category={category}
        price={price}
        discountPercentage={discountPercentage}
        reviews={reviews}
      />
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
