// base
import React from 'react';

// react-native
import { FlatList, Pressable, StyleSheet, type ViewStyle } from 'react-native';

// store
import { CartState, useCartStore } from '@/store/useCartStore';

// components
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import ScreenLayout from '@/components/layout/ScreenLayout';
import EmptyState from '@/components/ui/EmptyState';

const CartScreen = () => {
  const items = useCartStore((state: CartState) => state.items);

  if (items.length === 0) {
    return (
      <ScreenLayout padded={false}>
        <EmptyState title="Your cart is empty" description="Add products to get started" />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout padded={false}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 16, padding: 16 }}
        /* TODO check if there is a patch for react-native types */
        renderItem={({ item }) => (
          <Pressable style={styles.pressable as ViewStyle}>
            <CartItem data={item} />
          </Pressable>
        )}
      />
      <CartSummary />
    </ScreenLayout>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
});
