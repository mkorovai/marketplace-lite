// base
import React from 'react';

// react-native
import { StyleSheet, Image, ImageSourcePropType, Pressable } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';


type Props = {
  product: {
    title: string;
    category: string;
    price: number;
    oldPrice?: number;
    discountPercent?: number;
    rating: number;
    reviewsCount: number;
    image: ImageSourcePropType;
  };
};

export default function ProductCard({ product }: Props) {
  return (
    <ThemedView style={styles.card}>
      <ThemedView style={styles.imageWrapper}>
        <Image style={styles.image} source={product.image} />
        <Pressable style={styles.favorite}>
          <ThemedText>
            <IconSymbol name="heart.outline" size={18} color='#0F172A' />
          </ThemedText>
        </Pressable>
        {product.discountPercent && (
          <ThemedView style={styles.discount}>
            <ThemedText style={styles.discountText}>
              -{product.discountPercent}%
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
      <ThemedView style={styles.content}>
        <ThemedView>
          <ThemedText style={styles.category}>{product.category}</ThemedText>
          <ThemedText numberOfLines={2} style={styles.title}>
            {product.title}
          </ThemedText>
          <ThemedView style={styles.ratingRow}>
            <ThemedText style={styles.stars}>
              <IconSymbol name="star.fill" size={12} color='#0F172A' />
              <IconSymbol name="star.fill" size={12} color='#0F172A' />
              <IconSymbol name="star.fill" size={12} color='#0F172A' />
              <IconSymbol name="star.fill" size={12} color='#0F172A' />
              <IconSymbol name="star.outline" size={12} color='#0F172A' />
            </ThemedText>
            <ThemedText style={styles.reviews}>
              ({product.reviewsCount})
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.priceRow}>
          <ThemedView>
            <ThemedText style={styles.price}>
              ${product.price.toFixed(2)}
            </ThemedText>
            {product.oldPrice && (
              <ThemedText style={styles.oldPrice}>
                ${product.oldPrice.toFixed(2)}
              </ThemedText>
            )}
          </ThemedView>
          <Pressable style={styles.cartButton}>
            <ThemedText style={styles.cartIcon}>
              <IconSymbol name="shopping.cart" size={18} color='#fff' />
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
    fontWeight: 600,
    fontSize: 12,
    color: '#fff',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 12,
  },
  category: {
    marginBottom: 4,
    fontSize: 11,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  title: {
    marginBottom: 6,
    fontWeight: 600,
    fontSize: 14,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    marginRight: 4,
    fontSize: 12,
    color: '#FACC15'
  },
  reviews: {
    fontSize: 12,
    color: '#6B7280',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: 700,
    fontSize: 16,
  },
  oldPrice: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  cartButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0F172A',
  },
  cartIcon: {
    fontSize: 16,
    color: '#fff',
  },
});
