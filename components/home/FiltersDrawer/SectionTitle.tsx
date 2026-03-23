// base
import React from 'react';

// react-native
import { StyleSheet, type ViewStyle, type TextStyle, type ImageStyle } from 'react-native';

// components
import ThemedText from '@/components/ui/ThemedText';

type Props = {
  label: string;
};

export default function SectionTitle({ label }: Props) {
  return (
    <ThemedText type="defaultSemiBold" style={styles.root}>
      {label}
    </ThemedText>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    marginBottom: 16,
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
