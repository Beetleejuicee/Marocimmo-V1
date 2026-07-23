# MarocImmo — Mobile App

A cross-platform mobile application (iOS, Android, and web) inspired by the
[marocimmo.com](https://www.marocimmo.com) real estate portal, built with
**React Native + Expo** and **Expo Router**.

## Features

- **Home** — hero section, featured listings carousel, browse-by-city cards, recent listings
- **Buy / Rent** — dedicated tabs with text search, and a filter sheet for property type, city, price range (MAD) and minimum bedrooms
- **Listing details** — swipeable photo gallery, price, key specs (surface, bedrooms, bathrooms), full description, amenities, reference and publication date
- **Favorites** — save listings with the heart button; persisted locally with AsyncStorage
- **Agencies** — agency directory and detail pages with each agency's listings
- **Contact** — call, WhatsApp, or email an agency straight from a listing
- **Bilingual** — full French / English UI and content, toggle in the header, persisted across launches

## Tech stack

- [Expo SDK 57](https://docs.expo.dev/) / React Native 0.86 / React 19
- [Expo Router](https://docs.expo.dev/router/introduction/) file-based navigation (tabs + stacks)
- TypeScript throughout
- `expo-image` for cached, transition-enabled images
- `@react-native-async-storage/async-storage` for favorites and language persistence

## Project structure

```
app/                    # Expo Router routes
  _layout.tsx           # Providers (language, favorites) + root stack
  (tabs)/               # Bottom tab navigator: home, buy, rent, favorites, agencies
  property/[id].tsx     # Listing detail screen
  agency/[id].tsx       # Agency detail screen
src/
  components/           # ListingCard, FilterBar, ListingsScreen
  context/              # FavoritesContext (AsyncStorage-backed)
  data/                 # Sample listings, agencies, cities + filtering helpers
  i18n/                 # FR/EN translations + LanguageContext
  theme.ts              # Colors, spacing, radii
  types.ts              # Shared domain types
```

## Data

The app currently ships with realistic **sample data** (`src/data/`) modelled on
marocimmo.com's listing structure: transaction type (buy/rent), property type
(apartment, villa, house, riad, land, commercial, office), price in MAD, city,
neighborhood, surface, bedrooms/bathrooms, amenities, photos and the listing
agency. Photos are loaded from Unsplash's public CDN.

To connect a real backend, replace the functions in `src/data/listings.ts`
(`filterListings`, `getListingById`) and `src/data/agencies.ts` with API calls —
the rest of the app only consumes those helpers.

## Getting started

```bash
npm install
npx expo start
```

Then press `i` (iOS simulator), `a` (Android emulator), `w` (web), or scan the
QR code with the Expo Go app on your phone.

## Building for stores

Use [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npm install -g eas-cli
eas build --platform all
```
