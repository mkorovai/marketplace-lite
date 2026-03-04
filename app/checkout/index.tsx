// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, FlatList, Pressable } from 'react-native';

// expo
import { useRouter } from 'expo-router';

// zustand
import { useShallow } from 'zustand/react/shallow';

// store
import { CartState, useCartStore } from '@/store/useCartStore';

// components
import CheckoutScreenLayout from '@/components/layout/CheckoutScreenLayout';
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import CheckoutItem from '@/components/cart/CheckoutItem';

export default function CheckoutScreen() {
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
    router.replace('/');
  };

  return (
    <CheckoutScreenLayout padded={false}>
      <ThemedView style={styles.root}>
        <ThemedText type="mdSemiBold">Order Summary:</ThemedText>
        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ gap: 16, paddingVertical: 16 }}
          renderItem={({ item }) => <CheckoutItem data={item} />}
        />
        <ThemedView style={styles.cta}>
          <ThemedText type="mdSemiBold">Total: ${totalPrice}</ThemedText>
          <Pressable style={styles.button} onPress={handleConfirm}>
            <ThemedText style={styles.buttonText}>Confirm Order</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </CheckoutScreenLayout>
  );
}

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
