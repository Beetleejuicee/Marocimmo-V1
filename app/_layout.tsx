import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
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
    <GestureHandlerRootView style={styles.root}>
      <LanguageProvider>
        <FavoritesProvider>
          <StatusBar style="dark" />
          <View style={styles.backdrop}>
            <View style={styles.appFrame}>
              <RootStack />
            </View>
          </View>
        </FavoritesProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  // On wide screens (web/desktop) the app renders as a centered column,
  // like marocimmo.com; on phones it fills the screen as usual.
  backdrop: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.dark,
  },
  appFrame: {
    flex: 1,
    width: '100%',
    ...(Platform.OS === 'web'
      ? {
          maxWidth: 560,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: colors.darkSoft,
        }
      : {}),
  },
});
