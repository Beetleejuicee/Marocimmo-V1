import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { cities } from '../data/listings';
import { useLanguage } from '../i18n/LanguageContext';
import { colors, radius, spacing } from '../theme';
import { ListingFilters, PropertyType } from '../types';

const PROPERTY_TYPES: PropertyType[] = [
  'apartment',
  'villa',
  'house',
  'riad',
  'land',
  'commercial',
  'office',
];

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5];

interface Props {
  filters: ListingFilters;
  onChange: (filters: ListingFilters) => void;
  resultCount: number;
}

export default function FilterBar({ filters, onChange, resultCount }: Props) {
  const { t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);
  const [draft, setDraft] = useState<ListingFilters>(filters);

  const activeCount =
    (filters.type ? 1 : 0) +
    (filters.city ? 1 : 0) +
    (filters.minPrice != null ? 1 : 0) +
    (filters.maxPrice != null ? 1 : 0) +
    (filters.minBedrooms != null ? 1 : 0);

  const openModal = () => {
    setDraft(filters);
    setModalVisible(true);
  };

  const apply = () => {
    onChange(draft);
    setModalVisible(false);
  };

  const reset = () => {
    const cleared = { transaction: filters.transaction, query: filters.query };
    setDraft(cleared);
    onChange(cleared);
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder={t.searchPlaceholder}
            placeholderTextColor={colors.textMuted}
            value={filters.query ?? ''}
            onChangeText={(query) => onChange({ ...filters, query })}
          />
        </View>
        <Pressable style={styles.filterButton} onPress={openModal}>
          <Ionicons name="options-outline" size={20} color="#fff" />
          {activeCount > 0 && (
            <View style={styles.filterCount}>
              <Text style={styles.filterCountText}>{activeCount}</Text>
            </View>
          )}
        </Pressable>
      </View>
      <Text style={styles.resultCount}>
        {resultCount} {t.resultsFound}
      </Text>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.filters}</Text>
              <Pressable onPress={() => setModalVisible(false)} hitSlop={8}>
                <Ionicons name="close" size={24} color={colors.text} />
              </Pressable>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.sectionLabel}>{t.propertyType}</Text>
              <View style={styles.chipWrap}>
                <Chip
                  label={t.allTypes}
                  selected={!draft.type}
                  onPress={() => setDraft({ ...draft, type: undefined })}
                />
                {PROPERTY_TYPES.map((type) => (
                  <Chip
                    key={type}
                    label={t.types[type]}
                    selected={draft.type === type}
                    onPress={() => setDraft({ ...draft, type })}
                  />
                ))}
              </View>

              <Text style={styles.sectionLabel}>{t.city}</Text>
              <View style={styles.chipWrap}>
                <Chip
                  label={t.allCities}
                  selected={!draft.city}
                  onPress={() => setDraft({ ...draft, city: undefined })}
                />
                {cities.map((c) => (
                  <Chip
                    key={c.name}
                    label={c.name}
                    selected={draft.city === c.name}
                    onPress={() => setDraft({ ...draft, city: c.name })}
                  />
                ))}
              </View>

              <Text style={styles.sectionLabel}>{t.price} (MAD)</Text>
              <View style={styles.priceRow}>
                <TextInput
                  style={styles.priceInput}
                  placeholder={t.minPrice}
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  value={draft.minPrice != null ? String(draft.minPrice) : ''}
                  onChangeText={(v) =>
                    setDraft({ ...draft, minPrice: v ? Number(v.replace(/\D/g, '')) : undefined })
                  }
                />
                <Text style={styles.priceDash}>—</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder={t.maxPrice}
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  value={draft.maxPrice != null ? String(draft.maxPrice) : ''}
                  onChangeText={(v) =>
                    setDraft({ ...draft, maxPrice: v ? Number(v.replace(/\D/g, '')) : undefined })
                  }
                />
              </View>

              <Text style={styles.sectionLabel}>{t.bedrooms}</Text>
              <View style={styles.chipWrap}>
                <Chip
                  label={t.any}
                  selected={draft.minBedrooms == null}
                  onPress={() => setDraft({ ...draft, minBedrooms: undefined })}
                />
                {BEDROOM_OPTIONS.map((n) => (
                  <Chip
                    key={n}
                    label={`${n}+`}
                    selected={draft.minBedrooms === n}
                    onPress={() => setDraft({ ...draft, minBedrooms: n })}
                  />
                ))}
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <Pressable style={styles.resetButton} onPress={reset}>
                <Text style={styles.resetText}>{t.reset}</Text>
              </Pressable>
              <Pressable style={styles.applyButton} onPress={apply}>
                <Text style={styles.applyText}>{t.apply}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={[styles.chip, selected && styles.chipSelected]} onPress={onPress}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.s,
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.m,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.m,
    height: 44,
    gap: spacing.s,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  filterButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.m,
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCount: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  filterCountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  resultCount: {
    marginTop: spacing.s,
    fontSize: 13,
    color: colors.textMuted,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.l,
    borderTopRightRadius: radius.l,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  modalBody: {
    paddingHorizontal: spacing.l,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.l,
    marginBottom: spacing.s,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s,
  },
  chip: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.m,
    paddingVertical: 6,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: colors.text,
  },
  chipTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  priceInput: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.m,
    height: 44,
    paddingHorizontal: spacing.m,
    fontSize: 14,
    color: colors.text,
  },
  priceDash: {
    color: colors.textMuted,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: spacing.m,
    padding: spacing.l,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  resetButton: {
    flex: 1,
    height: 48,
    borderRadius: radius.m,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  resetText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  applyButton: {
    flex: 2,
    height: 48,
    borderRadius: radius.m,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
});
