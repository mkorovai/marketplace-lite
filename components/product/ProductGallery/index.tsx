// base
import React, { useState } from 'react';

// react-native
import {
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  View,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

// constants
const { width } = Dimensions.get('window');

// types
type Props = {
  discountPercentage?: number;
  images: string[];
};

const ProductGallery = (props: Props) => {
  const { discountPercentage = 0, images } = props;
  const isDiscountPercentage = discountPercentage > 0;

  const [index, setIndex] = useState(0);

  return (
    <ThemedView style={styles.root}>
      {isDiscountPercentage && (
        <ThemedView style={styles.discount}>
          <ThemedText type="xsSemiBold" style={styles.discountText}>
            -{discountPercentage}%
          </ThemedText>
        </ThemedView>
      )}
      <FlatList
        data={images}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
        }}
        /* TODO check if there is a patch for react-native types */
        renderItem={({ item }) => <Image style={styles.image} source={{ uri: item }} />}
      />
      <ThemedView style={styles.dots}>
        {images.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.activeDot]} />
        ))}
      </ThemedView>
    </ThemedView>
  );
};

export default ProductGallery;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    position: 'relative',
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
  image: {
    width,
    height: 280,
    resizeMode: 'cover',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
    backgroundColor: '#D1D1D6',
  },
  activeDot: {
    backgroundColor: '#000',
  },
});
