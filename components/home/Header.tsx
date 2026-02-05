// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, TextStyle, TextInput, Pressable } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

// constants
import { CATEGORIES } from '@/data/categories';

type Props = {
  search: string;
  category: string;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
};

export default function Header({ search, category, onSearchChange, onCategoryChange }: Props) {
  return (
    <ThemedView>
      <ThemedView style={styles.searchWrapper}>
        <TextInput
          style={styles.search}
          onChangeText={onSearchChange}
          value={search}
          placeholder="Search products..."
        />
      </ThemedView>
      <ThemedView style={styles.categories}>
        {CATEGORIES.map((item) => {
          const active = item === category;
          return (
            <Pressable
              key={`category-${item}`}
              style={[styles.category, active && styles.categoryActive] as ViewStyle}
              onPress={() => onCategoryChange(item)}
            >
              <ThemedText type="default" style={active && (styles.categoryTextActive as TextStyle)}>
                {item}
              </ThemedText>
            </Pressable>
          );
        })}
      </ThemedView>
      <ThemedView style={styles.separator} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  search: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F3F3F5',
  },
  categories: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  category: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  categoryActive: {
    borderColor: '#000',
    backgroundColor: '#000',
  },
  categoryTextActive: {
    color: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#EAEAEB',
  },
});
