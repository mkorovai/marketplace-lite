// react-native
import { StyleSheet, ViewStyle, TextStyle, Pressable } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

type Props = {
  onRetry?: () => void;
};

export default function ErrorState({ onRetry }: Props) {
  return (
    <ThemedView style={styles.root}>
      <ThemedText type="defaultSemiBold" style={styles.title as TextStyle}>
        Something went wrong
      </ThemedText>
      <ThemedText type="small" style={styles.subtitle as TextStyle}>
        Please check your connection and try again
      </ThemedText>
      {onRetry && (
        <Pressable style={styles.button as ViewStyle} onPress={onRetry}>
          <ThemedText type="default">Try again</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    paddingBottom: 8,
  },
  subtitle: {
    paddingBottom: 20,
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
