// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, ScrollView } from 'react-native';

// expo
import { useLocalSearchParams } from 'expo-router';

// zustand
import { useShallow } from 'zustand/react/shallow';

// api
import { useProduct } from '@/api/useProduct';

// store
import { useCartStore, CartState } from '@/store/useCartStore';

// components
import ProductScreenLayout from '@/components/layout/ProductScreenLayout';
import LoadingState from '@/components/feedback/LoadingState';
import ErrorState from '@/components/feedback/ErrorState';
import ProductImage from '@/components/product/ProductCard/ProductImage';
import ProductInfo from '@/components/product/ProductCard/ProductInfo';
import Divider from '@/components/ui/Divider';
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import StickyCTA from '@/components/product/StickyCTA';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error, refetch } = useProduct(id);
  const { items, addItem } = useCartStore(
    useShallow((state: CartState) => ({ items: state.items, addItem: state.addItem })),
  );

  const isInCart = !!data && items.some((item) => item.id === data.id);

  const handleAddItem = () => {
    if (!data) return;
    addItem(data);
  };

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

  const { price, discountPercentage = 0, thumbnail, description } = data;

  return (
    <ProductScreenLayout padded={false}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 72 }}>
        <ProductImage
          thumbnail={thumbnail}
          discountPercentage={discountPercentage}
          styles={{
            image: styles.customImage,
          }}
        />
        <ProductInfo
          product={data}
          content={
            <>
              <Divider />
              <ThemedView>
                <ThemedText type="defaultSemiBold">Description</ThemedText>
                <ThemedText type="default">{description}</ThemedText>
              </ThemedView>
            </>
          }
        />
      </ScrollView>
      <StickyCTA
        isInCart={isInCart}
        price={price}
        discountPercentage={discountPercentage}
        onPress={handleAddItem}
      />
    </ProductScreenLayout>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  customImage: {
    height: 280,
  },
});
