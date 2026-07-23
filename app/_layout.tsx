import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FavoritesProvider } from '../src/context/FavoritesContext';
import { LanguageProvider, useLanguage } from '../src/i18n/LanguageContext';
import { colors } from '../src/theme';

function RootStack() {
  const { t } = useLanguage();
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.text,
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="property/[id]" options={{ title: '' }} />
      <Stack.Screen name="agency/[id]" options={{ title: t.agencies }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageProvider>
        <FavoritesProvider>
          <StatusBar style="dark" />
          <RootStack />
        </FavoritesProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}
