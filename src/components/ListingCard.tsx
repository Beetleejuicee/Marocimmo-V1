import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../i18n/LanguageContext';
import { formatPrice } from '../data/listings';
import { colors, radius, spacing } from '../theme';
import { Listing } from '../types';

interface Props {
  listing: Listing;
  compact?: boolean;
}

export default function ListingCard({ listing, compact }: Props) {
  const router = useRouter();
  const { t, tr } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(listing.id);

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
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {listing.transaction === 'buy' ? t.forSale : t.forRent}
          </Text>
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
            size={22}
            color={favorite ? colors.primary : '#fff'}
          />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.price}>
          {formatPrice(listing.price)}
          {listing.transaction === 'rent' ? (
            <Text style={styles.perMonth}> {t.perMonth}</Text>
          ) : null}
        </Text>
        <Text style={styles.title} numberOfLines={compact ? 1 : 2}>
          {tr(listing.title)}
        </Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} />
          <Text style={styles.location} numberOfLines={1}>
            {listing.neighborhood}, {listing.city}
          </Text>
        </View>
        <View style={styles.specs}>
          <View style={styles.spec}>
            <Ionicons name="resize-outline" size={14} color={colors.textMuted} />
            <Text style={styles.specText}>{listing.surface} m²</Text>
          </View>
          {listing.bedrooms > 0 && (
            <View style={styles.spec}>
              <Ionicons name="bed-outline" size={14} color={colors.textMuted} />
              <Text style={styles.specText}>{listing.bedrooms}</Text>
            </View>
          )}
          {listing.bathrooms > 0 && (
            <View style={styles.spec}>
              <Ionicons name="water-outline" size={14} color={colors.textMuted} />
              <Text style={styles.specText}>{listing.bathrooms}</Text>
            </View>
          )}
          <View style={styles.typePill}>
            <Text style={styles.typePillText}>{t.types[listing.type]}</Text>
          </View>
        </View>
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
    width: 270,
    marginRight: spacing.m,
    marginBottom: 0,
  },
  photo: {
    width: '100%',
    height: 190,
    backgroundColor: colors.border,
  },
  photoCompact: {
    height: 150,
  },
  badge: {
    position: 'absolute',
    top: spacing.m,
    left: spacing.m,
    backgroundColor: colors.primary,
    borderRadius: radius.s,
    paddingHorizontal: spacing.s,
    paddingVertical: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  heart: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: radius.pill,
    padding: 6,
  },
  body: {
    padding: spacing.m,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  perMonth: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 3,
  },
  location: {
    fontSize: 13,
    color: colors.textMuted,
    flexShrink: 1,
  },
  specs: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.s,
    gap: spacing.m,
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  specText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  typePill: {
    marginLeft: 'auto',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.s,
    paddingVertical: 2,
  },
  typePillText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.primaryDark,
  },
});
