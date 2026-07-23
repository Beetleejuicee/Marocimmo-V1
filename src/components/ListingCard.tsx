import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../i18n/LanguageContext';
import { formatPrice, relativeDate } from '../data/listings';
import { getAgencyById } from '../data/agencies';
import { colors, radius, spacing } from '../theme';
import { Listing } from '../types';

interface Props {
  listing: Listing;
  compact?: boolean;
}

export default function ListingCard({ listing, compact }: Props) {
  const router = useRouter();
  const { t, tr, language } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(listing.id);
  const agency = getAgencyById(listing.agencyId);

  return (
    <Pressable
      style={[styles.card, compact && styles.cardCompact]}
      onPress={() => router.push(`/property/${listing.id}`)}
    >
      <View>
        <Image
          source={{ uri: listing.photos[0] }}
          style={[styles.photo, compact && styles.photoCompact]}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.typeBadge}>
          <Text style={styles.typeBadgeText}>{t.types[listing.type]}</Text>
        </View>
        <Pressable
          style={styles.heart}
          hitSlop={8}
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorite(listing.id);
          }}
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={20}
            color={favorite ? colors.danger : colors.text}
          />
        </Pressable>
      </View>
      <View style={styles.body}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {formatPrice(listing.price)}
            {listing.transaction === 'rent' ? (
              <Text style={styles.perMonth}> {t.perMonth}</Text>
            ) : null}
          </Text>
          <View style={styles.dateWrap}>
            <Ionicons name="time-outline" size={13} color={colors.textMuted} />
            <Text style={styles.dateText}>{relativeDate(listing.publishedAt, language)}</Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={compact ? 1 : 2}>
          {tr(listing.title)}
        </Text>
        <View style={styles.specsRow}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} />
          <Text style={styles.location} numberOfLines={1}>
            {listing.neighborhood}, {listing.city}
          </Text>
        </View>
        <View style={styles.specsRow}>
          {listing.bedrooms > 0 && (
            <View style={styles.spec}>
              <Ionicons name="bed-outline" size={15} color={colors.text} />
              <Text style={styles.specText}>{listing.bedrooms} bd</Text>
            </View>
          )}
          {listing.bathrooms > 0 && (
            <View style={styles.spec}>
              <Ionicons name="water-outline" size={15} color={colors.text} />
              <Text style={styles.specText}>{listing.bathrooms} ba</Text>
            </View>
          )}
          <View style={styles.spec}>
            <Ionicons name="scan-outline" size={15} color={colors.text} />
            <Text style={styles.specText}>{listing.surface} sqm</Text>
          </View>
        </View>
        {!compact && (
          <Text style={styles.description} numberOfLines={2}>
            {tr(listing.description)}
          </Text>
        )}
        {agency && (
          <View style={styles.agencyRow}>
            <View style={[styles.agencyDot, { backgroundColor: agency.logoColor }]}>
              <Text style={styles.agencyDotText}>{agency.name[0]}</Text>
            </View>
            <Text style={styles.agencyName} numberOfLines={1}>
              {agency.name}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.l,
    overflow: 'hidden',
    marginBottom: spacing.l,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardCompact: {
    width: 280,
    marginRight: spacing.m,
    marginBottom: 0,
  },
  photo: {
    width: '100%',
    height: 200,
    backgroundColor: colors.border,
  },
  photoCompact: {
    height: 150,
  },
  typeBadge: {
    position: 'absolute',
    top: spacing.m,
    left: spacing.m,
    backgroundColor: '#fff',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.m,
    paddingVertical: 4,
  },
  typeBadgeText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  heart: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    backgroundColor: '#fff',
    borderRadius: radius.pill,
    padding: 7,
  },
  body: {
    padding: spacing.l,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.text,
  },
  perMonth: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textMuted,
  },
  dateWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  dateText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginTop: 4,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: spacing.m,
  },
  location: {
    fontSize: 13,
    color: colors.textMuted,
    flexShrink: 1,
    marginLeft: -6,
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textMuted,
    marginTop: 6,
  },
  agencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
    marginTop: spacing.m,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.m,
  },
  agencyDot: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agencyDotText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  agencyName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    flexShrink: 1,
  },
});
