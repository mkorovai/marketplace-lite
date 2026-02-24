// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, FlatList, Pressable } from 'react-native';

// components
import ScreenLayout from '@/components/layout/ScreenLayout';
import EmptyCart from '@/components/cart/EmptyCart';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

// store
import { useCartStore } from '@/store/useCartStore';

export default function CartScreen() {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return (
      <ScreenLayout>
        <EmptyCart />
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
