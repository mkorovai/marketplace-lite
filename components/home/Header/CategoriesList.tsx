// base
import React from 'react';

// libs
import _ from 'lodash';

// react-native
import {
  StyleSheet,
  ScrollView,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native';

// components
import Chip from '@/components/ui/Chip';

// constants
import { CATEGORIES } from '@/data/categories';

// types
import type { Category } from '@/types/filters';

type Props = {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
};

const CategoriesList = ({ activeCategory, setActiveCategory }: Props) => {
  const changeCategory = (value: Category) => () => setActiveCategory(value);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categories}
    >
      {CATEGORIES.map((category) => (
        <Chip
          key={`chip-${category}`}
          label={_.capitalize(category)}
          active={category === activeCategory}
          onPress={changeCategory(category as Category)}
        />
      ))}
    </ScrollView>
  );
};

export default CategoriesList;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  categories: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
