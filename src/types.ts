export type TransactionType = 'buy' | 'rent';

export type PropertyType =
  | 'apartment'
  | 'villa'
  | 'house'
  | 'riad'
  | 'land'
  | 'commercial'
  | 'office';

export type AmenityKey =
  | 'pool'
  | 'garden'
  | 'garage'
  | 'elevator'
  | 'airConditioning'
  | 'heating'
  | 'terrace'
  | 'balcony'
  | 'furnished'
  | 'security'
  | 'seaView'
  | 'equippedKitchen'
  | 'fireplace'
  | 'concierge';

export interface LocalizedText {
  en: string;
  fr: string;
}

export interface Listing {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  transaction: TransactionType;
  type: PropertyType;
  /** Price in MAD. For rentals this is the monthly rent. */
  price: number;
  city: string;
  neighborhood: string;
  surface: number;
  bedrooms: number;
  bathrooms: number;
  amenities: AmenityKey[];
  photos: string[];
  agencyId: string;
  featured?: boolean;
  publishedAt: string;
}

export interface Agency {
  id: string;
  name: string;
  city: string;
  logoColor: string;
  phone: string;
  whatsapp: string;
  email: string;
  description: LocalizedText;
}

export interface ListingFilters {
  transaction?: TransactionType;
  type?: PropertyType;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  minSurface?: number;
  maxSurface?: number;
  query?: string;
}
