// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Pressable } from 'react-native';

// expo
import { useRouter } from 'expo-router';

// store
import { useCartStore, CartState } from '@/store/useCartStore';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';

export default function Header() {
  const router = useRouter();
  const totalItems = useCartStore((state: CartState) => state.totalItems);
  const formattedTotalItems = totalItems > 99 ? '99+' : totalItems.toString();

  return (
    <ThemedView style={styles.root}>
      <ThemedView>
        <ThemedText type="lgSemiBold">Marketplace</ThemedText>
      </ThemedView>
      <Pressable style={styles.shoppingButton as ViewStyle} onPress={() => router.push('/cart')}>
        {totalItems > 0 && (
          <ThemedView style={styles.totalItemsContainer}>
            <ThemedText type="xsSemiBold" style={styles.totalItemsText}>
              {formattedTotalItems}
            </ThemedText>
          </ThemedView>
        )}
        <ThemedText type="default">
          <IconSymbol name="shopping.cart.fill" size={18} color="#0F172A" />
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  shoppingButton: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  totalItemsContainer: {
    zIndex: 10,
    position: 'absolute',
    top: -4,
    right: -4,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: '#DC2626',
  },

  totalItemsText: {
    fontSize: 10,
    lineHeight: 12,
    color: '#fff',
  },
});
