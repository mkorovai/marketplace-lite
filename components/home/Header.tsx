// base
import React from 'react';
import _ from 'lodash';

// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, TextInput, ScrollView, Pressable } from 'react-native';

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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {CATEGORIES.map((item) => {
          const active = item === category;
          return (
            <Pressable
              key={`category-${item}`}
              style={[styles.category, active && styles.categoryActive] as ViewStyle}
              onPress={() => onCategoryChange(item)}
            >
              <ThemedText type="default" style={active && styles.categoryTextActive}>
                {_.capitalize(item)}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>
      <ThemedView style={styles.separator} />
    </ThemedView>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
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
