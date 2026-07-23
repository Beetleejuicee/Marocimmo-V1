import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import ListingCard from '../../src/components/ListingCard';
import { cities, listings } from '../../src/data/listings';
import { useLanguage } from '../../src/i18n/LanguageContext';
import { colors, radius, spacing } from '../../src/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const featured = listings.filter((l) => l.featured);
  const recent = [...listings]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 5);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>{t.tagline}</Text>
        <View style={styles.heroButtons}>
          <Pressable style={styles.heroButton} onPress={() => router.push('/buy')}>
            <Ionicons name="key-outline" size={18} color="#fff" />
            <Text style={styles.heroButtonText}>{t.buy}</Text>
          </Pressable>
          <Pressable
            style={[styles.heroButton, styles.heroButtonAlt]}
            onPress={() => router.push('/rent')}
          >
            <Ionicons name="calendar-outline" size={18} color={colors.primary} />
            <Text style={[styles.heroButtonText, styles.heroButtonTextAlt]}>{t.rent}</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.sectionTitle}>{t.featuredListings}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {featured.map((listing) => (
          <ListingCard key={listing.id} listing={listing} compact />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>{t.browseByCity}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {cities.map((city) => {
          const count = listings.filter((l) => l.city === city.name).length;
          return (
            <Pressable
              key={city.name}
              style={styles.cityCard}
              onPress={() => router.push({ pathname: '/buy', params: { city: city.name } })}
            >
              <Image source={{ uri: city.photo }} style={styles.cityPhoto} contentFit="cover" />
              <View style={styles.cityOverlay} />
              <View style={styles.cityLabelWrap}>
                <Text style={styles.cityName}>{city.name}</Text>
                <Text style={styles.cityCount}>
                  {count} {count === 1 ? t.listing : t.listings}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={styles.sectionTitle}>{t.recentListings}</Text>
      <View style={styles.recentList}>
        {recent.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </View>
    </ScrollView>
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
  hero: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: spacing.l,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: spacing.m,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
    backgroundColor: colors.primaryDark,
    borderRadius: radius.m,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.m,
  },
  heroButtonAlt: {
    backgroundColor: '#fff',
  },
  heroButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  heroButtonTextAlt: {
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.m,
    paddingHorizontal: spacing.l,
  },
  horizontalList: {
    paddingHorizontal: spacing.l,
  },
  cityCard: {
    width: 140,
    height: 100,
    borderRadius: radius.m,
    overflow: 'hidden',
    marginRight: spacing.m,
    backgroundColor: colors.border,
  },
  cityPhoto: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cityOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  cityLabelWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.m,
  },
  cityName: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
  cityCount: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
  },
  recentList: {
    paddingHorizontal: spacing.l,
  },
});
