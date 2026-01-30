// base
import { useMemo, useState } from 'react';

// expo
import { useRouter } from 'expo-router';

// react-native
import { StyleSheet, ViewStyle, TextInput, Pressable, FlatList } from 'react-native';

// components
import ScreenLayout from '@/components/layout/ScreenLayout';
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import ProductCard from '@/components/product/ProductCard';

// constants
import { PRODUCTS } from '@/data/products';

const categories = ['All', 'Electronics', 'Fashion', 'Home']

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <ScreenLayout>
      <ThemedView style={{ backgroundColor: '#F9FAFB' }}>
        <ThemedView style={styles.header}>
          <TextInput
            style={styles.search}
            onChangeText={setSearch}
            value={search}
            placeholder="Search products..."
          />
          <ThemedView style={styles.categories}>
            {categories.map(item => {
              const active = item === category;
              return (
                <Pressable
                  key={`category-${item}`}
                  onPress={() => setCategory(item)}
                  style={[
                    styles.category,
                    active && styles.categoryActive,
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.categoryText,
                      active && styles.categoryTextActive,
                    ]}
                  >
                    {item}
                  </ThemedText>
                </Pressable>
              )
            })}
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.filters}>
          {filteredProducts.length && (
            <ThemedView>
              <ThemedText style={styles.countProducts}>{filteredProducts.length} products</ThemedText>
            </ThemedView>
          )}
        </ThemedView>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 16 }}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item }) => (
            <Pressable
              style={styles.pressable as ViewStyle}
              onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
            >
              <ProductCard product={item} />
            </Pressable>
          )}
        />
      </ThemedView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEB',
    paddingBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  search: {
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#F3F3F5',
  },
  categories: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
  },
  category: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8
  },
  categoryActive: {
    borderColor: '#000',
    backgroundColor: '#000',
  },
  categoryText: {
    color: '#000',
  },
  categoryTextActive: {
    color: '#fff',
  },
  filters: {
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
  },
  countProducts: {
    backgroundColor: '#F9FAFB',
    fontSize: 11,
    fontWeight: 600,
    color: '#6B7280',
  },
  pressable: {
    flex: 1,
  }
});
