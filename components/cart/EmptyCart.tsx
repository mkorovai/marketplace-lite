// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

export default function EmptyCart() {
  return (
    <ThemedView style={styles.root}>
      <ThemedText type="defaultSemiBold" style={styles.title}>
        Your cart is empty
      </ThemedText>
      <ThemedText type="xs" style={styles.subtitle}>
        Add products to get started
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  title: {
    paddingBottom: 8,
  },
  subtitle: {
    color: '#8E8E93',
  },
});
