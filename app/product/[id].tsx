// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, TextStyle, ScrollView, Pressable } from 'react-native';

// expo
import { useLocalSearchParams } from 'expo-router';

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

// hooks
import { useProduct } from '@/api/useProduct';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error, refetch } = useProduct(id);

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
              <Pressable style={styles.cartButton as ViewStyle}>
                <IconSymbol
                  name="shopping.cart.fill"
                  size={18}
                  color="#fff"
                  style={styles.shoppingCartIcon}
                />
                <ThemedText type="default" style={styles.cartButtonText as TextStyle}>
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

const styles = StyleSheet.create({
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
