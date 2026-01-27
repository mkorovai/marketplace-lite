// base
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// expo
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// react-native
import 'react-native-reanimated';

// hooks
import { useColorScheme } from '@/hooks/useColorScheme';

// Set tabs as the initial navigation anchor
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
