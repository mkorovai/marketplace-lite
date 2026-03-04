// base
import React from 'react';

// react-native
import { StyleSheet, ViewStyle, Pressable } from 'react-native';

// expo
import { useRouter } from 'expo-router';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import IconSymbol from '@/components/ui/IconSymbol';

export default function Header() {
  const router = useRouter();

  return (
    <ThemedView style={styles.root}>
      <Pressable style={styles.backButton as ViewStyle} onPress={() => router.back()}>
        <IconSymbol name="arrow.back" size={16} color="#0F172A" />
        <ThemedText type="defaultSemiBold">Cart</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
