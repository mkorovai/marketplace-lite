// base
import React from 'react';

// react-native
import { StyleSheet, TextStyle, ViewStyle, Pressable } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';

type Review = {
  comment: string;
  date: string;
  rating: number;
  reviewerName: string;
};

type Props = {
  showCartButton?: boolean;
  title: string;
  category: string;
  price: number;
  discountPercentage: number;
  reviews: Review[];
  content?: React.ReactNode;
};

export default function ProductInfo(props: Props) {
  const {
    showCartButton = false,
    title,
    category,
    price,
    discountPercentage = 0,
    reviews = [],
    content,
  } = props;
  const isDiscountPercentage = discountPercentage > 0;
  const reviewsCount = reviews.length;

  const getDiscountedPrice = (price: number, discountPercent: number): number => {
    return Number((price * (1 - discountPercent / 100)).toFixed(2));
  };

  const newPrice = getDiscountedPrice(price, discountPercentage);

  return (
    <ThemedView style={styles.root}>
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
          {reviewsCount > 0 && (
            <ThemedText type="small" style={styles.reviewsText as TextStyle}>
              ({reviewsCount})
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.priceRow}>
        <ThemedView>
          {isDiscountPercentage && <ThemedText type="defaultSemiBold">${newPrice}</ThemedText>}
          <ThemedText
            type="defaultSemiBold"
            style={(isDiscountPercentage && styles.oldPriceText) as TextStyle}
          >
            ${price.toFixed(2)}
          </ThemedText>
        </ThemedView>
        {showCartButton && (
          <Pressable style={styles.cartButton as ViewStyle}>
            <IconSymbol name="shopping.cart.fill" size={18} color="#fff" />
          </Pressable>
        )}
      </ThemedView>
      {content}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
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
