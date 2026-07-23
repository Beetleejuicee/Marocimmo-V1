import { Listing, ListingFilters } from '../types';

/** Unsplash CDN helper — stable public photo URLs, sized for mobile. */
const u = (id: string) => `https://images.unsplash.com/${id}?w=1080&q=80&auto=format&fit=crop`;

export const listings: Listing[] = [
  {
    id: 'l1',
    title: {
      en: 'Modern 3-bedroom apartment in Maarif',
      fr: 'Appartement moderne 3 chambres à Maarif',
    },
    description: {
      en: 'Bright 140 m² apartment on the 5th floor of a secure residence in the heart of Maarif. Double living room, equipped kitchen, three bedrooms including a master suite, and a large balcony overlooking a quiet street. Two minutes from shops, schools and the tramway.',
      fr: "Lumineux appartement de 140 m² au 5ème étage d'une résidence sécurisée au cœur de Maarif. Double salon, cuisine équipée, trois chambres dont une suite parentale, et grand balcon donnant sur une rue calme. À deux minutes des commerces, écoles et du tramway.",
    },
    transaction: 'buy',
    type: 'apartment',
    price: 2450000,
    city: 'Casablanca',
    neighborhood: 'Maarif',
    surface: 140,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['elevator', 'balcony', 'equippedKitchen', 'security', 'airConditioning'],
    photos: [
      u('photo-1522708323590-d24dbb6b0267'),
      u('photo-1560448204-e02f11c3d0e2'),
      u('photo-1600566753086-00f18fb6b3ea'),
    ],
    agencyId: 'atlas-immobilier',
    featured: true,
    publishedAt: '2026-07-18',
  },
  {
    id: 'l2',
    title: {
      en: 'Furnished villa with pool, Route d’Amezmiz',
      fr: 'Villa meublée avec piscine, Route d’Amezmiz',
    },
    description: {
      en: 'Superb furnished 500 m² villa on the Amezmiz road, 20 minutes from the Medina. Six bedrooms, four bathrooms, two living rooms, landscaped garden with private pool and pool house. Staff quarters and covered parking for three cars.',
      fr: 'Superbe villa meublée de 500 m² sur la route d’Amezmiz, à 20 minutes de la Médina. Six chambres, quatre salles de bain, deux salons, jardin paysager avec piscine privée et pool house. Dépendance pour le personnel et parking couvert pour trois voitures.',
    },
    transaction: 'rent',
    type: 'villa',
    price: 35000,
    city: 'Marrakech',
    neighborhood: 'Route d’Amezmiz',
    surface: 500,
    bedrooms: 6,
    bathrooms: 4,
    amenities: ['pool', 'garden', 'garage', 'furnished', 'airConditioning', 'security', 'terrace'],
    photos: [
      u('photo-1613490493576-7fde63acd811'),
      u('photo-1600596542815-ffad4c1539a9'),
      u('photo-1600607687939-ce8a6c25118c'),
    ],
    agencyId: 'medina-properties',
    featured: true,
    publishedAt: '2026-07-20',
  },
  {
    id: 'l3',
    title: {
      en: 'Sea-view apartment, Saidia beachfront',
      fr: 'Appartement vue mer, front de mer Saidia',
    },
    description: {
      en: '85 m² apartment in a beachfront residence in Saidia, with a wide terrace facing the Mediterranean. Two bedrooms, equipped kitchen, shared pools and direct beach access. Ideal holiday home or rental investment.',
      fr: 'Appartement de 85 m² dans une résidence en front de mer à Saidia, avec une large terrasse face à la Méditerranée. Deux chambres, cuisine équipée, piscines communes et accès direct à la plage. Idéal résidence de vacances ou investissement locatif.',
    },
    transaction: 'buy',
    type: 'apartment',
    price: 1150000,
    city: 'Saidia',
    neighborhood: 'Front de mer',
    surface: 85,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['seaView', 'terrace', 'pool', 'equippedKitchen', 'security', 'elevator'],
    photos: [
      u('photo-1502672260266-1c1ef2d93688'),
      u('photo-1499793983690-e29da59ef1c2'),
      u('photo-1600210492486-724fe5c67fb0'),
    ],
    agencyId: 'saidia-littoral',
    featured: true,
    publishedAt: '2026-07-15',
  },
  {
    id: 'l4',
    title: {
      en: 'Traditional riad in the Marrakech Medina',
      fr: 'Riad traditionnel dans la Médina de Marrakech',
    },
    description: {
      en: 'Authentic restored riad of 220 m² with a central patio, fountain and orange trees. Five bedrooms with en-suite bathrooms, traditional salon, rooftop terrace with Atlas views. Currently operated as a guest house.',
      fr: "Authentique riad restauré de 220 m² avec patio central, fontaine et orangers. Cinq chambres avec salles de bain privatives, salon traditionnel, terrasse sur le toit avec vue sur l'Atlas. Actuellement exploité en maison d'hôtes.",
    },
    transaction: 'buy',
    type: 'riad',
    price: 4200000,
    city: 'Marrakech',
    neighborhood: 'Medina',
    surface: 220,
    bedrooms: 5,
    bathrooms: 5,
    amenities: ['terrace', 'fireplace', 'furnished', 'airConditioning'],
    photos: [
      u('photo-1600585154340-be6161a56a0c'),
      u('photo-1600566753190-17f0baa2a6c3'),
      u('photo-1600573472592-401b489a3cdc'),
    ],
    agencyId: 'medina-properties',
    featured: true,
    publishedAt: '2026-07-10',
  },
  {
    id: 'l5',
    title: {
      en: 'Studio for rent near Tangier City Center',
      fr: 'Studio à louer près de Tanger City Center',
    },
    description: {
      en: 'Furnished 45 m² studio on a high floor with a partial bay view, walking distance from Tangier City Center and the train station. Fitted kitchen, air conditioning, building with elevator and concierge.',
      fr: "Studio meublé de 45 m² en étage élevé avec vue partielle sur la baie, à distance de marche de Tanger City Center et de la gare. Cuisine aménagée, climatisation, immeuble avec ascenseur et concierge.",
    },
    transaction: 'rent',
    type: 'apartment',
    price: 4500,
    city: 'Tangier',
    neighborhood: 'City Center',
    surface: 45,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['furnished', 'airConditioning', 'elevator', 'concierge', 'equippedKitchen'],
    photos: [
      u('photo-1522771739844-6a9f6d5f14af'),
      u('photo-1554995207-c18c203602cb'),
    ],
    agencyId: 'tanger-bay-realty',
    publishedAt: '2026-07-21',
  },
  {
    id: 'l6',
    title: {
      en: 'Family house with garden in Hay Riad',
      fr: 'Maison familiale avec jardin à Hay Riad',
    },
    description: {
      en: 'Spacious 320 m² family house in the sought-after Hay Riad district of Rabat. Four bedrooms, three bathrooms, large living room with fireplace, private garden and double garage. Close to international schools and ministries.',
      fr: 'Spacieuse maison familiale de 320 m² dans le quartier prisé de Hay Riad à Rabat. Quatre chambres, trois salles de bain, grand salon avec cheminée, jardin privé et double garage. Proche des écoles internationales et des ministères.',
    },
    transaction: 'buy',
    type: 'house',
    price: 5800000,
    city: 'Rabat',
    neighborhood: 'Hay Riad',
    surface: 320,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['garden', 'garage', 'fireplace', 'heating', 'security', 'terrace'],
    photos: [
      u('photo-1568605114967-8130f3a36994'),
      u('photo-1512917774080-9991f1c4c750'),
      u('photo-1600585152220-90363fe7e115'),
    ],
    agencyId: 'rabat-prestige',
    featured: true,
    publishedAt: '2026-07-12',
  },
  {
    id: 'l7',
    title: {
      en: 'Apartment with sea-view terrace, Bouznika Bay',
      fr: 'Appartement avec terrasse vue mer, Bouznika Bay',
    },
    description: {
      en: 'Superb 216 m² apartment with a 61 m² terrace offering unobstructed sea views, inside a guarded seaside resort in Bouznika. Three bedrooms, double living room, high-end finishes, shared pools, tennis and direct beach access.',
      fr: 'Superbe appartement de 216 m² avec terrasse de 61 m² offrant une vue mer dégagée, au sein d’une station balnéaire gardée à Bouznika. Trois chambres, double salon, finitions haut de gamme, piscines communes, tennis et accès direct à la plage.',
    },
    transaction: 'buy',
    type: 'apartment',
    price: 3100000,
    city: 'Bouznika',
    neighborhood: 'Bouznika Bay',
    surface: 216,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['seaView', 'terrace', 'pool', 'security', 'equippedKitchen', 'garage'],
    photos: [
      u('photo-1600047509807-ba8f99d2cdde'),
      u('photo-1600566753376-12c8ab7fb75b'),
    ],
    agencyId: 'rabat-prestige',
    publishedAt: '2026-07-08',
  },
  {
    id: 'l8',
    title: {
      en: 'Hotel-zoned land on the Corniche',
      fr: 'Terrain zone hôtelière sur la Corniche',
    },
    description: {
      en: 'Exceptional 6,200 m² plot on the Corniche with unobstructed sea views, zoned for a hotel or high-end tourism project. All utilities at the boundary, clean title, immediate availability.',
      fr: 'Terrain exceptionnel de 6 200 m² sur la Corniche avec vue mer dégagée, zoné pour un hôtel ou un projet touristique haut de gamme. Toutes commodités en limite de parcelle, titre foncier propre, disponibilité immédiate.',
    },
    transaction: 'buy',
    type: 'land',
    price: 46500000,
    city: 'Casablanca',
    neighborhood: 'Ain Diab',
    surface: 6200,
    bedrooms: 0,
    bathrooms: 0,
    amenities: ['seaView'],
    photos: [u('photo-1500382017468-9049fed747ef')],
    agencyId: 'atlas-immobilier',
    publishedAt: '2026-06-30',
  },
  {
    id: 'l9',
    title: {
      en: '2-bedroom apartment, Ain Chock',
      fr: 'Appartement 2 chambres, Ain Chock',
    },
    description: {
      en: 'Well-kept 54 m² apartment with two bedrooms in Ain Chock, Casablanca. Third floor, sunny living room, independent kitchen. Great first purchase or rental investment near the university campus.',
      fr: "Appartement bien entretenu de 54 m² avec deux chambres à Ain Chock, Casablanca. Troisième étage, salon ensoleillé, cuisine indépendante. Excellent premier achat ou investissement locatif près du campus universitaire.",
    },
    transaction: 'buy',
    type: 'apartment',
    price: 620000,
    city: 'Casablanca',
    neighborhood: 'Ain Chock',
    surface: 54,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['balcony'],
    photos: [u('photo-1484154218962-a197022b5858'), u('photo-1493809842364-78817add7ffb')],
    agencyId: 'atlas-immobilier',
    publishedAt: '2026-07-19',
  },
  {
    id: 'l10',
    title: {
      en: 'Villa in a secure residence, Saidia',
      fr: 'Villa dans une résidence sécurisée, Saidia',
    },
    description: {
      en: '180 m² semi-detached villa in a secure residence with golf and marina nearby. Three bedrooms, garden, shared pool, sold semi-furnished. Five minutes from the beach.',
      fr: 'Villa jumelée de 180 m² dans une résidence sécurisée proche du golf et de la marina. Trois chambres, jardin, piscine commune, vendue semi-meublée. À cinq minutes de la plage.',
    },
    transaction: 'buy',
    type: 'villa',
    price: 2350000,
    city: 'Saidia',
    neighborhood: 'Golf Resort',
    surface: 180,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['pool', 'garden', 'security', 'terrace', 'airConditioning'],
    photos: [
      u('photo-1564013799919-ab600027ffc6'),
      u('photo-1583608205776-bfd35f0d9f83'),
    ],
    agencyId: 'saidia-littoral',
    publishedAt: '2026-07-05',
  },
  {
    id: 'l11',
    title: {
      en: 'Office space in Casablanca Finance City',
      fr: 'Plateau de bureaux à Casablanca Finance City',
    },
    description: {
      en: 'Open-plan 260 m² office space on a high floor in a Grade A tower in Casablanca Finance City. Raised floors, air conditioning, six parking spots, 24/7 security and concierge.',
      fr: 'Plateau de bureaux de 260 m² en open space, en étage élevé dans une tour Grade A à Casablanca Finance City. Faux planchers, climatisation, six places de parking, sécurité 24h/24 et conciergerie.',
    },
    transaction: 'rent',
    type: 'office',
    price: 52000,
    city: 'Casablanca',
    neighborhood: 'Finance City',
    surface: 260,
    bedrooms: 0,
    bathrooms: 2,
    amenities: ['airConditioning', 'elevator', 'security', 'garage', 'concierge'],
    photos: [u('photo-1497366216548-37526070297c'), u('photo-1497366754035-f200968a6e72')],
    agencyId: 'atlas-immobilier',
    publishedAt: '2026-07-17',
  },
  {
    id: 'l12',
    title: {
      en: 'Furnished 2-bedroom flat, Gueliz',
      fr: 'Appartement meublé 2 chambres, Guéliz',
    },
    description: {
      en: 'Tastefully furnished 95 m² apartment in the heart of Gueliz, Marrakech. Two bedrooms, bright living room, equipped kitchen, balcony, elevator and concierge. Walking distance to cafés and galleries.',
      fr: 'Appartement de 95 m² meublé avec goût au cœur de Guéliz, Marrakech. Deux chambres, salon lumineux, cuisine équipée, balcon, ascenseur et concierge. À deux pas des cafés et galeries.',
    },
    transaction: 'rent',
    type: 'apartment',
    price: 9500,
    city: 'Marrakech',
    neighborhood: 'Gueliz',
    surface: 95,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['furnished', 'equippedKitchen', 'elevator', 'balcony', 'airConditioning', 'concierge'],
    photos: [
      u('photo-1586023492125-27b2c045efd7'),
      u('photo-1616486338812-3dadae4b4ace'),
    ],
    agencyId: 'medina-properties',
    publishedAt: '2026-07-22',
  },
  {
    id: 'l13',
    title: {
      en: 'Commercial space on Boulevard Mohammed V',
      fr: 'Local commercial sur le Boulevard Mohammed V',
    },
    description: {
      en: '120 m² street-level commercial space with 8 m of frontage on Boulevard Mohammed V, Tangier. High footfall, mezzanine storage, suitable for retail, showroom or food concepts.',
      fr: 'Local commercial de 120 m² en rez-de-chaussée avec 8 m de vitrine sur le Boulevard Mohammed V, Tanger. Fort passage, mezzanine de stockage, convient pour commerce, showroom ou restauration.',
    },
    transaction: 'rent',
    type: 'commercial',
    price: 18000,
    city: 'Tangier',
    neighborhood: 'Centre-ville',
    surface: 120,
    bedrooms: 0,
    bathrooms: 1,
    amenities: [],
    photos: [u('photo-1441986300917-64674bd600d8')],
    agencyId: 'tanger-bay-realty',
    publishedAt: '2026-07-11',
  },
  {
    id: 'l14',
    title: {
      en: 'Penthouse with panoramic bay view, Malabata',
      fr: 'Penthouse vue panoramique sur la baie, Malabata',
    },
    description: {
      en: 'Rare 210 m² penthouse in Malabata with a wraparound terrace and panoramic views over the Bay of Tangier and the Strait. Three suites, home automation, private elevator access and two parking spots.',
      fr: "Rare penthouse de 210 m² à Malabata avec terrasse panoramique sur la baie de Tanger et le Détroit. Trois suites, domotique, accès ascenseur privatif et deux places de parking.",
    },
    transaction: 'buy',
    type: 'apartment',
    price: 6900000,
    city: 'Tangier',
    neighborhood: 'Malabata',
    surface: 210,
    bedrooms: 3,
    bathrooms: 3,
    amenities: ['seaView', 'terrace', 'elevator', 'airConditioning', 'security', 'garage', 'equippedKitchen'],
    photos: [
      u('photo-1512918728675-ed5a9ecdebfd'),
      u('photo-1600607687920-4e2a09cf159d'),
    ],
    agencyId: 'tanger-bay-realty',
    featured: true,
    publishedAt: '2026-07-14',
  },
  {
    id: 'l15',
    title: {
      en: 'House with rooftop terrace, Agadir Founty',
      fr: 'Maison avec toit-terrasse, Agadir Founty',
    },
    description: {
      en: 'Contemporary 200 m² house in the Founty district of Agadir, ten minutes from the beach. Four bedrooms, rooftop terrace with ocean glimpses, small garden and garage.',
      fr: "Maison contemporaine de 200 m² dans le quartier Founty à Agadir, à dix minutes de la plage. Quatre chambres, toit-terrasse avec aperçu océan, jardinet et garage.",
    },
    transaction: 'buy',
    type: 'house',
    price: 2900000,
    city: 'Agadir',
    neighborhood: 'Founty',
    surface: 200,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ['terrace', 'garden', 'garage', 'airConditioning'],
    photos: [
      u('photo-1570129477492-45c003edd2be'),
      u('photo-1523217582562-09d0def993a6'),
    ],
    agencyId: 'rabat-prestige',
    publishedAt: '2026-07-03',
  },
  {
    id: 'l16',
    title: {
      en: 'Renovated apartment in Fès Ville Nouvelle',
      fr: 'Appartement rénové à Fès Ville Nouvelle',
    },
    description: {
      en: 'Fully renovated 110 m² apartment on Avenue Hassan II in Fès. Three bedrooms, double glazing, central heating, and a balcony over the tree-lined avenue.',
      fr: "Appartement entièrement rénové de 110 m² sur l'Avenue Hassan II à Fès. Trois chambres, double vitrage, chauffage central et balcon sur l'avenue arborée.",
    },
    transaction: 'buy',
    type: 'apartment',
    price: 980000,
    city: 'Fès',
    neighborhood: 'Ville Nouvelle',
    surface: 110,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['heating', 'balcony', 'equippedKitchen'],
    photos: [u('photo-1560185007-cde436f6a4d0'), u('photo-1560185127-6ed189bf02f4')],
    agencyId: 'medina-properties',
    publishedAt: '2026-06-25',
  },
  {
    id: 'l17',
    title: {
      en: 'Villa with pool for rent, Californie',
      fr: 'Villa avec piscine à louer, Californie',
    },
    description: {
      en: 'Elegant 400 m² villa in the Californie district of Casablanca. Five bedrooms, landscaped garden, heated pool, staff studio and double garage. Available unfurnished on a long-term lease.',
      fr: 'Élégante villa de 400 m² dans le quartier Californie à Casablanca. Cinq chambres, jardin paysager, piscine chauffée, studio de service et double garage. Disponible vide en location longue durée.',
    },
    transaction: 'rent',
    type: 'villa',
    price: 45000,
    city: 'Casablanca',
    neighborhood: 'Californie',
    surface: 400,
    bedrooms: 5,
    bathrooms: 4,
    amenities: ['pool', 'garden', 'garage', 'heating', 'security', 'terrace'],
    photos: [
      u('photo-1613977257363-707ba9348227'),
      u('photo-1613490493576-7fde63acd811'),
    ],
    agencyId: 'atlas-immobilier',
    publishedAt: '2026-07-16',
  },
  {
    id: 'l18',
    title: {
      en: 'Building plot in Souissi',
      fr: 'Terrain constructible à Souissi',
    },
    description: {
      en: '1,000 m² titled building plot in the embassy district of Souissi, Rabat. R+2 zoning, quiet street, all utilities available. Ideal for a family villa project.',
      fr: "Terrain titré de 1 000 m² dans le quartier des ambassades à Souissi, Rabat. Zonage R+2, rue calme, toutes commodités disponibles. Idéal pour un projet de villa familiale.",
    },
    transaction: 'buy',
    type: 'land',
    price: 8500000,
    city: 'Rabat',
    neighborhood: 'Souissi',
    surface: 1000,
    bedrooms: 0,
    bathrooms: 0,
    amenities: [],
    photos: [u('photo-1500076656116-558758c991c1')],
    agencyId: 'rabat-prestige',
    publishedAt: '2026-07-01',
  },
];

