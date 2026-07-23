import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { agencies } from '../../src/data/agencies';
import { listings } from '../../src/data/listings';
import { useLanguage } from '../../src/i18n/LanguageContext';
import { colors, radius, spacing } from '../../src/theme';

export default function AgenciesScreen() {
  const router = useRouter();
  const { t, tr } = useLanguage();

  return (
    <View style={styles.container}>
      <FlatList
        data={agencies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const count = listings.filter((l) => l.agencyId === item.id).length;
          return (
            <Pressable style={styles.card} onPress={() => router.push(`/agency/${item.id}`)}>
              <View style={[styles.logo, { backgroundColor: item.logoColor }]}>
                <Text style={styles.logoText}>
                  {item.name
                    .split(' ')
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')}
                </Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.row}>
                  <Ionicons name="location-outline" size={13} color={colors.textMuted} />
                  <Text style={styles.city}>{item.city}</Text>
                  <Text style={styles.dot}>·</Text>
                  <Text style={styles.city}>
                    {count} {count === 1 ? t.listing : t.listings}
                  </Text>
                </View>
                <Text style={styles.description} numberOfLines={2}>
                  {tr(item.description)}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </Pressable>
          );
        }}
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
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.l,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.l,
    marginBottom: spacing.m,
    gap: spacing.m,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: radius.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 18,
  },
  body: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  city: {
    fontSize: 12,
    color: colors.textMuted,
  },
  dot: {
    color: colors.textMuted,
  },
  description: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
});
