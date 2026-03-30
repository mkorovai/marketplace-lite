// react-native
import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

// hooks
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

// components
import EmptyState from '@/components/ui/EmptyState';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';

// types
import { Product } from '@/types/product';

type Props = {
  products: Product[];
};

const FavoritesScreen = ({ products }: Props) => {
  // Protect this route - redirect to login if not authenticated
  useProtectedRoute();

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
