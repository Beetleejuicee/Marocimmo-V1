import { Agency } from '../types';

export const agencies: Agency[] = [
  {
    id: 'atlas-immobilier',
    name: 'Atlas Immobilier',
    city: 'Casablanca',
    logoColor: '#C0392B',
    phone: '+212522000001',
    whatsapp: '+212661000001',
    email: 'contact@atlas-immobilier.ma',
    description: {
      en: 'Casablanca-based agency specialised in apartments and offices in the city centre and business districts.',
      fr: "Agence casablancaise spécialisée dans les appartements et bureaux du centre-ville et des quartiers d'affaires.",
    },
  },
  {
    id: 'medina-properties',
    name: 'Medina Properties',
    city: 'Marrakech',
    logoColor: '#B7950B',
    phone: '+212524000002',
    whatsapp: '+212662000002',
    email: 'hello@medina-properties.ma',
    description: {
      en: 'Experts in riads, villas and prestige properties in Marrakech and its surroundings.',
      fr: 'Experts en riads, villas et biens de prestige à Marrakech et ses environs.',
    },
  },
  {
    id: 'saidia-littoral',
    name: 'Saidia Littoral Immo',
    city: 'Saidia',
    logoColor: '#1F618D',
    phone: '+212536000003',
    whatsapp: '+212663000003',
    email: 'info@saidia-littoral.ma',
    description: {
      en: 'Seaside specialists: apartments and villas along the Saidia and Oriental coast.',
      fr: "Spécialistes du littoral : appartements et villas sur la côte de Saidia et de l'Oriental.",
    },
  },
  {
    id: 'tanger-bay-realty',
    name: 'Tanger Bay Realty',
    city: 'Tangier',
    logoColor: '#1E8449',
    phone: '+212539000004',
    whatsapp: '+212664000004',
    email: 'contact@tangerbay.ma',
    description: {
      en: 'Residential and commercial real estate across Tangier, from the old town to the new marina.',
      fr: "Immobilier résidentiel et commercial à Tanger, de la vieille ville à la nouvelle marina.",
    },
  },
  {
    id: 'rabat-prestige',
    name: 'Rabat Prestige',
    city: 'Rabat',
    logoColor: '#6C3483',
    phone: '+212537000005',
    whatsapp: '+212665000005',
    email: 'contact@rabatprestige.ma',
    description: {
      en: 'Family houses, land and premium apartments in the capital and along the Bouznika coast.',
      fr: 'Maisons familiales, terrains et appartements haut de gamme dans la capitale et sur la côte de Bouznika.',
    },
  },
];

export function getAgencyById(id: string): Agency | undefined {
  return agencies.find((a) => a.id === id);
}
