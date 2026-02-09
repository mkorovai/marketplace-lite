// base
import React from 'react';

// react-native
import { StyleSheet, StyleProp, ImageStyle, TextStyle, Image, Pressable } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';

type ProductImageStyles = {
  image?: StyleProp<ImageStyle>;
};

type Props = {
  showFavorite?: boolean;
  thumbnail: string;
  discountPercentage?: number;
  styles?: ProductImageStyles;
};

export default function ProductImage(props: Props) {
  const { showFavorite = false, thumbnail, discountPercentage = 0, styles: customStyles } = props;
  const isDiscountPercentage = discountPercentage > 0;

  return (
    <ThemedView style={styles.root}>
      <Image style={[styles.image, customStyles?.image]} source={{ uri: thumbnail }} />
      {showFavorite && (
        <Pressable style={styles.favorite}>
          <IconSymbol name="heart.outline" size={18} color="#0F172A" />
        </Pressable>
      )}
      {isDiscountPercentage && (
        <ThemedView style={styles.discount}>
          <ThemedText type="smallSemiBold" style={styles.discountText as TextStyle}>
            -{discountPercentage}%
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
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
});
