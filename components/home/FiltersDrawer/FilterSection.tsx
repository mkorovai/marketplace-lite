// base
import React from 'react';

// react-native
import { StyleSheet, type ViewStyle, type TextStyle, type ImageStyle } from 'react-native';

// components
import SectionTitle from '@/components/home/FiltersDrawer/SectionTitle';
import ThemedView from '@/components/ui/ThemedView';
import Divider from '@/components/ui/Divider';

type Props<T> = {
  title: string;
  data: T[];
  keyExtractor: (item: T) => string | number;
  renderItem: (item: T) => React.ReactNode;
  showDivider?: boolean;
};

const FilterSection = <T,>(props: Props<T>) => {
  const { title, data, keyExtractor, renderItem, showDivider = true } = props;

  return (
    <>
      <SectionTitle label={title} />
      <ThemedView style={styles.chipRow}>
        {data.map((item) => (
          <React.Fragment key={keyExtractor(item)}>{renderItem(item)}</React.Fragment>
        ))}
      </ThemedView>
      {showDivider && <Divider color="#F3F4F6" />}
    </>
  );
};

export default FilterSection;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
