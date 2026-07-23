import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import ListingCard from '../../src/components/ListingCard';
import { useFavorites } from '../../src/context/FavoritesContext';
import { listings } from '../../src/data/listings';
import { useLanguage } from '../../src/i18n/LanguageContext';
import { colors, fonts, radius, spacing } from '../../src/theme';

export default function FavoritesScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { favoriteIds } = useFavorites();
  const favorites = listings.filter((l) => favoriteIds.includes(l.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListingCard listing={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          favorites.length > 0 ? (
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{t.favorites}</Text>
              <Text style={styles.headerCount}>
                {favorites.length} {t.savedCount}
              </Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="heart" size={30} color={colors.lime} />
            </View>
            <Text style={styles.emptyTitle}>{t.noFavorites}</Text>
            <Text style={styles.emptyHint}>{t.noFavoritesHint}</Text>
            <Pressable style={styles.emptyButton} onPress={() => router.push('/buy')}>
              <Ionicons name="search" size={16} color={colors.lime} />
              <Text style={styles.emptyButtonText}>{t.browseCta}</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.l,
    flexGrow: 1,
  },
  header: {
    marginBottom: spacing.l,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.serif,
    fontWeight: '700',
    color: colors.text,
  },
  headerCount: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.m,
    padding: spacing.xl,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: fonts.serif,
    fontWeight: '700',
    color: colors.text,
  },
  emptyHint: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
    backgroundColor: colors.dark,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.m,
    marginTop: spacing.s,
  },
  emptyButtonText: {
    color: colors.lime,
    fontWeight: '700',
    fontSize: 14,
  },
});
