// base
import { ReactNode } from 'react';

// react-native
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  padded?: boolean;
};

export function ScreenLayout({ children, padded = true }: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: padded ? 16 : 0 }}>{children}</View>
    </SafeAreaView>
  );
}
