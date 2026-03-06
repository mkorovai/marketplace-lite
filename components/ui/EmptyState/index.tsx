// react-native
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Pressable } from 'react-native';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

type Props = {
  title: string;
  description?: string;
  buttonText?: string;
  onPress?: () => void;
};

export default function EmptyState(props: Props) {
  const { title, description, buttonText, onPress } = props;

  return (
    <ThemedView style={styles.root}>
      <ThemedText type="defaultSemiBold" style={styles.title}>
        {title}
      </ThemedText>
      {description && (
        <ThemedText type="xs" style={styles.description}>
          {description}
        </ThemedText>
      )}
      {buttonText && onPress && (
        <Pressable style={styles.button} onPress={onPress}>
          <ThemedText style={styles.buttonText}>{buttonText}</ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  title: {
    paddingBottom: 8,
  },
  description: {
    paddingBottom: 16,
    color: '#8E8E93',
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#0F172A',
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});
