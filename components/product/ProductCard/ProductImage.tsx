// base
import React from 'react';

// react-native
import {
  StyleSheet,
  Image,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import FavoriteButton from '@/components/product/FavoriteButton';

type ProductImageStyles = {
  image?: StyleProp<ImageStyle>;
};

type Props = {
  showFavorite?: boolean;
  id: number;
  title: string;
  thumbnail: string;
  discountPercentage?: number;
  styles?: ProductImageStyles;
};

const ProductImage = (props: Props) => {
  const {
    showFavorite = false,
    id,
    title,
    thumbnail,
    discountPercentage = 0,
    styles: customStyles,
  } = props;
  const isDiscountPercentage = discountPercentage > 0;

  return (
    <ThemedView style={styles.root}>
      <Image style={[styles.image, customStyles?.image]} source={{ uri: thumbnail }} />
      {showFavorite && (
        <FavoriteButton
          productId={id}
          title={title}
          styles={{
            favorite: styles.favorite,
          }}
        />
      )}
      {isDiscountPercentage && (
        <ThemedView style={styles.discount}>
          <ThemedText type="xsSemiBold" style={styles.discountText}>
            -{discountPercentage}%
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

export default ProductImage;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
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
