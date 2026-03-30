// base
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// react-native
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

// expo
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// hooks
import { useColorScheme } from '@/hooks/useColorScheme';

// config
import { toastConfig } from '@/lib/toast/toastConfig';

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
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="product/[id]" />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="favorites" />
          <Stack.Screen name="order-success" />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="(auth)/login" />
        </Stack>
        <StatusBar style="auto" />
        <Toast config={toastConfig} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
