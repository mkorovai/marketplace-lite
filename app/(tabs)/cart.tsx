// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, FlatList, Pressable } from 'react-native';

// store
import { useCartStore, CartState } from '@/store/useCartStore';

// components
import ScreenLayout from '@/components/layout/ScreenLayout';
import EmptyState from '@/components/ui/EmptyState';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

export default function CartScreen() {
  const items = useCartStore((state: CartState) => state.items);

  if (items.length === 0) {
    return (
      <ScreenLayout>
        <EmptyState title="Your cart is empty" description="Add products to get started" />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout padded={false}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 16, padding: 16 }}
        renderItem={({ item }) => (
          <Pressable style={styles.pressable as ViewStyle}>
            <CartItem data={item} />
          </Pressable>
        )}
      />
      <CartSummary />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
});
