// react-native
import { StyleSheet, type ViewStyle, type TextStyle, type ImageStyle } from 'react-native';

// components
import EmptyState from '@/components/ui/EmptyState';
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

// types
import { Product } from '@/types/product';

type Props = {
  products: Product[];
};

const FavoritesScreen = ({ products }: Props) => {
  if (!products.length) {
    return <EmptyState title="No favorites yet" description="Tap ❤️ on products you like" />;
  }

  return (
    <ThemedView style={styles.root}>
      <ThemedText>Favorites</ThemedText>
    </ThemedView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
