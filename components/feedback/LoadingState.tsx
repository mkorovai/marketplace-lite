// react-native
import { StyleSheet, View } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';

export default function LoadingState() {
  return (
    <ThemedView style={styles.root}>
      {[...Array(8)].map((_, index) => (
        /* TODO change View on ThemedView */
        <View key={index} style={styles.card}>
          <ThemedView style={styles.image} />
          <ThemedView style={styles.line} />
          <ThemedView style={[styles.line, styles.short]} />
        </View>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
  },
  card: {
    width: '46%',
  },
  image: {
    height: 160,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#E5E5EA',
  },
  line: {
    height: 14,
    borderRadius: 6,
    marginBottom: 6,
    backgroundColor: '#E5E5EA',
  },
  short: {
    width: '60%',
  },
});
