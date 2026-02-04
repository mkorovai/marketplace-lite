// base
import React, { useState, useMemo } from 'react';

// react-native
import { StyleSheet, ViewStyle, TextStyle, TextInput, Pressable, FlatList } from 'react-native';

// expo
import { useRouter } from 'expo-router';

// components
import ScreenLayout from '@/components/layout/ScreenLayout';
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';
import ProductCard from '@/components/product/ProductCard';

// constants
import { CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <ScreenLayout padded={false}>
      <ThemedView>
        <ThemedView style={styles.searchWrapper}>
          <TextInput
            style={styles.search}
            onChangeText={setSearch}
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
                onPress={() => setCategory(item)}
              >
                <ThemedText
                  type="default"
                  style={active && styles.categoryTextActive as TextStyle}
                >
                  {item}
                </ThemedText>
              </Pressable>
            );
          })}
        </ThemedView>
        <ThemedView style={styles.separator} />
        <ThemedView style={styles.filterRow}>
          {filteredProducts.length && (
            <ThemedView style={styles.countProducts}>
              <ThemedText type="small" style={styles.countProductsText as TextStyle}>
                {filteredProducts.length} products
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
      </ThemedView>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        contentContainerStyle={{ gap: 16, padding: 16 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.pressable as ViewStyle}
            onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
          >
            <ProductCard product={item} />
          </Pressable>
        )}
      />
    </ScreenLayout>
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
  filterRow: {
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
  pressable: {
    flex: 1,
  },
});
