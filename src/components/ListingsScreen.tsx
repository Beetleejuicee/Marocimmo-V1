import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { filterListings } from '../data/listings';
import { useLanguage } from '../i18n/LanguageContext';
import { colors, fonts, radius, spacing } from '../theme';
import { Listing, ListingFilters, PropertyType, TransactionType } from '../types';
import FilterBar from './FilterBar';
import ListingCard from './ListingCard';

type SortMode = 'recent' | 'priceAsc' | 'priceDesc';

const QUICK_TYPES: PropertyType[] = [
  'apartment',
  'villa',
  'house',
  'riad',
  'office',
  'land',
  'commercial',
];

interface Props {
  transaction: TransactionType;
  initialCity?: string;
  initialType?: PropertyType;
  initialQuery?: string;
  initialMaxPrice?: number;
}

export default function ListingsScreen({
  transaction,
  initialCity,
  initialType,
  initialQuery,
  initialMaxPrice,
}: Props) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<ListingFilters>({
    transaction,
    city: initialCity,
    type: initialType,
    query: initialQuery,
    maxPrice: initialMaxPrice,
  });
  const [sort, setSort] = useState<SortMode>('recent');
  const [sortOpen, setSortOpen] = useState(false);

  const results = useMemo(() => {
    const filtered = filterListings({ ...filters, transaction });
    const sorted: Listing[] = [...filtered];
    if (sort === 'priceAsc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'priceDesc') sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [filters, transaction, sort]);

  const sortLabels: Record<SortMode, string> = {
    recent: t.sortRecent,
    priceAsc: t.sortPriceAsc,
    priceDesc: t.sortPriceDesc,
  };

  const clearFilters = () =>
    setFilters({ transaction, query: filters.query });

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListingCard listing={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>
                {transaction === 'buy' ? t.buyHero : t.rentHero}
              </Text>
            </View>
            <View style={styles.filterWrap}>
              <FilterBar filters={filters} onChange={setFilters} resultCount={results.length} />
            </View>

            {/* Quick type chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickTypes}
            >
              <Pressable
                style={[styles.quickChip, !filters.type && styles.quickChipActive]}
                onPress={() => setFilters({ ...filters, type: undefined })}
              >
                <Text style={[styles.quickChipText, !filters.type && styles.quickChipTextActive]}>
                  {t.allTypes}
                </Text>
              </Pressable>
              {QUICK_TYPES.map((type) => {
                const active = filters.type === type;
                return (
                  <Pressable
                    key={type}
                    style={[styles.quickChip, active && styles.quickChipActive]}
                    onPress={() => setFilters({ ...filters, type: active ? undefined : type })}
                  >
                    <Text style={[styles.quickChipText, active && styles.quickChipTextActive]}>
                      {t.typesPlural[type]}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Sort row */}
            <View style={styles.sortRow}>
              <Pressable style={styles.sortButton} onPress={() => setSortOpen(!sortOpen)}>
                <Ionicons name="swap-vertical" size={14} color={colors.text} />
                <Text style={styles.sortButtonText}>
                  {t.sort} · {sortLabels[sort]}
                </Text>
                <Ionicons
                  name={sortOpen ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  color={colors.textMuted}
                />
              </Pressable>
            </View>
            {sortOpen && (
              <View style={styles.sortMenu}>
                {(Object.keys(sortLabels) as SortMode[]).map((mode) => (
                  <Pressable
                    key={mode}
                    style={styles.sortOption}
                    onPress={() => {
                      setSort(mode);
                      setSortOpen(false);
                    }}
                  >
                    <Ionicons
                      name={sort === mode ? 'radio-button-on' : 'radio-button-off'}
                      size={16}
                      color={sort === mode ? colors.limeDark : colors.textMuted}
                    />
                    <Text
                      style={[styles.sortOptionText, sort === mode && styles.sortOptionTextActive]}
                    >
                      {sortLabels[mode]}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="search-outline" size={28} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyText}>{t.noResults}</Text>
            <Pressable style={styles.emptyButton} onPress={clearFilters}>
              <Text style={styles.emptyButtonText}>{t.clearFilters}</Text>
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
    paddingBottom: spacing.xxl,
  },
  hero: {
    backgroundColor: colors.dark,
    paddingHorizontal: spacing.l,
    paddingTop: spacing.s,
    paddingBottom: spacing.xl,
  },
  heroTitle: {
    color: colors.textOnDark,
    fontSize: 26,
    fontFamily: fonts.serif,
    fontWeight: '700',
  },
  filterWrap: {
    paddingHorizontal: spacing.l,
    paddingTop: spacing.l,
  },
  quickTypes: {
    paddingHorizontal: spacing.l,
    paddingTop: spacing.m,
    gap: spacing.s,
  },
  quickChip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.m,
    paddingVertical: 7,
  },
  quickChipActive: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
  },
  quickChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  quickChipTextActive: {
    color: colors.lime,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.m,
    paddingVertical: 6,
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  sortMenu: {
    marginHorizontal: spacing.l,
    marginBottom: spacing.m,
    backgroundColor: colors.card,
    borderRadius: radius.m,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xs,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
  },
  sortOptionText: {
    fontSize: 14,
    color: colors.text,
  },
  sortOptionTextActive: {
    fontWeight: '700',
  },
  empty: {
    padding: spacing.xxl,
    alignItems: 'center',
    gap: spacing.m,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: colors.dark,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.m,
  },
  emptyButtonText: {
    color: colors.lime,
    fontWeight: '700',
    fontSize: 14,
  },
});
