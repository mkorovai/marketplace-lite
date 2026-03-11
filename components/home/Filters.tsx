// base
import React from 'react';

// react-native
import { StyleSheet, Pressable } from 'react-native';
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';

type Props = {
  count: number;
  openDrawer: () => void;
};

export default function Filters({ count, openDrawer }: Props) {
  return (
    <ThemedView style={styles.root}>
      {count > 0 && (
        <ThemedView style={styles.countProducts}>
          <ThemedText type="xs" style={styles.countProductsText}>
            {count} products
          </ThemedText>
        </ThemedView>
      )}
      <Pressable style={styles.filtersBtn} onPress={openDrawer}>
        <ThemedText type="default">
          <IconSymbol name="filter.fill" size={18} color="#000" />
        </ThemedText>
        <ThemedText type="default">Filters</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
  },
  countProducts: {
    backgroundColor: '#F9FAFB',
  },
  countProductsText: {
    color: '#6B7280',
  },
  filtersBtn: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
  },
});
