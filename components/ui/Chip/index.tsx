// base
import React from 'react';

// react-native
import {
  StyleSheet,
  Pressable,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native';

// components
import ThemedText from '@/components/ui/ThemedText';

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

const Chip = ({ label, active = false, onPress }: Props) => {
  return (
    <Pressable style={[styles.chip, active && styles.chipActive] as ViewStyle} onPress={onPress}>
      <ThemedText type="default" style={active && styles.chipTextActive}>
        {label}
      </ThemedText>
    </Pressable>
  );
};

export default Chip;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  chip: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  chipActive: {
    borderColor: '#000',
    backgroundColor: '#000',
  },
  chipTextActive: {
    color: '#fff',
  },
});
