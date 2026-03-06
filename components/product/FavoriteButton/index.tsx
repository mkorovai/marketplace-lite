// base
import React from 'react';

// react-native
import { StyleSheet, StyleProp, ViewStyle, TextStyle, ImageStyle, Pressable } from 'react-native';

// zustand
import { useShallow } from 'zustand/react/shallow';

// store
import { useFavoritesStore, FavoritesState } from '@/store/useFavoritesStore';

// service
import { showSuccess, showInfo } from '@/lib/toast/toast';

// components
import IconSymbol from '@/components/ui/IconSymbol';

// types
type FavoriteButtonStyles = {
  favorite?: StyleProp<ImageStyle>;
};

type Props = {
  productId: number;
  title: string;
  styles?: FavoriteButtonStyles;
};

export default function FavoriteButton({ productId, title, styles: customStyles }: Props) {
  const { isFavorite, toggle } = useFavoritesStore(
    useShallow((state: FavoritesState) => ({
      isFavorite: state.ids.includes(productId),
      toggle: state.toggle,
    })),
  );

  const iconName = isFavorite ? 'heart.fill' : 'heart.outline';

  const handlePress = () => {
    const nextIsFavorite = !isFavorite;
    const toast = nextIsFavorite ? showSuccess : showInfo;
    const toastText = nextIsFavorite ? 'Added to favorites' : 'Removed from favorites';

    toggle(productId);
    toast(toastText, title);
  };

  return (
    <Pressable style={[styles.root, customStyles?.favorite]} onPress={handlePress}>
      <IconSymbol name={iconName} size={18} color="#0F172A" />
    </Pressable>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
});
