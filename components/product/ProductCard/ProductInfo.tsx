// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Pressable } from 'react-native';

// zustand
import { useShallow } from 'zustand/react/shallow';

// store
import { useCartStore, CartState } from '@/store/useCartStore';

// hooks
import { useDiscountedPrice } from '@/hooks/useDiscountedPrice';
import { useCartIcon } from '@/hooks/useCartIcon';

// service
import { showSuccess } from '@/lib/toast/toast';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';

// types
import { Product } from '@/types/product';

type Props = {
  showCartButton?: boolean;
  product: Product;
  content?: React.ReactNode;
};

export default function ProductInfo(props: Props) {
  const { showCartButton = false, product, content } = props;
  const { title, category, price, discountPercentage = 0, reviews = [] } = product;

  const isDiscountPercentage = discountPercentage > 0;
  const reviewsCount = reviews.length;

  const newPrice = useDiscountedPrice(price, discountPercentage);
  const { items, addItem } = useCartStore(
    useShallow((state: CartState) => ({ items: state.items, addItem: state.addItem })),
  );

  const isInCart = items.some((item) => item.id === product.id);
  const iconName = useCartIcon(isInCart);

  const handleAddItem = () => {
    if (!product) return;
    addItem(product);
    showSuccess('Added to cart', title);
  };

  return (
    <ThemedView style={styles.root}>
      <ThemedView>
        <ThemedText type="xs" style={styles.categoryText}>
          {category}
        </ThemedText>
        <ThemedText numberOfLines={2} type="defaultSemiBold" style={styles.titleText}>
          {title}
        </ThemedText>
        <ThemedView style={styles.ratingRow}>
          <IconSymbol name="star.fill" size={12} color="#0F172A" />
          <IconSymbol name="star.fill" size={12} color="#0F172A" />
          <IconSymbol name="star.fill" size={12} color="#0F172A" />
          <IconSymbol name="star.fill" size={12} color="#0F172A" />
          <IconSymbol name="star.outline" size={12} color="#0F172A" />
          {reviewsCount > 0 && (
            <ThemedText type="xs" style={styles.reviewsText}>
              ({reviewsCount})
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.priceRow}>
        <ThemedView>
          {isDiscountPercentage && <ThemedText type="defaultSemiBold">${newPrice}</ThemedText>}
          <ThemedText type="defaultSemiBold" style={isDiscountPercentage && styles.oldPriceText}>
            ${price.toFixed(2)}
          </ThemedText>
        </ThemedView>
        {showCartButton && (
          <Pressable
            style={[styles.cartButton, isInCart && styles.cartButtonInCart] as ViewStyle}
            onPress={handleAddItem}
          >
            <IconSymbol name={iconName} size={18} color="#fff" />
          </Pressable>
        )}
      </ThemedView>
      {content}
    </ThemedView>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
  },
  categoryText: {
    paddingBottom: 4,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  titleText: {
    paddingBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewsText: {
    color: '#6B7280',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  oldPriceText: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  cartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F172A',
  },
  cartButtonInCart: {
    borderColor: '#16A34A',
    backgroundColor: '#16A34A',
  },
});
