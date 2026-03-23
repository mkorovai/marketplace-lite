// react-native
import {
  StyleSheet,
  Pressable,
  type ViewStyle,
  type TextStyle,
  type ImageStyle,
} from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

type Props = {
  onRetry?: () => void;
};

const ErrorState = ({ onRetry }: Props) => {
  return (
    <ThemedView style={styles.root}>
      <ThemedText type="defaultSemiBold" style={styles.title}>
        Something went wrong
      </ThemedText>
      <ThemedText type="xs" style={styles.subtitle}>
        Please check your connection and try again
      </ThemedText>
      {onRetry && (
        <Pressable style={styles.button as ViewStyle} onPress={onRetry}>
          <ThemedText type="default">Try again</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
};

export default ErrorState;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  title: {
    paddingBottom: 8,
  },
  subtitle: {
    paddingBottom: 20,
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
