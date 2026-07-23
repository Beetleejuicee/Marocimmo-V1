import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import ListingCard from '../../src/components/ListingCard';
import { getAgencyById } from '../../src/data/agencies';
import { listings } from '../../src/data/listings';
import { useLanguage } from '../../src/i18n/LanguageContext';
import { colors, radius, spacing } from '../../src/theme';

export default function AgencyDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, tr } = useLanguage();

  const agency = id ? getAgencyById(id) : undefined;
  if (!agency) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>{t.noResults}</Text>
      </View>
    );
  }

  const agencyListings = listings.filter((l) => l.agencyId === agency.id);

  return (
    <>
      <Stack.Screen options={{ title: agency.name }} />
      <FlatList
        style={styles.container}
        data={agencyListings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListingCard listing={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <View style={[styles.logo, { backgroundColor: agency.logoColor }]}>
                <Text style={styles.logoText}>
                  {agency.name
                    .split(' ')
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')}
                </Text>
              </View>
              <Text style={styles.name}>{agency.name}</Text>
              <View style={styles.cityRow}>
                <Ionicons name="location-outline" size={14} color={colors.textMuted} />
                <Text style={styles.city}>{agency.city}</Text>
              </View>
              <Text style={styles.description}>{tr(agency.description)}</Text>
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
                  onPress={() => Linking.openURL(`mailto:${agency.email}`)}
                />
              </View>
            </View>
            <Text style={styles.sectionTitle}>
              {t.agencyListings} ({agencyListings.length})
            </Text>
          </View>
        }
      />
    </>
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
  list: {
    padding: spacing.l,
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
  header: {
    backgroundColor: colors.card,
    borderRadius: radius.l,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: radius.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 22,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.m,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  city: {
    fontSize: 13,
    color: colors.textMuted,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.m,
  },
  contactRow: {
    flexDirection: 'row',
    gap: spacing.s,
    marginTop: spacing.l,
    alignSelf: 'stretch',
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.m,
  },
});
