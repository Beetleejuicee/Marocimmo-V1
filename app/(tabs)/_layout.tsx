import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';
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
        borderColor: colors.border,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <Text style={{ fontWeight: '700', color: colors.text, fontSize: 12 }}>
        {language.toUpperCase()} → {next.toUpperCase()}
      </Text>
    </Pressable>
  );
}

export default function TabsLayout() {
  const { t } = useLanguage();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { fontWeight: '700', color: colors.text },
        headerRight: () => <LanguageToggle />,
        tabBarStyle: { backgroundColor: colors.card },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.home,
          headerTitle: t.appName,
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="buy"
        options={{
          title: t.buy,
          headerTitle: t.forSale,
          tabBarIcon: ({ color, size }) => <Ionicons name="key-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rent"
        options={{
          title: t.rent,
          headerTitle: t.forRent,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t.favorites,
          headerTitle: t.favorites,
          tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="agencies"
        options={{
          title: t.agencies,
          headerTitle: t.agenciesTitle,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