export const cities: { name: string; photo: string }[] = [
  { name: 'Casablanca', photo: u('photo-1538230575309-59dfc388ae36') },
  { name: 'Marrakech', photo: u('photo-1597212618440-806262de4f6b') },
  { name: 'Rabat', photo: u('photo-1611420890968-c26f14c632d4') },
  { name: 'Tangier', photo: u('photo-1569383746724-6f1b882b8f46') },
  { name: 'Agadir', photo: u('photo-1596395819057-e37f55a8516b') },
  { name: 'Fès', photo: u('photo-1548013146-72479768bada') },
  { name: 'Saidia', photo: u('photo-1507525428034-b723cf961d3e') },
  { name: 'Bouznika', photo: u('photo-1519046904884-53103b34b206') },
];

export function getListingById(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export function filterListings(filters: ListingFilters): Listing[] {
  return listings
    .filter((l) => {
      if (filters.transaction && l.transaction !== filters.transaction) return false;
      if (filters.type && l.type !== filters.type) return false;
      if (filters.city && l.city !== filters.city) return false;
      if (filters.minPrice != null && l.price < filters.minPrice) return false;
      if (filters.maxPrice != null && l.price > filters.maxPrice) return false;
      if (filters.minBedrooms != null && l.bedrooms < filters.minBedrooms) return false;
      if (filters.minSurface != null && l.surface < filters.minSurface) return false;
      if (filters.query) {
        const q = filters.query.trim().toLowerCase();
        if (q.length > 0) {
          const haystack = [
            l.title.en,
            l.title.fr,
            l.city,
            l.neighborhood,
            l.type,
          ]
            .join(' ')
            .toLowerCase();
          if (!haystack.includes(q)) return false;
        }
      }
      return true;
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString('fr-MA').replace(/ /g, ' ')} MAD`;
}
