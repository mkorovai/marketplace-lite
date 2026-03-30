// base
import React from 'react';

// react-native
import {
  FlatList,
  Pressable,
  StyleSheet,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

// expo
import { useRouter } from 'expo-router';

// zustand
import { useShallow } from 'zustand/react/shallow';

// store
import { CartState, useCartStore } from '@/store/useCartStore';

// hooks
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

// components
import CheckoutItem from '@/components/cart/CheckoutItem';
import CheckoutScreenLayout from '@/components/layout/CheckoutScreenLayout';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';

const CheckoutScreen = () => {
  // Protect this route - redirect to login if not authenticated
  useProtectedRoute();

  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore(
    useShallow((state: CartState) => ({
      items: state.items,
      totalPrice: state.totalPrice,
      clearCart: state.clearCart,
    })),
  );

  const handleConfirm = () => {
    clearCart();
    router.replace('/order-success');
  };

  return (
    <CheckoutScreenLayout padded={false}>
      <ThemedView style={styles.root}>
        <ThemedText type="mdSemiBold">Order Summary:</ThemedText>
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ gap: 16, paddingVertical: 16 }}
          /* TODO check if there is a patch for react-native types */
          renderItem={({ item }) => <CheckoutItem data={item} />}
        />
        <ThemedView style={styles.cta}>
          <ThemedText type="mdSemiBold">Total: ${totalPrice.toFixed(2)}</ThemedText>
          <Pressable style={styles.button} onPress={handleConfirm}>
            <ThemedText style={styles.buttonText}>Confirm Order</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </CheckoutScreenLayout>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
  cta: {
    gap: 8,
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
    textAlign: 'center',
  },
});
