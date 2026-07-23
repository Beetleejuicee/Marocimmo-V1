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
import { cities, filterListings } from '../data/listings';
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

const COUNT_OPTIONS = [1, 2, 3, 4, 5];

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
    (filters.minSurface != null ? 1 : 0) +
    (filters.maxSurface != null ? 1 : 0) +
    (filters.minBedrooms != null ? 1 : 0) +
    (filters.minBathrooms != null ? 1 : 0);

  const draftCount = filterListings(draft).length;

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

  const numericInput = (v: string) => (v ? Number(v.replace(/\D/g, '')) : undefined);

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
          <Ionicons name="options-outline" size={20} color={colors.dark} />
          {activeCount > 0 && (
            <View style={styles.filterCount}>
              <Text style={styles.filterCountText}>{activeCount}</Text>
            </View>
          )}
        </Pressable>
      </View>
      <Text style={styles.resultCount}>
        <Text style={styles.resultCountStrong}>{resultCount}</Text> {t.resultsFound}
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
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder={t.minPrice}
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  value={draft.minPrice != null ? String(draft.minPrice) : ''}
                  onChangeText={(v) => setDraft({ ...draft, minPrice: numericInput(v) })}
                />
                <Text style={styles.inputDash}>—</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t.maxPrice}
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  value={draft.maxPrice != null ? String(draft.maxPrice) : ''}
                  onChangeText={(v) => setDraft({ ...draft, maxPrice: numericInput(v) })}
                />
              </View>

              <Text style={styles.sectionLabel}>{t.area}</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder={t.min}
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  value={draft.minSurface != null ? String(draft.minSurface) : ''}
                  onChangeText={(v) => setDraft({ ...draft, minSurface: numericInput(v) })}
                />
                <Text style={styles.inputDash}>—</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t.max}
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numeric"
                  value={draft.maxSurface != null ? String(draft.maxSurface) : ''}
                  onChangeText={(v) => setDraft({ ...draft, maxSurface: numericInput(v) })}
                />
              </View>

              <Text style={styles.sectionLabel}>{t.bedrooms}</Text>
              <View style={styles.chipWrap}>
                <Chip
                  label={t.any}
                  selected={draft.minBedrooms == null}
                  onPress={() => setDraft({ ...draft, minBedrooms: undefined })}
                />
                {COUNT_OPTIONS.map((n) => (
                  <Chip
                    key={n}
                    label={`${n}+`}
                    selected={draft.minBedrooms === n}
                    onPress={() => setDraft({ ...draft, minBedrooms: n })}
                  />
                ))}
              </View>

              <Text style={styles.sectionLabel}>{t.bathrooms}</Text>
              <View style={[styles.chipWrap, styles.lastSection]}>
                <Chip
                  label={t.any}
                  selected={draft.minBathrooms == null}
                  onPress={() => setDraft({ ...draft, minBathrooms: undefined })}
                />
                {COUNT_OPTIONS.map((n) => (
                  <Chip
                    key={n}
                    label={`${n}+`}
                    selected={draft.minBathrooms === n}
                    onPress={() => setDraft({ ...draft, minBathrooms: n })}
                  />
                ))}
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <Pressable style={styles.resetButton} onPress={reset}>
                <Text style={styles.resetText}>{t.reset}</Text>
              </Pressable>
              <Pressable style={styles.applyButton} onPress={apply}>
                <Text style={styles.applyText}>
                  {t.apply} ({draftCount})
                </Text>
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
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.l,
    height: 44,
    gap: spacing.s,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  filterButton: {
    backgroundColor: colors.lime,
    borderRadius: radius.pill,
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterCount: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.dark,
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
  resultCountStrong: {
    fontWeight: '800',
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
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
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: spacing.l,
    marginBottom: spacing.s,
  },
  lastSection: {
    marginBottom: spacing.xl,
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
    backgroundColor: colors.dark,
    borderColor: colors.dark,
  },
  chipText: {
    fontSize: 13,
    color: colors.text,
  },
  chipTextSelected: {
    color: colors.lime,
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  input: {
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
  inputDash: {
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
    borderRadius: radius.pill,
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
    borderRadius: radius.pill,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
});
