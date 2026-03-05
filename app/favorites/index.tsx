// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

export default function FavoritesScreen() {
  return (
    <ThemedView style={styles.root}>
      <ThemedText>Favorites</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
