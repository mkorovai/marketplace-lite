// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, ScrollView, Pressable } from 'react-native';

// expo
import { useLocalSearchParams } from 'expo-router';

// zustand
import { useShallow } from 'zustand/react/shallow';

// hooks
import { useProduct } from '@/api/useProduct';
import { useCartStore } from '@/store/useCartStore';

// components
import ProductScreenLayout from '@/components/layout/ProductScreenLayout';
import LoadingState from '@/components/feedback/LoadingState';
import ErrorState from '@/components/feedback/ErrorState';
import ProductImage from '@/components/product/ProductCard/ProductImage';
import ProductInfo from '@/components/product/ProductCard/ProductInfo';
import Divider from '@/components/ui/Divider';
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error, refetch } = useProduct(id);
  const { items, addItem } = useCartStore(
    useShallow((state) => ({ items: state.items, addItem: state.addItem })),
  );

  const handleAddItem = () => {
    if (!data) return;
    addItem(data);
  };

  // check the work of zustand
  console.log('items > ', items);

  if (isLoading) {
    return (
      <ProductScreenLayout>
        <LoadingState />
      </ProductScreenLayout>
    );
  }

  if (error || !data) {
    return (
      <ProductScreenLayout>
        <ErrorState onRetry={refetch} />
      </ProductScreenLayout>
    );
  }

  const {
    title,
    category,
    price,
    discountPercentage = 0,
    reviews = [],
    thumbnail,
    description,
  } = data;

  return (
    <ProductScreenLayout padded={false}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ProductImage
          thumbnail={thumbnail}
          discountPercentage={discountPercentage}
          styles={{
            image: styles.customImage,
          }}
        />
        <ProductInfo
          title={title}
          category={category}
          price={price}
          discountPercentage={discountPercentage}
          reviews={reviews}
          content={
            <>
              <Divider />
              <ThemedView>
                <ThemedText type="defaultSemiBold">Description</ThemedText>
                <ThemedText type="default">{description}</ThemedText>
              </ThemedView>
              <Divider />
              <Pressable style={styles.cartButton as ViewStyle} onPress={handleAddItem}>
                <IconSymbol
                  name="shopping.cart.fill"
                  size={18}
                  color="#fff"
                  style={styles.shoppingCartIcon}
                />
                <ThemedText type="default" style={styles.cartButtonText}>
                  Add to Cart - ${price.toFixed(2)}
                </ThemedText>
              </Pressable>
            </>
          }
        />
      </ScrollView>
    </ProductScreenLayout>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  customImage: {
    height: 280,
  },
  cartButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0F172A',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#0F172A',
  },
  shoppingCartIcon: {
    paddingRight: 6,
  },
  cartButtonText: {
    color: '#fff',
  },
});
