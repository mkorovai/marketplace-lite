// base
import React from 'react';

// react-native
import { StyleSheet, Image, type ViewStyle, type TextStyle, type ImageStyle } from 'react-native';

// hooks
import { getDiscountedPrice } from '@/utils/getDiscountedPrice';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

// types
import { CartItem } from '@/types/cart';

type Props = {
  data: CartItem;
};

const CheckoutItem = ({ data }: Props) => {
  const newPrice = getDiscountedPrice(data.price, data.discountPercentage ?? 0);

  return (
    <ThemedView style={styles.root}>
      <Image style={styles.image} source={{ uri: data.thumbnail }} />
      <ThemedView style={{ width: 320 }}>
        <ThemedText numberOfLines={2} type="defaultSemiBold">
          {data.title}
        </ThemedText>
        <ThemedText>
          {data.quantity} × ${newPrice}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export default CheckoutItem;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 50,
    height: 50,
  },
});
