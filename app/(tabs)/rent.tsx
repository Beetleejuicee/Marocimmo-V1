import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import ListingsScreen from '../../src/components/ListingsScreen';

export default function RentScreen() {
  const { city } = useLocalSearchParams<{ city?: string }>();
  return <ListingsScreen key={city ?? 'all'} transaction="rent" initialCity={city} />;
}
