// react-native
import { StyleSheet } from 'react-native';

// expo
import { Image } from 'expo-image';
import { Redirect } from 'expo-router';

// hooks
import { useAuthStore } from '@/store/useAuthStore';

// components
import ErrorState from '@/components/feedback/ErrorState';
import ParallaxScreenLayout from '@/components/layout/ParallaxScreenLayout';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';

const ProfileScreen = () => {
  const isHydrated = useAuthStore((state) => state._hasHydrated);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  // We wait for Zustand to load the data
  if (!isHydrated) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText type="defaultSemiBold">Loading...</ThemedText>
      </ThemedView>
    );
  }

  // Access check
  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  // Error state if user data is missing
  if (!user) {
    return <ErrorState />;
  }

  return (
    <ParallaxScreenLayout
      headerBackgroundColor={{ light: '#AAA0D1', dark: '#353227' }}
      headerImage={<ThemedView style={[styles.headerImage, { backgroundColor: '#8F7FD1' }]} />}
    >
      <ThemedView style={styles.container}>
        <Image source={user.image} style={styles.profileImage} contentFit="cover" />
        <ThemedView style={styles.infoContainer}>
          <ThemedText type="title" style={styles.name}>
            {user.firstName} {user.lastName}
          </ThemedText>
          <ThemedView style={styles.detailsContainer}>
            <ThemedView style={styles.detailRow}>
              <ThemedText type="defaultSemiBold">Username:</ThemedText>
              <ThemedText type="default">{user.username}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.detailRow}>
              <ThemedText type="defaultSemiBold">Email:</ThemedText>
              <ThemedText type="default">{user.email}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailRow}>
              <ThemedText type="defaultSemiBold">Gender:</ThemedText>
              <ThemedText type="default">{user.gender}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScreenLayout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  container: {
    padding: 16,
  },
  profileImage: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  infoContainer: {
    width: '100%',
  },
  name: {
    marginBottom: 24,
    textAlign: 'center',
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingVertical: 8,
  },
});
