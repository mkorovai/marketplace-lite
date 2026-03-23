// base
import React from 'react';

// react-native
import { StyleSheet, type ViewStyle, type TextStyle, type ImageStyle } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import Search from '@/components/ui/Search';
import CategoriesList from '@/components/home/Header/CategoriesList';

// types
import type { Category } from '@/types/filters';

type Props = {
  search: string;
  activeCategory: Category;
  setSearch: (search: string) => void;
  setActiveCategory: (category: Category) => void;
};

const Header = ({ search, activeCategory, setSearch, setActiveCategory }: Props) => {
  return (
    <ThemedView>
      <ThemedView style={styles.searchWrapper}>
        <Search search={search} placeholder="Search products..." setSearch={setSearch} />
      </ThemedView>
      <CategoriesList activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <ThemedView style={styles.separator} />
    </ThemedView>
  );
};

export default Header;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#EAEAEB',
  },
});
