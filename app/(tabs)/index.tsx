// expo
import { Image } from 'expo-image';

// react-native
import { StyleSheet } from 'react-native';

// components
import { ParallaxScreenLayout } from '@/components/layout/ParallaxScreenLayout';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScreenLayout
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          style={styles.reactLogo}
          source={require('@/assets/images/partial-react-logo.png')}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
    </ParallaxScreenLayout>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    width: 290,
    height: 178,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
