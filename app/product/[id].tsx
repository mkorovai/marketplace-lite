// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, ScrollView, Pressable } from 'react-native';

// expo
import { useLocalSearchParams } from 'expo-router';

// zustand
import { useShallow } from 'zustand/react/shallow';

// api
import { useProduct } from '@/api/useProduct';

// store
import { useCartStore, CartState } from '@/store/useCartStore';

// hooks
import { useDiscountedPrice } from '@/hooks/useDiscountedPrice';
import { useCartIcon } from '@/hooks/useCartIcon';

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
    useShallow((state: CartState) => ({ items: state.items, addItem: state.addItem })),
  );

  const newPrice = useDiscountedPrice(data?.price ?? 0, data?.discountPercentage ?? 0);
  const isInCart = !!data && items.some((item) => item.id === data.id);
  const iconName = useCartIcon(isInCart);

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

  const { discountPercentage = 0, thumbnail, description } = data;
  const cartButtonText = isInCart ? 'In the Cart' : `Add to Cart - ${newPrice.toFixed(2)}`;

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
          product={data}
          content={
            <>
              <Divider />
              <ThemedView>
                <ThemedText type="defaultSemiBold">Description</ThemedText>
                <ThemedText type="default">{description}</ThemedText>
              </ThemedView>
              <Divider />
              <Pressable
                style={[styles.cartButton, isInCart && styles.cartButtonInCart] as ViewStyle}
                onPress={handleAddItem}
              >
                <IconSymbol
                  name={iconName}
                  size={18}
                  color="#fff"
                  style={styles.shoppingCartIcon}
                />
                <ThemedText
                  type="default"
                  style={[styles.cartButtonText, isInCart && styles.cartButtonTextInCart]}
                >
                  {cartButtonText}
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
  cartButtonInCart: {
    borderColor: '#16A34A',
    backgroundColor: '#16A34A',
  },
  shoppingCartIcon: {
    paddingRight: 6,
  },
  cartButtonText: {
    color: '#fff',
  },
  cartButtonTextInCart: {
    fontWeight: '600',
  },
});
