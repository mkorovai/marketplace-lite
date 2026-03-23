// base
import React from 'react';

// react-native
import { StyleSheet, Pressable, type ViewStyle } from 'react-native';

// components
import ProductCard from '@/components/product/ProductCard';

// types
import { Product } from '@/types/product';

type Props = {
  product: Product;
  onPress: () => void;
};

const ProductListItem = ({ product, onPress }: Props) => {
  return (
    <Pressable style={styles.pressable as ViewStyle} onPress={onPress}>
      <ProductCard product={product} />
    </Pressable>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
});
