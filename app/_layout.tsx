// base
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// react-native
import 'react-native-reanimated';

// expo
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// hooks
import { useColorScheme } from '@/hooks/useColorScheme';

// Set tabs as the initial navigation anchor
export const unstable_settings = {
  anchor: '(tabs)',
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // how many times to retry the request in case of error
      staleTime: 1000 * 60, // data is "fresh" for 1 minute
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Home' }} />
          <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
