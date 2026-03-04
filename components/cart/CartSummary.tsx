// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Pressable } from 'react-native';

// expo
import { useRouter } from 'expo-router';

// zustand
import { useShallow } from 'zustand/react/shallow';

// store
import { useCartStore, CartState } from '@/store/useCartStore';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

export default function CartSummary() {
  const router = useRouter();
  const { totalItems, totalPrice } = useCartStore(
    useShallow((state: CartState) => ({
      totalItems: state.totalItems,
      totalPrice: state.totalPrice,
    })),
  );

  return (
    <ThemedView style={styles.root}>
      <ThemedView>
        <ThemedText>{totalItems} items</ThemedText>
        <ThemedText>${totalPrice}</ThemedText>
      </ThemedView>
      <ThemedView>
        <Pressable style={styles.button as ViewStyle} onPress={() => router.push('/checkout')}>
          <ThemedText style={styles.buttonText}>Checkout</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E5E5EA',
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#0F172A',
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
  },
});
