import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { filterListings } from '../data/listings';
import { useLanguage } from '../i18n/LanguageContext';
import { colors, fonts, spacing } from '../theme';
import { ListingFilters, PropertyType, TransactionType } from '../types';
import FilterBar from './FilterBar';
import ListingCard from './ListingCard';

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

  const results = useMemo(() => filterListings({ ...filters, transaction }), [filters, transaction]);

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
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{t.noResults}</Text>
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
    padding: spacing.l,
  },
  empty: {
    padding: spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
