import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';
import Logo from '../../src/components/Logo';
import { useLanguage } from '../../src/i18n/LanguageContext';
import { colors } from '../../src/theme';

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const next = language === 'fr' ? 'en' : 'fr';
  return (
    <Pressable
      onPress={() => setLanguage(next)}
      hitSlop={8}
      style={{
        marginRight: 16,
        borderWidth: 1,
        borderColor: colors.darkSoft,
        backgroundColor: colors.darkSoft,
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 5,
      }}
    >
      <Text style={{ fontWeight: '700', color: colors.lime, fontSize: 12 }}>
        {next.toUpperCase()}
      </Text>
    </Pressable>
  );
}

export default function TabsLayout() {
  const { t } = useLanguage();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.lime,
        tabBarInactiveTintColor: colors.textOnDarkMuted,
        headerStyle: { backgroundColor: colors.dark },
        headerTitleStyle: { fontWeight: '700', color: colors.textOnDark },
        headerTitleAlign: 'left',
        headerTitle: () => <Logo />,
        headerRight: () => <LanguageToggle />,
        tabBarStyle: { backgroundColor: colors.dark, borderTopColor: colors.darkSoft },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.home,
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="buy"
        options={{
          title: t.buy,
          tabBarIcon: ({ color, size }) => <Ionicons name="key-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rent"
        options={{
          title: t.rent,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t.favorites,
          tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="agencies"
        options={{
          title: t.agencies,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
