// expo
import { Image } from 'expo-image';

// react-native
import { StyleSheet } from 'react-native';

// components
import ParallaxScreenLayout from '@/components/layout/ParallaxScreenLayout';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';

export default function ProfileScreen() {
  return (
    <ParallaxScreenLayout
      headerBackgroundColor={{ light: '#AAA0D1', dark: '#353227' }}
      headerImage={
        <Image
          style={styles.headerImage}
          source={require('@/assets/images/partial-react-logo.png')}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">Profile...</ThemedText>
      </ThemedView>
    </ParallaxScreenLayout>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: 290,
    height: 178,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
