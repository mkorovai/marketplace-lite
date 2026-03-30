// react-native
import { StyleSheet } from 'react-native';

// expo
import { Image } from 'expo-image';
import { Redirect } from 'expo-router';

// hooks
import { useAuthStore } from '@/store/useAuthStore';

// components
import ParallaxScreenLayout from '@/components/layout/ParallaxScreenLayout';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';

const ProfileScreen = () => {
  const isHydrated = useAuthStore((state) => state._hasHydrated);
  const token = useAuthStore((state) => state.token);

  // We wait for Zustand to load the data
  if (!isHydrated) return null;

  // Access check
  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

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
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerImage: {
    width: 290,
    height: 178,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
