import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import ListingsScreen from '../../src/components/ListingsScreen';
import { PropertyType } from '../../src/types';

export default function RentScreen() {
  const { city, type, q, maxPrice } = useLocalSearchParams<{
    city?: string;
    type?: PropertyType;
    q?: string;
    maxPrice?: string;
  }>();
  return (
    <ListingsScreen
      key={[city, type, q, maxPrice].join('|')}
      transaction="rent"
      initialCity={city}
      initialType={type}
      initialQuery={q}
      initialMaxPrice={maxPrice ? Number(maxPrice) : undefined}
    />
  );
}
