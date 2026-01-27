// base
import { ReactNode } from 'react';

// react-native
import { SafeAreaView } from 'react-native-safe-area-context';

// components
import ThemedView from '@/components/ui/ThemedView';

type Props = {
  children: ReactNode;
  padded?: boolean;
};

export default function ScreenLayout({ children, padded = true }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top'] as const}>
      <ThemedView style={{ flex: 1, paddingHorizontal: 16 }}>{children}</ThemedView>
    </SafeAreaView>
  );
}
