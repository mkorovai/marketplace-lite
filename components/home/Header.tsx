// base
import React from 'react';

// libs
import _ from 'lodash';

// react-native
import { StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

// constants
import { CATEGORIES } from '@/data/categories';

// types
import type { Category } from '@/types/filters';

type Props = {
  search: string;
  category: Category;
  setSearch: (search: string) => void;
  setCategory: (category: Category) => void;
};

export default function Header({ search, category, setSearch, setCategory }: Props) {
  const changeSearch = (value: string) => setSearch(_.trimStart(value));
  const changeCategory = (category) => () => setCategory(category);

  return (
    <ThemedView>
      <ThemedView style={styles.searchWrapper}>
        <TextInput
          style={styles.search}
          onChangeText={changeSearch}
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
              onPress={changeCategory(item)}
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
