// base
import React, { ReactNode } from 'react';

// react-native
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// components
import Header from '@/components/layout/ProductScreenLayout/Header';
import ThemedView from '@/components/ui/ThemedView';

type Props = {
  children: ReactNode;
  padded?: boolean;
};

const ProductScreenLayout = ({ children, padded = true }: Props) => {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom'] as const}>
      <Header />
      <ThemedView style={[styles.container, padded && styles.padded]}>{children}</ThemedView>
    </SafeAreaView>
  );
};

export default ProductScreenLayout;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  padded: {
    paddingHorizontal: 16,
  },
});
