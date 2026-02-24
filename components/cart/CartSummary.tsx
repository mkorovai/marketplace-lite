// react-native
import { StyleSheet } from 'react-native';

// zustand
import { useShallow } from 'zustand/react/shallow';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

// store
import { useCartStore } from '@/store/useCartStore';

export default function CartSummary() {
  const { totalItems, totalPrice } = useCartStore(
    useShallow((state) => ({
      totalItems: state.totalItems,
      totalPrice: state.totalPrice,
    })),
  );

  return (
    <ThemedView style={styles.root}>
      <ThemedText>{totalItems} items</ThemedText>
      <ThemedText>${totalPrice}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E5E5EA',
  },
});
