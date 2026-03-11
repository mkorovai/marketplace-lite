// base
import React from 'react';

// react-native
import { StyleSheet, Pressable } from 'react-native';
import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

// components
import ThemedText from '@/components/ui/ThemedText';

type Props = {
  value: number;
  selected: boolean;
  onPress: () => void;
};

export default function RatingButton({ value, selected, onPress }: Props) {
  const ratingDisplay = `${'★'.repeat(value)} ${value}+`;

  return (
    <Pressable style={[styles.chip, selected && styles.chipSelected]} onPress={onPress}>
      <ThemedText type="xs" style={[styles.chipText, selected && styles.chipTextSelected]}>
        {ratingDisplay}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  chipSelected: {
    borderColor: '#111827',
    backgroundColor: '#111827',
  },
  chipText: {
    color: '#374151',
  },
  chipTextSelected: {
    color: '#fff',
  },
});
