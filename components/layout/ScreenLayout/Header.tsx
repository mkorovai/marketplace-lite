// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, Pressable } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';

export default function Header() {
  return (
    <ThemedView style={styles.root}>
      <ThemedView>
        <ThemedText type="subtitle">Marketplace</ThemedText>
      </ThemedView>
      <Pressable style={styles.shoppingButton as ViewStyle}>
        <ThemedText>
          <IconSymbol name="shopping.cart.fill" size={18} color="#0F172A" />
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  shoppingButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
