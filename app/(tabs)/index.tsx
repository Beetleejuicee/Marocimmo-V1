import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ListingCard from '../../src/components/ListingCard';
import { filterListings, listings } from '../../src/data/listings';
import { useLanguage } from '../../src/i18n/LanguageContext';
import { colors, fonts, radius, spacing } from '../../src/theme';
import { PropertyType, TransactionType } from '../../src/types';

const TYPE_CARDS: { type: PropertyType; icon: any }[] = [
  { type: 'apartment', icon: 'business-outline' },
  { type: 'villa', icon: 'home-outline' },
  { type: 'house', icon: 'home-outline' },
  { type: 'riad', icon: 'flower-outline' },
  { type: 'office', icon: 'briefcase-outline' },
  { type: 'land', icon: 'map-outline' },
  { type: 'commercial', icon: 'storefront-outline' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const [transaction, setTransaction] = useState<TransactionType>('buy');
  const [cityQuery, setCityQuery] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  const searchCount = useMemo(
    () =>
      filterListings({
        transaction,
        query: cityQuery || undefined,
        maxPrice: maxBudget ? Number(maxBudget.replace(/\D/g, '')) : undefined,
      }).length,
    [transaction, cityQuery, maxBudget]
  );

  const latest = [...listings]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 5);

  const goSearch = (params: Record<string, string> = {}) => {
    router.push({
      pathname: transaction === 'buy' ? '/buy' : '/rent',
      params: {
        ...(cityQuery ? { q: cityQuery } : {}),
        ...(maxBudget ? { maxPrice: maxBudget.replace(/\D/g, '') } : {}),
        ...params,
      },
    });
  };

  const popularSearches: { label: string; path: '/buy' | '/rent'; params: Record<string, string> }[] = [
    {
      label: `${t.types.apartment} Casablanca`,
      path: '/buy',
      params: { type: 'apartment', city: 'Casablanca' },
    },
    { label: `${t.types.villa} Marrakech`, path: '/buy', params: { type: 'villa', city: 'Marrakech' } },
    { label: `${t.types.house} Rabat`, path: '/buy', params: { type: 'house', city: 'Rabat' } },
    {
      label: language === 'fr' ? 'Louer à Tanger' : 'Rent in Tangier',
      path: '/rent',
      params: { city: 'Tangier' },
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>{t.heroTitle}</Text>
        <Text style={styles.heroSubtitle}>{t.heroSubtitle}</Text>

        {/* Buy / Rent segmented toggle */}
        <View style={styles.segment}>
          {(['buy', 'rent'] as TransactionType[]).map((tx) => (
            <Pressable
              key={tx}
              style={[styles.segmentItem, transaction === tx && styles.segmentItemActive]}
              onPress={() => setTransaction(tx)}
            >
              <Text
                style={[styles.segmentText, transaction === tx && styles.segmentTextActive]}
              >
                {tx === 'buy' ? t.buy : t.rent}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Search card */}
        <View style={styles.searchCard}>
          <Text style={styles.searchLabel}>{t.where.toUpperCase()}</Text>
          <View style={styles.searchInputWrap}>
            <Ionicons name="location-outline" size={16} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder={t.cityPlaceholder}
              placeholderTextColor={colors.textMuted}
              value={cityQuery}
              onChangeText={setCityQuery}
            />
          </View>
          <Text style={styles.searchLabel}>{t.maxBudget.toUpperCase()}</Text>
          <View style={styles.searchInputWrap}>
            <TextInput
              style={styles.searchInput}
              placeholder="1,200,000"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              value={maxBudget}
              onChangeText={setMaxBudget}
            />
            <Text style={styles.mad}>MAD</Text>
          </View>
          <Pressable style={styles.searchButton} onPress={() => goSearch()}>
            <Ionicons name="search" size={17} color={colors.dark} />
            <Text style={styles.searchButtonText}>
              {t.see} {searchCount} {t.listings}
            </Text>
          </Pressable>
        </View>

        {/* Popular searches */}
        <Text style={styles.popularLabel}>{t.popularSearches}:</Text>
        <View style={styles.popularWrap}>
          {popularSearches.map((p) => (
            <Pressable
              key={p.label}
              style={styles.popularChip}
              onPress={() => router.push({ pathname: p.path, params: p.params })}
            >
              <Text style={styles.popularChipText}>{p.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Property type cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typeList}
      >
        {TYPE_CARDS.map(({ type, icon }) => {
          const count = listings.filter((l) => l.type === type).length;
          return (
            <Pressable
              key={type}
              style={styles.typeCard}
              onPress={() =>
                router.push({ pathname: '/buy', params: { type } })
              }
            >
              <Ionicons name={icon} size={26} color={colors.limeDark} />
              <Text style={styles.typeCount}>{count}</Text>
              <Text style={styles.typeName}>{t.typesPlural[type]}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Trust bar */}
      <View style={styles.trustBar}>
        {[
          `${listings.length} ${t.trustAcross}`,
          t.trustFree,
          t.trustDirect,
        ].map((item) => (
          <View key={item} style={styles.trustItem}>
            <Ionicons name="checkmark" size={15} color={colors.limeDark} />
            <Text style={styles.trustText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Latest listings */}
      <View style={styles.latestHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>{t.latestListings}</Text>
          <Text style={styles.sectionSubtitle}>{t.latestSubtitle}</Text>
        </View>
        <Pressable onPress={() => router.push('/buy')} hitSlop={8}>
          <Text style={styles.viewAll}>{t.viewAll} →</Text>
        </Pressable>
      </View>
      <View style={styles.latestList}>
        {latest.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  content: {
    paddingBottom: spacing.xxl,
    backgroundColor: colors.background,
  },
  hero: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.l,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  heroTitle: {
    fontFamily: fonts.serif,
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.s,
  },
  segment: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 4,
    marginTop: spacing.l,
  },
  segmentItem: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.s,
    borderRadius: radius.pill,
  },
  segmentItemActive: {
    backgroundColor: colors.dark,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  segmentTextActive: {
    color: '#fff',
  },
  searchCard: {
    backgroundColor: colors.card,
    borderRadius: radius.l,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.l,
    marginTop: spacing.l,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  searchLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: colors.text,
    marginBottom: 6,
  },
  searchInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.m,
    paddingHorizontal: spacing.m,
    height: 44,
    marginBottom: spacing.m,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  mad: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s,
    backgroundColor: colors.lime,
    borderRadius: radius.pill,
    height: 50,
  },
  searchButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.dark,
  },
  popularLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.l,
    textAlign: 'center',
  },
  popularWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.s,
    marginTop: spacing.s,
  },
  popularChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.m,
    paddingVertical: 5,
    backgroundColor: colors.card,
  },
  popularChipText: {
    fontSize: 12,
    color: colors.text,
  },
  typeList: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
    gap: spacing.m,
  },
  typeCard: {
    backgroundColor: colors.card,
    borderRadius: radius.m,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
    alignItems: 'center',
    minWidth: 108,
  },
  typeCount: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.s,
  },
  typeName: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  trustBar: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.m,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trustText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  latestHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.l,
    marginTop: spacing.xl,
    marginBottom: spacing.m,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: fonts.serif,
    fontWeight: '700',
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  latestList: {
    paddingHorizontal: spacing.l,
  },
});
