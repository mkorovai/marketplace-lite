// base
import React from 'react';

// react-native
import { StyleSheet, TextStyle } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';

type Props = {
  count: number;
};

export default function Filters({ count }: Props) {
  return (
    <ThemedView style={styles.root}>
      {count > 0 && (
        <ThemedView style={styles.countProducts}>
          <ThemedText type="small" style={styles.countProductsText as TextStyle}>
            {count} products
          </ThemedText>
        </ThemedView>
      )}
      <ThemedView style={styles.filtersButton}>
        <ThemedText>
          <IconSymbol name="filter.fill" size={18} color="#000" />
        </ThemedText>
        <ThemedText type="default">Filters</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
  filtersButton: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
  },
});
