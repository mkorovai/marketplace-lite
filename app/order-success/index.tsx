// react-native
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Pressable } from 'react-native';

// expo
import { useRouter } from 'expo-router';

// components
import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

export default function OrderSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom'] as const}>
      <ThemedView style={styles.root}>
        <ThemedText type="lg">🎉 Order placed</ThemedText>
        <ThemedText>Your order was successfully created.</ThemedText>
        <Pressable style={styles.button} onPress={() => router.replace('/')}>
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            Continue shopping
          </ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 16,
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
