// base
import React from 'react';

// react-native
import {
  Image,
  Pressable,
  StyleSheet,
  type ImageStyle,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

// expo
import { useRouter } from 'expo-router';

// store
import { useAuthStore } from '@/store/useAuthStore';
import { CartState, useCartStore } from '@/store/useCartStore';

// components
import IconSymbol from '@/components/ui/IconSymbol';
import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';

const Header = () => {
  const router = useRouter();
  const totalItems = useCartStore((state: CartState) => state.totalItems);
  const formattedTotalItems = totalItems > 99 ? '99+' : totalItems.toString();

  const token = useAuthStore((state) => state.token);
  const isAuthenticated = !!token;

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.trim()?.[0] || '';
    const last = lastName?.trim()?.[0] || '';
    return (first + last).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    router.replace('/(tabs)');
  };

  const currentAuth = isAuthenticated
    ? {
        label: 'Logout',
        onPress: handleLogout,
      }
    : {
        label: 'Login',
        onPress: () => router.push('/(auth)/login'),
      };

  const authContainer = (
    <ThemedView style={styles.flexContainer}>
      {isAuthenticated && (
        <Pressable style={styles.avatar} onPress={() => router.push('/profile')}>
          {user?.image ? (
            <Image source={{ uri: user.image }} style={styles.avatarImage} />
          ) : (
            <ThemedText type="xsSemiBold" style={styles.avatarText}>
              {getInitials(user?.firstName, user?.lastName)}
            </ThemedText>
          )}
        </Pressable>
      )}
      <Pressable style={styles.authBtn} onPress={currentAuth.onPress}>
        <ThemedText type="xsSemiBold">{currentAuth.label}</ThemedText>
      </Pressable>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.root}>
      <ThemedView>
        <ThemedText type="lgSemiBold">Marketplace</ThemedText>
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <Pressable style={styles.shoppingButton as ViewStyle} onPress={() => router.push('/cart')}>
          {totalItems > 0 && (
            <ThemedView style={styles.totalItemsContainer}>
              <ThemedText type="xsSemiBold" style={styles.totalItemsText}>
                {formattedTotalItems}
              </ThemedText>
            </ThemedView>
          )}
          <ThemedText type="default">
            <IconSymbol name="shopping.cart.fill" size={18} color="#0F172A" />
          </ThemedText>
        </Pressable>
        {authContainer}
      </ThemedView>
    </ThemedView>
  );
};

export default Header;

const styles = StyleSheet.create<Record<string, ViewStyle & TextStyle & ImageStyle>>({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  shoppingButton: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  totalItemsContainer: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    right: -4,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: '#DC2626',
  },
  totalItemsText: {
    fontSize: 10,
    lineHeight: 12,
    color: '#fff',
  },
  authBtn: {
    borderWidth: 1,
    borderColor: '#0F172A',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: '100%',
    backgroundColor: '#0F172A',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    color: '#fff',
  },
});
