// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Pressable } from 'react-native';

// hooks
import { useDiscountedPrice } from '@/hooks/useDiscountedPrice';
import { useCartIcon } from '@/hooks/useCartIcon';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';

type Props = {
  isInCart: boolean;
  price: number;
  discountPercentage: number;
  onPress: () => void;
};

export default function StickyCTA(props: Props) {
  const { isInCart, price, discountPercentage, onPress } = props;

  const iconName = useCartIcon(isInCart);
  const newPrice = useDiscountedPrice(price, discountPercentage);
  const cartButtonText = isInCart ? 'In the Cart' : `Add to Cart - ${newPrice.toFixed(2)}`;

  return (
    <ThemedView style={styles.root}>
      <Pressable
        style={[styles.cartButton, isInCart && styles.cartButtonInCart] as ViewStyle}
        onPress={onPress}
      >
        <IconSymbol name={iconName} size={18} color="#fff" style={styles.shoppingCartIcon} />
        <ThemedText
          type="default"
          style={[styles.cartButtonText, isInCart && styles.cartButtonTextInCart]}
        >
          {cartButtonText}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#E5E5EA',
    padding: 16,
    backgroundColor: '#fff',
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
