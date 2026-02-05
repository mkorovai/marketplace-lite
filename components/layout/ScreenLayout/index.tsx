// base
import React, { ReactNode } from 'react';

// react-native
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

// components
import Header from '@/components/layout/ScreenLayout/Header';
import ThemedView from '@/components/ui/ThemedView';

type Props = {
  children: ReactNode;
  padded?: boolean;
  backgroundColor?: 'string';
};

export default function ScreenLayout({
  children,
  padded = true,
  backgroundColor = '#F9FAFB',
}: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top'] as const}>
      <Header />
      <ThemedView style={[styles.container, padded && styles.padded, { backgroundColor }]}>
        {children}
      </ThemedView>
    </SafeAreaView>
  );
}

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
