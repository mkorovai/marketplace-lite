// base
import React from 'react';

// react-native
import { StyleSheet, FlatList, Pressable, type ViewStyle } from 'react-native';

// store
import { useCartStore, CartState } from '@/store/useCartStore';

// components
import ScreenLayout from '@/components/layout/ScreenLayout';
import EmptyState from '@/components/ui/EmptyState';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

const CartScreen = () => {
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
