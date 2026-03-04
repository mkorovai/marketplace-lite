// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Image } from 'react-native';

// hooks
import { useDiscountedPrice } from '@/hooks/useDiscountedPrice';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

// types
import { CartItem } from '@/types/cart';

type Props = {
  data: CartItem;
};

export default function CheckoutItem({ data }: Props) {
  const newPrice = useDiscountedPrice(data.price, data.discountPercentage ?? 0);

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
}

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
