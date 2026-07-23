import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { filterListings } from '../data/listings';
import { useLanguage } from '../i18n/LanguageContext';
import { colors, spacing } from '../theme';
import { ListingFilters, TransactionType } from '../types';
import FilterBar from './FilterBar';
import ListingCard from './ListingCard';

interface Props {
  transaction: TransactionType;
  initialCity?: string;
}

export default function ListingsScreen({ transaction, initialCity }: Props) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<ListingFilters>({
    transaction,
    city: initialCity,
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
          <View style={styles.header}>
            <FilterBar filters={filters} onChange={setFilters} resultCount={results.length} />
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
    padding: spacing.l,
  },
  header: {
    marginBottom: spacing.l,
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
