import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFavorites } from '../../src/context/FavoritesContext';
import { getAgencyById } from '../../src/data/agencies';
import { formatPrice, getListingById } from '../../src/data/listings';
import { useLanguage } from '../../src/i18n/LanguageContext';
import { colors, radius, spacing } from '../../src/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t, tr, language } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [photoIndex, setPhotoIndex] = useState(0);

  const listing = id ? getListingById(id) : undefined;
  if (!listing) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>{t.noResults}</Text>
      </View>
    );
  }

  const agency = getAgencyById(listing.agencyId);
  const favorite = isFavorite(listing.id);

  const onGalleryScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setPhotoIndex(index);
  };

  const publishedDate = new Date(listing.publishedAt).toLocaleDateString(
    language === 'fr' ? 'fr-FR' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: listing.city,
          headerRight: () => (
            <Pressable onPress={() => toggleFavorite(listing.id)} hitSlop={8}>
              <Ionicons
                name={favorite ? 'heart' : 'heart-outline'}
                size={24}
                color={favorite ? colors.danger : colors.text}
              />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onGalleryScroll}
          >
            {listing.photos.map((photo, i) => (
              <Image
                key={i}
                source={{ uri: photo }}
                style={styles.photo}
                contentFit="cover"
                transition={200}
              />
            ))}
          </ScrollView>
          {listing.photos.length > 1 && (
            <View style={styles.dots}>
              {listing.photos.map((_, i) => (
                <View key={i} style={[styles.dot, i === photoIndex && styles.dotActive]} />
              ))}
            </View>
          )}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {listing.transaction === 'buy' ? t.forSale : t.forRent}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.price}>
            {formatPrice(listing.price)}
            {listing.transaction === 'rent' ? (
              <Text style={styles.perMonth}> {t.perMonth}</Text>
            ) : null}
          </Text>
          <Text style={styles.title}>{tr(listing.title)}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={15} color={colors.textMuted} />
            <Text style={styles.location}>
              {listing.neighborhood}, {listing.city}
            </Text>
          </View>

          <View style={styles.specGrid}>
            <SpecItem icon="resize-outline" label={t.surface} value={`${listing.surface} m²`} />
            {listing.bedrooms > 0 && (
              <SpecItem icon="bed-outline" label={t.bedrooms} value={String(listing.bedrooms)} />
            )}
            {listing.bathrooms > 0 && (
              <SpecItem icon="water-outline" label={t.bathrooms} value={String(listing.bathrooms)} />
            )}
            <SpecItem icon="pricetag-outline" label={t.propertyType} value={t.types[listing.type]} />
          </View>

          <Text style={styles.sectionTitle}>{t.description}</Text>
          <Text style={styles.description}>{tr(listing.description)}</Text>

          {listing.amenities.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>{t.amenities}</Text>
              <View style={styles.amenities}>
                {listing.amenities.map((a) => (
                  <View key={a} style={styles.amenity}>
                    <Ionicons name="checkmark-circle" size={15} color={colors.success} />
                    <Text style={styles.amenityText}>{t.amenityLabels[a]}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          <Text style={styles.meta}>
            {t.ref} {listing.id.toUpperCase()} · {t.published} {publishedDate}
          </Text>

          {agency && (
            <>
              <Text style={styles.sectionTitle}>{t.listedBy}</Text>
              <Pressable style={styles.agencyCard} onPress={() => router.push(`/agency/${agency.id}`)}>
                <View style={[styles.agencyLogo, { backgroundColor: agency.logoColor }]}>
                  <Text style={styles.agencyLogoText}>
                    {agency.name
                      .split(' ')
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join('')}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.agencyName}>{agency.name}</Text>
                  <Text style={styles.agencyCity}>{agency.city}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </Pressable>
              <View style={styles.contactRow}>
                <ContactButton
                  icon="call-outline"
                  label={t.call}
                  color={colors.dark}
                  onPress={() => Linking.openURL(`tel:${agency.phone}`)}
                />
                <ContactButton
                  icon="logo-whatsapp"
                  label={t.whatsapp}
                  color={colors.success}
                  onPress={() =>
                    Linking.openURL(`https://wa.me/${agency.whatsapp.replace(/\D/g, '')}`)
                  }
                />
                <ContactButton
                  icon="mail-outline"
                  label={t.email}
                  color={colors.limeDark}
                  onPress={() =>
                    Linking.openURL(
                      `mailto:${agency.email}?subject=${encodeURIComponent(tr(listing.title))}`
                    )
                  }
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}

function SpecItem({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <View style={styles.specItem}>
      <Ionicons name={icon} size={20} color={colors.limeDark} />
      <Text style={styles.specValue}>{value}</Text>
      <Text style={styles.specLabel}>{label}</Text>
    </View>
  );
}

function ContactButton({
  icon,
  label,
  color,
  onPress,
}: {
  icon: any;
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={[styles.contactButton, { backgroundColor: color }]} onPress={onPress}>
      <Ionicons name={icon} size={18} color="#fff" />
      <Text style={styles.contactButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  notFoundText: {
    color: colors.textMuted,
  },
  photo: {
    width: SCREEN_WIDTH,
    height: 280,
    backgroundColor: colors.border,
  },
  dots: {
    position: 'absolute',
    bottom: spacing.m,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    backgroundColor: '#fff',
  },
  badge: {
    position: 'absolute',
    top: spacing.m,
    left: spacing.m,
    backgroundColor: colors.dark,
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
  body: {
    padding: spacing.l,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  perMonth: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textMuted,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: colors.textMuted,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.l,
    backgroundColor: colors.card,
    borderRadius: radius.l,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.m,
  },
  specItem: {
    width: '25%',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: spacing.xs,
  },
  specValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  specLabel: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.s,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.text,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s,
  },
  amenity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.m,
    paddingVertical: 5,
  },
  amenityText: {
    fontSize: 13,
    color: colors.text,
  },
  meta: {
    marginTop: spacing.l,
    fontSize: 12,
    color: colors.textMuted,
  },
  agencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m,
    backgroundColor: colors.card,
    borderRadius: radius.l,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.m,
  },
  agencyLogo: {
    width: 44,
    height: 44,
    borderRadius: radius.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agencyLogoText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  agencyName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  agencyCity: {
    fontSize: 12,
    color: colors.textMuted,
  },
  contactRow: {
    flexDirection: 'row',
    gap: spacing.s,
    marginTop: spacing.m,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: radius.m,
    paddingVertical: spacing.m,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});
