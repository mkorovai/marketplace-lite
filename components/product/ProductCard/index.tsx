// base
import React from 'react';

// react-native
import { StyleSheet, Image, Pressable, TextStyle, ViewStyle } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';

// types
import { Product } from '@/types/product';

export default function ProductCard({ product }: Product) {
  const { title, category, price, discountPercentage = 0, reviews = [], thumbnail } = product;

  const getDiscountedPrice = (price: number, discountPercent: number): number => {
    return Number((price * (1 - discountPercent / 100)).toFixed(2));
  };

  const newPrice = getDiscountedPrice(price, discountPercentage);

  return (
    <ThemedView style={styles.card}>
      <ThemedView style={styles.imageWrapper}>
        <Image style={styles.image} source={{ uri: thumbnail }} />
        <Pressable style={styles.favorite}>
          <ThemedText>
            <IconSymbol name="heart.outline" size={18} color="#0F172A" />
          </ThemedText>
        </Pressable>
        {discountPercentage && (
          <ThemedView style={styles.discount}>
            <ThemedText type="smallSemiBold" style={styles.discountText as TextStyle}>
              -{discountPercentage}%
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
      <ThemedView style={styles.content}>
        <ThemedView>
          <ThemedText type="small" style={styles.categoryText as TextStyle}>
            {category}
          </ThemedText>
          <ThemedText numberOfLines={2} style={styles.titleText as TextStyle}>
            {title}
          </ThemedText>
          <ThemedView style={styles.ratingRow}>
            <IconSymbol name="star.fill" size={12} color="#0F172A" />
            <IconSymbol name="star.fill" size={12} color="#0F172A" />
            <IconSymbol name="star.fill" size={12} color="#0F172A" />
            <IconSymbol name="star.fill" size={12} color="#0F172A" />
            <IconSymbol name="star.outline" size={12} color="#0F172A" />
            {reviews > 0 && (
              <ThemedText type="small" style={styles.reviewsText as TextStyle}>
                ({reviews.length})
              </ThemedText>
            )}
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.priceRow}>
          <ThemedView>
            {discountPercentage && <ThemedText type="defaultSemiBold">${newPrice}</ThemedText>}
            <ThemedText
              type="defaultSemiBold"
              style={(discountPercentage && styles.oldPriceText) as TextStyle}
            >
              ${price.toFixed(2)}
            </ThemedText>
          </ThemedView>
          <Pressable style={styles.cartButton as ViewStyle}>
            <ThemedText>
              <IconSymbol name="shopping.cart.fill" size={18} color="#fff" />
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
  },
  favorite: {
    position: 'absolute',
    top: 8,
    left: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  discount: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FB2C36',
  },
  discountText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 12,
  },
  categoryText: {
    paddingBottom: 4,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  titleText: {
    paddingBottom: 6,
    fontWeight: 600,
    fontSize: 14,
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
});
