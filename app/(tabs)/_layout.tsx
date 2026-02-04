// base
import React from 'react';

// expo
import { Tabs } from 'expo-router';

// components
import HapticTab from '@/components/navigation/HapticTab';
import IconSymbol from '@/components/ui/IconSymbol';

// hooks
import { useColorScheme } from '@/hooks/useColorScheme';

// constants
import { Colors } from '@/constants/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <IconSymbol name="cart.fill" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol name="person.fill" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
